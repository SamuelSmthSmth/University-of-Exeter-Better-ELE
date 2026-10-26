/**
 * Exeter ELE 2 (Moodle format_tiles) Course Scraper & Better ELE Exporter
 *
 * HOW TO USE:
 * 1. Open any module on ELE 2 (e.g. https://ele.exeter.ac.uk/course/view.php?id=27644)
 * 2. Open Chrome DevTools Console (F12 or Ctrl+Shift+I -> Console)
 * 3. Paste this entire script and press Enter.
 * 4. A floating "Export to Better ELE" button will appear in the bottom-right corner.
 *    You can click "Export Manifest (JSON)" or "Download All PDFs".
 */

(function () {
  'use strict';

  console.log("%c[Better ELE 2 Exporter] Loaded! Initializing tile scraper...", "color: #00A693; font-weight: bold; font-size: 14px;");

  // Extract Course Info from URL & DOM
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');
  if (!courseId) {
    console.error("[Better ELE 2 Exporter] Not an ELE 2 course page. Please navigate to a course page like /course/view.php?id=XXXX");
    return;
  }

  const rawCourseTitle = document.querySelector('h1')?.innerText?.trim() ||
                         document.querySelector('.page-header-headings h1')?.innerText?.trim() ||
                         document.title;

  // Extract module code (e.g. MTH2008, ECM1400)
  const codeMatch = rawCourseTitle.match(/\b([A-Z]{3}[0-9]{4}[A-Z]?)\b/i) ||
                    window.location.pathname.match(/\b([A-Z]{3}[0-9]{4}[A-Z]?)\b/i);
  const courseCode = codeMatch ? codeMatch[1].toUpperCase() : "MTH0000";
  const cleanTitle = rawCourseTitle.replace(courseCode, '').replace(/[-–—:]/g, ' ').replace(/\s+/g, ' ').trim() || courseCode;

  console.log(`[Better ELE 2 Exporter] Detected Course: ${courseCode} - ${cleanTitle} (ID: ${courseId})`);

  // Scan all tile sections
  function getTileSections() {
    const tileElements = Array.from(document.querySelectorAll('li.tile, .tiles li[data-section]'));
    if (tileElements.length > 0) {
      return tileElements.map(el => {
        const secNum = el.getAttribute('data-section') || el.getAttribute('data-sectionid') || '0';
        const title = el.querySelector('.tile-text, .tiletitle, h3')?.innerText?.trim() || `Section ${secNum}`;
        return { sectionNum: parseInt(secNum, 10), title };
      });
    }

    // Fallback: check section links
    const sectionLinks = Array.from(document.querySelectorAll('a[href*="section="]'));
    const uniqueSecs = new Map();
    sectionLinks.forEach(a => {
      const match = a.href.match(/section=(\d+)/);
      if (match) {
        const sec = parseInt(match[1], 10);
        if (!uniqueSecs.has(sec)) {
          uniqueSecs.set(sec, a.innerText.trim() || `Section ${sec}`);
        }
      }
    });

    if (uniqueSecs.size > 0) {
      return Array.from(uniqueSecs.entries()).map(([sectionNum, title]) => ({ sectionNum, title }));
    }

    // Generic fallback: check default sections 0 to 15
    return Array.from({ length: 15 }, (_, i) => ({ sectionNum: i, title: `Section ${i}` }));
  }

  // Fetch individual section HTML to extract all tile activities
  async function fetchSectionActivities(secNum, secTitle) {
    const sectionUrl = `${window.location.origin}/course/view.php?id=${courseId}&section=${secNum}`;
    try {
      const resp = await fetch(sectionUrl, { credentials: 'include' });
      const html = await resp.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const activities = [];
      const activityEls = doc.querySelectorAll('.activity, .activity-item, li[id^="module-"]');

      activityEls.forEach((el, idx) => {
        const titleEl = el.querySelector('.instancename, .activityname, a.aal_full');
        const linkEl = el.querySelector('a[href*="/mod/"]');
        if (!linkEl) return;

        const name = (titleEl?.innerText || linkEl?.innerText || 'Untitled Resource').replace(/File|URL|Page|Folder|Quiz|Assignment/gi, '').trim();
        const href = linkEl.href;

        // Determine activity category
        let category = 'general';
        const lowerName = name.toLowerCase();

        if (lowerName.includes('solution') || lowerName.includes('answers') || lowerName.includes('sol')) {
          category = 'solution';
        } else if (lowerName.includes('sheet') || lowerName.includes('exercise') || lowerName.includes('homework') || lowerName.includes('tutorial') || lowerName.includes('problem')) {
          category = 'problem_sheet';
        } else if (lowerName.includes('note') || lowerName.includes('lecture') || lowerName.includes('slide') || lowerName.includes('handout') || lowerName.includes('topic')) {
          category = 'slide';
        } else if (lowerName.includes('exam') || lowerName.includes('past paper') || lowerName.includes('mock')) {
          category = 'exam';
        }

        // Check for Panopto recording / LTI
        const isPanopto = href.includes('panopto') || href.includes('mod/lti') || el.classList.contains('lti') || lowerName.includes('panopto') || lowerName.includes('recording');

        activities.push({
          id: `ele-${courseId}-s${secNum}-${idx}`,
          name,
          category,
          originalSection: secTitle,
          url: href,
          isPanopto,
          timeScraped: new Date().toISOString()
        });
      });

      return activities;
    } catch (err) {
      console.warn(`[Better ELE 2 Exporter] Could not fetch section ${secNum}:`, err);
      return [];
    }
  }

  // Direct Moodle Panopto Block Scraper using sesskey & courseid
  async function fetchLivePanoptoRecordings() {
    try {
      const sesskey = window.M?.cfg?.sesskey || document.querySelector('input[name="sesskey"]')?.value;
      if (!sesskey) {
        console.warn("[Better ELE 2 Exporter] Moodle sesskey not detected on window.M.cfg.");
        return [];
      }
      console.log(`[Better ELE 2 Exporter] Querying /blocks/panopto/panopto_content.php with courseid=${courseId}...`);
      const formData = new URLSearchParams();
      formData.append('sesskey', sesskey);
      formData.append('courseid', courseId);

      const resp = await fetch('/blocks/panopto/panopto_content.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: formData.toString()
      });

      if (!resp.ok) return [];
      const html = await resp.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const items = Array.from(doc.querySelectorAll('.panopto_completed_item a'));
      return items.map(a => {
        const rawTitle = a.innerText.trim();
        const panoptoUrl = a.href;
        let uuid = '';
        try {
          uuid = new URL(panoptoUrl).searchParams.get('id') || '';
        } catch (e) {}
        return {
          id: uuid || Math.random().toString(36).substring(7),
          title: rawTitle,
          panoptoUrl: panoptoUrl,
          embedUrl: uuid ? `https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=${uuid}&instance=MoodleELE2&autoplay=true&offerviewer=true` : undefined,
          duration: "50 mins",
          date: rawTitle.split('@')[0]?.trim() || new Date().toLocaleDateString('en-GB')
        };
      });
    } catch (err) {
      console.error("[Better ELE 2 Exporter] Failed to fetch Panopto block recordings:", err);
      return [];
    }
  }

  // Main Scraper Pipeline
  async function runScrape(onProgress) {
    const tiles = getTileSections();
    console.log(`[Better ELE 2 Exporter] Found ${tiles.length} tile sections. Crawling...`);

    const courseData = {
      id: courseCode.toLowerCase(),
      code: courseCode,
      title: cleanTitle,
      stage: 2,
      academicYear: "2026/27",
      scrapedAt: new Date().toISOString(),
      sourceUrl: window.location.href,
      sections: [],
      panoptoRecordings: []
    };

    if (onProgress) onProgress(0, tiles.length, "Fetching Panopto Recordings...");
    const livePanopto = await fetchLivePanoptoRecordings();
    if (livePanopto.length > 0) {
      console.log(`[Better ELE 2 Exporter] Successfully pulled ${livePanopto.length} Panopto recordings!`);
      courseData.panoptoRecordings.push(...livePanopto);
    }

    let completed = 0;
    for (const tile of tiles) {
      if (onProgress) onProgress(completed, tiles.length, tile.title);
      const items = await fetchSectionActivities(tile.sectionNum, tile.title);

      if (items.length > 0) {
        // Separate Panopto LTI links
        const panoptos = items.filter(i => i.isPanopto);
        panoptos.forEach(p => {
          courseData.panoptoRecordings.push({
            id: p.id,
            title: p.name,
            videoUrl: p.url,
            duration: "50m",
            date: new Date().toLocaleDateString('en-GB')
          });
        });

        // Add section
        const normalResources = items.filter(i => !i.isPanopto);
        if (normalResources.length > 0) {
          courseData.sections.push({
            id: `sec-${courseCode.toLowerCase()}-${tile.sectionNum}`,
            title: tile.title,
            resources: normalResources
          });
        }
      }

      completed++;
      // Polite 250ms delay between tile requests
      await new Promise(r => setTimeout(r, 250));
    }

    if (onProgress) onProgress(tiles.length, tiles.length, "Done!");
    console.log("[Better ELE 2 Exporter] Scraping complete!", courseData);
    return courseData;
  }

  // Floating UI
  function injectExporterUI() {
    if (document.getElementById('better-ele-exporter-root')) return;

    const container = document.createElement('div');
    container.id = 'better-ele-exporter-root';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: #001F1F;
      color: #E6F4F1;
      border: 1px solid #00A693;
      border-radius: 8px;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      width: 320px;
    `;

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-weight: 700; font-size: 13px; color: #00C4AD; letter-spacing: 0.5px;">BETTER ELE 2 EXPORTER</span>
        <button id="btn-close-exporter" style="background:none; border:none; color:#888; cursor:pointer; font-size:16px;">✕</button>
      </div>
      <div style="font-size: 12px; margin-bottom: 12px; color: #bbb;">
        Module: <strong>${courseCode}</strong> (${cleanTitle})
      </div>
      <div id="exporter-status" style="font-size: 11px; color: #00C4AD; margin-bottom: 12px; display: none;"></div>
      <button id="btn-run-scrape" style="
        width: 100%;
        background: #00A693;
        color: #001F1F;
        border: none;
        padding: 10px 14px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 12px;
        cursor: pointer;
        transition: background 0.2s;
      ">
        Scan Tiles & Export JSON
      </button>
    `;

    document.body.appendChild(container);

    document.getElementById('btn-close-exporter').onclick = () => container.remove();

    document.getElementById('btn-run-scrape').onclick = async () => {
      const btn = document.getElementById('btn-run-scrape');
      const statusEl = document.getElementById('exporter-status');
      btn.disabled = true;
      btn.style.opacity = '0.6';
      statusEl.style.display = 'block';

      const data = await runScrape((curr, total, label) => {
        statusEl.innerText = `Crawling tile ${curr}/${total}: ${label}`;
      });

      statusEl.innerText = `Exported ${data.sections.length} sections! Downloading JSON...`;

      // Trigger JSON file download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const dlLink = document.createElement('a');
      dlLink.href = URL.createObjectURL(blob);
      dlLink.download = `${courseCode}_better_ele_export.json`;
      dlLink.click();

      btn.disabled = false;
      btn.style.opacity = '1';
      btn.innerText = "Re-export JSON";
    };
  }

  injectExporterUI();
})();
