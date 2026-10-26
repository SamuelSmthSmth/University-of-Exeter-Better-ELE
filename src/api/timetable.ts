import { useState, useEffect, useCallback } from "react";
import fallbackEvents from "../data/timetable-fallback.json";

export interface TimetableEvent {
  uid: string;
  summary: string;
  moduleCode: string;
  activityType: string;
  location: string;
  staff: string;
  description: string;
  start: string; // ISO 8601 string
  end: string;   // ISO 8601 string
}

export const DEFAULT_ICS_URL = "";

const STORAGE_KEY_URL = "exeter_timetable_ics_url";
const STORAGE_KEY_SYNC_TIME = "exeter_timetable_last_sync";
const STORAGE_KEY_EVENTS = "exeter_timetable_events_cache";

export function parseIcsContent(icsText: string): TimetableEvent[] {
  // RFC 5545 unfolding: unfold CRLF / LF followed by space or tab
  const unfolded = icsText.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
  const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let match: RegExpExecArray | null;
  const events: TimetableEvent[] = [];

  while ((match = eventRegex.exec(unfolded)) !== null) {
    const block = match[1];
    const getProp = (name: string) => {
      const m = block.match(new RegExp("^" + name + "(?:;[^:]*)?:(.*)$", "m"));
      return m ? m[1].trim() : "";
    };

    const summary = getProp("SUMMARY").replace(/\\,/g, ",").replace(/\\;/g, ";");
    const location = getProp("LOCATION").replace(/\\,/g, ",").replace(/\\;/g, ";");
    const description = getProp("DESCRIPTION").replace(/\\n/g, "\n").replace(/\\,/g, ",");
    const dtstart = getProp("DTSTART");
    const dtend = getProp("DTEND");
    const uid = getProp("UID") || Math.random().toString(36).substring(2);

    const parseDate = (dStr: string) => {
      if (!dStr) return null;
      const clean = dStr.replace(/[^0-9T]/g, "");
      const m = clean.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
      if (!m) return null;
      return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6])).toISOString();
    };

    const modMatch = summary.match(/^([A-Z]{3}\d{4})/);
    const moduleCode = modMatch ? modMatch[1] : "";

    const typeMatch = description.match(/Type:\s*([^\n\r]+)/);
    const activityType = typeMatch ? typeMatch[1].trim() : "Lecture";

    const staffMatch = description.match(/Staff member\(s\):\s*([^\n\r]+)/);
    const staff = staffMatch ? staffMatch[1].trim() : "";

    const startIso = parseDate(dtstart);
    const endIso = parseDate(dtend);

    if (startIso && endIso) {
      events.push({
        uid,
        summary,
        moduleCode,
        activityType,
        location,
        staff,
        description,
        start: startIso,
        end: endIso,
      });
    }
  }

  return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export function useTimetable() {
  const [icsUrl, setIcsUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_URL) || "";
    } catch {
      return "";
    }
  });
  const [events, setEvents] = useState<TimetableEvent[]>(() => {
    try {
      const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
      if (!savedUrl) return [];
      const cached = localStorage.getItem(STORAGE_KEY_EVENTS);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(() => {
    try {
      const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
      return savedUrl ? localStorage.getItem(STORAGE_KEY_SYNC_TIME) : null;
    } catch {
      return null;
    }
  });

  const fetchTimetable = useCallback(async (targetUrl: string) => {
    const trimmed = (targetUrl || "").trim();
    if (!trimmed) {
      setEvents([]);
      setLastSync(null);
      try {
        localStorage.removeItem(STORAGE_KEY_URL);
        localStorage.removeItem(STORAGE_KEY_SYNC_TIME);
        localStorage.removeItem(STORAGE_KEY_EVENTS);
      } catch {}
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build proxy URL when in local dev (or use direct if CORS allows)
      let fetchUrl = trimmed;
      if (trimmed.includes("mytimetable.exeter.ac.uk/ical")) {
        const query = trimmed.split("/ical")[1] || "";
        fetchUrl = `/mytimetable-api/ical${query}`;
      }

      const res = await fetch(fetchUrl);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
      }

      const text = await res.text();
      const parsed = parseIcsContent(text);
      if (parsed.length === 0) {
        throw new Error("No calendar events found in the provided iCal feed.");
      }

      setEvents(parsed);
      const now = new Date().toISOString();
      setLastSync(now);
      try {
        localStorage.setItem(STORAGE_KEY_SYNC_TIME, now);
        localStorage.setItem(STORAGE_KEY_URL, trimmed);
        localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(parsed));
      } catch {}
    } catch (err: any) {
      console.warn("Error fetching live iCal feed:", err);
      setError(err?.message || "Failed to synchronize timetable");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Attempt background sync if we have a URL
    if (icsUrl) {
      fetchTimetable(icsUrl);
    }
  }, [icsUrl, fetchTimetable]);

  const updateIcsUrl = (newUrl: string) => {
    const trimmed = (newUrl || "").trim();
    setIcsUrl(trimmed);
    if (!trimmed) {
      setEvents([]);
      setLastSync(null);
      try {
        localStorage.removeItem(STORAGE_KEY_URL);
        localStorage.removeItem(STORAGE_KEY_SYNC_TIME);
        localStorage.removeItem(STORAGE_KEY_EVENTS);
      } catch {}
    } else {
      try {
        localStorage.setItem(STORAGE_KEY_URL, trimmed);
      } catch {}
      fetchTimetable(trimmed);
    }
  };

  const syncNow = () => {
    if (icsUrl) {
      fetchTimetable(icsUrl);
    }
  };

  return {
    events,
    loading,
    error,
    lastSync,
    icsUrl,
    updateIcsUrl,
    syncNow,
  };
}

/** Check if two dates are the same calendar day */
export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/** Get all events occurring on a specific date */
export function getEventsForDate(events: TimetableEvent[], date: Date): TimetableEvent[] {
  return events.filter(e => {
    const d = new Date(e.start);
    return isSameDay(d, date);
  });
}

export type EventCategory = "lecture" | "seminar" | "practical" | "dropin" | "exam";

export function getEventCategory(evt: {
  activityType?: string;
  summary?: string;
  description?: string;
}): EventCategory {
  const type = (evt.activityType || "").toLowerCase();
  const summary = (evt.summary || "").toLowerCase();

  // 1. Exam (Red #D9383A)
  if (
    type.includes("exam") ||
    type.includes("assessment") ||
    type.includes("test") ||
    summary.includes("exam") ||
    summary.includes("assessment") ||
    summary.includes("_e")
  ) {
    return "exam";
  }

  // 2. Drop-in (Purple #9569BE)
  if (
    type.includes("drop") ||
    summary.includes("_d") ||
    summary.includes("drop-in") ||
    summary.includes("drop in")
  ) {
    return "dropin";
  }

  // 3. Computer Lab / Practical (Blue #69B3E7)
  if (
    type.includes("lab") ||
    type.includes("practical") ||
    type.includes("computer") ||
    type.includes("workshop") ||
    summary.includes("_p") ||
    summary.includes("_w")
  ) {
    return "practical";
  }

  // 4. Seminar / Tutorial (Light Green #48BA75)
  if (
    type.includes("seminar") ||
    type.includes("tutorial") ||
    summary.includes("_s") ||
    summary.includes("_t")
  ) {
    return "seminar";
  }

  // 5. Lecture (Green #007D69)
  return "lecture";
}

export interface EventTheme {
  category: EventCategory;
  label: string;
  hex: string;
  headerBg: string;
  headerText: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBorder: string;
  leftBorder: string;
  dotBg: string;
  bgLight: string;
  darkHeaderBg: string;
  darkHeaderText: string;
  darkCardBorder: string;
}

export const EVENT_THEMES: Record<EventCategory, EventTheme> = {
  lecture: {
    category: "lecture",
    label: "Lecture",
    hex: "#007D69",
    headerBg: "bg-[#007D69]",
    headerText: "text-white",
    badgeBg: "bg-white/20",
    badgeText: "text-white",
    badgeBorder: "border-white/30",
    cardBorder: "border-[#007D69]/30",
    leftBorder: "border-l-[#007D69]",
    dotBg: "bg-[#007D69]",
    bgLight: "bg-[#007D69]/10",
    darkHeaderBg: "dark:bg-[#005D4E]",
    darkHeaderText: "dark:text-white",
    darkCardBorder: "dark:border-[#007D69]/40",
  },
  seminar: {
    category: "seminar",
    label: "Seminar",
    hex: "#48BA75",
    headerBg: "bg-[#48BA75]",
    headerText: "text-white",
    badgeBg: "bg-white/20",
    badgeText: "text-white",
    badgeBorder: "border-white/30",
    cardBorder: "border-[#48BA75]/30",
    leftBorder: "border-l-[#48BA75]",
    dotBg: "bg-[#48BA75]",
    bgLight: "bg-[#48BA75]/10",
    darkHeaderBg: "dark:bg-[#2B7A49]",
    darkHeaderText: "dark:text-white",
    darkCardBorder: "dark:border-[#48BA75]/40",
  },
  practical: {
    category: "practical",
    label: "Computer Lab / Practical",
    hex: "#69B3E7",
    headerBg: "bg-[#69B3E7]",
    headerText: "text-[#0A2540]",
    badgeBg: "bg-[#0A2540]/15",
    badgeText: "text-[#0A2540]",
    badgeBorder: "border-[#0A2540]/20",
    cardBorder: "border-[#69B3E7]/40",
    leftBorder: "border-l-[#69B3E7]",
    dotBg: "bg-[#69B3E7]",
    bgLight: "bg-[#69B3E7]/10",
    darkHeaderBg: "dark:bg-[#2A5E8C]",
    darkHeaderText: "dark:text-white",
    darkCardBorder: "dark:border-[#69B3E7]/40",
  },
  dropin: {
    category: "dropin",
    label: "Drop-in",
    hex: "#9569BE",
    headerBg: "bg-[#9569BE]",
    headerText: "text-white",
    badgeBg: "bg-white/20",
    badgeText: "text-white",
    badgeBorder: "border-white/30",
    cardBorder: "border-[#9569BE]/30",
    leftBorder: "border-l-[#9569BE]",
    dotBg: "bg-[#9569BE]",
    bgLight: "bg-[#9569BE]/10",
    darkHeaderBg: "dark:bg-[#683C91]",
    darkHeaderText: "dark:text-white",
    darkCardBorder: "dark:border-[#9569BE]/40",
  },
  exam: {
    category: "exam",
    label: "Exam",
    hex: "#D9383A",
    headerBg: "bg-[#D9383A]",
    headerText: "text-white",
    badgeBg: "bg-white/20",
    badgeText: "text-white",
    badgeBorder: "border-white/30",
    cardBorder: "border-[#D9383A]/30",
    leftBorder: "border-l-[#D9383A]",
    dotBg: "bg-[#D9383A]",
    bgLight: "bg-[#D9383A]/10",
    darkHeaderBg: "dark:bg-[#8F1D1E]",
    darkHeaderText: "dark:text-white",
    darkCardBorder: "dark:border-[#D9383A]/40",
  },
};

export function getEventTheme(evt?: {
  activityType?: string;
  summary?: string;
  description?: string;
}): EventTheme {
  if (!evt) return EVENT_THEMES.lecture;
  const cat = getEventCategory(evt);
  return EVENT_THEMES[cat] || EVENT_THEMES.lecture;
}

