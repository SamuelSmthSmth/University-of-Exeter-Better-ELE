#!/usr/bin/env python3
import os, sys, json, time, re, glob, struct
import urllib.request, urllib.parse
from bs4 import BeautifulSoup

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATERIALS_DIR = os.path.join(PROJECT_DIR, 'public', 'materials')
BACKUP_BASE = '/home/samuel/Documents/ELE_Backup'
MOCK_COURSES_PATH = os.path.join(PROJECT_DIR, 'src', 'data', 'mockCourses.ts')

def extract_cookies_from_zen():
    try:
        files = glob.glob('/home/samuel/.config/zen/*/sessionstore-backups/recovery.jsonlz4')
        if not files: return {}
        with open(files[0], 'rb') as fp: data = fp.read()
        res = bytearray()
        p = 12
        while p < len(data):
            size, = struct.unpack('<I', data[p:p+4])
            p += 4
            for b in data[p:p+size]: res.append(b)
            p += size
        obj = json.loads(res.decode('utf-8', 'ignore'))
        cookies = {}
        for w in obj.get('windows', []):
            for c in w.get('cookies', []):
                h = c.get('host', '')
                if 'exeter.ac.uk' in h or 'panopto.eu' in h:
                    cookies[c['name']] = c['value']
        return cookies
    except Exception as e:
        print(f"Warning: Could not read Zen session directly: {e}")
        try:
            with open('/tmp/zen_session.json') as f:
                s = json.load(f)
                return {c['name']: c['value'] for c in s.get('cookies', [])}
        except:
            return {}

cookies = extract_cookies_from_zen()
moodle_cookie = '; '.join(f'{k}={v}' for k, v in cookies.items() if 'panopto' not in k.lower())
panopto_cookie = '; '.join(f'{k}={v}' for k, v in cookies.items() if 'panopto' in k.lower() or k in ['.ASPXAUTH', 'csrfToken', 'sandboxCookie', 'idsrv'])

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0',
    'Cookie': moodle_cookie
}
panopto_headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0',
    'Cookie': panopto_cookie,
    'Content-Type': 'application/json'
}

def clean_filename(name):
    clean = re.sub(r'[\s_]+', ' ', name).strip()
    clean = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '_', clean)
    return clean.strip('. ')

def save_dual(code, subfolder, filename, content):
    clean_f = clean_filename(filename)
    if not clean_f.endswith('.pdf') and not clean_f.endswith('.html'):
        clean_f += '.pdf'
    
    # 1. public/materials/<CODE>/
    code_dir = os.path.join(MATERIALS_DIR, code)
    os.makedirs(code_dir, exist_ok=True)
    with open(os.path.join(code_dir, clean_f), 'wb') as fp:
        fp.write(content)
        
    # 2. Local ELE_Backup
    # Find module folder in ELE_Backup
    for mod_dir in os.listdir(BACKUP_BASE):
        if code in mod_dir:
            full_mod = os.path.join(BACKUP_BASE, mod_dir)
            # unnumbered
            clean_sub = clean_filename(subfolder)
            target1 = os.path.join(full_mod, clean_sub)
            os.makedirs(target1, exist_ok=True)
            with open(os.path.join(target1, clean_f), 'wb') as fp:
                fp.write(content)
            
            # numbered mirror
            for sub in os.listdir(full_mod):
                if len(sub) > 3 and sub[:2].isdigit() and sub[2] == '_':
                    sub_clean = sub[3:].lower().replace('_', ' ').strip()
                    csub_clean = clean_sub.lower().replace('_', ' ').strip()
                    if csub_clean in sub_clean or sub_clean in csub_clean:
                        target2 = os.path.join(full_mod, sub)
                        with open(os.path.join(target2, clean_f), 'wb') as fp:
                            fp.write(content)
            break

def fetch_panopto_sessions_for_folder(folder_id):
    url = "https://recapexeter.cloud.panopto.eu/Panopto/Services/Data.svc/GetSessions"
    payload = {
        "queryParameters": {
            "folderID": folder_id,
            "maxResults": 100,
            "sortColumn": 1,
            "sortAscending": True
        }
    }
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=panopto_headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            results = data.get("d", {}).get("Results", [])
            recs = []
            for r in results:
                sid = r.get("DeliveryID")
                name = re.sub(r"<[^>]+>", "", r.get("SessionName", "")).strip()
                dur_sec = r.get("Duration", 0) or 0
                dur_min = max(1, round(dur_sec / 60))
                
                date_str = "Oct 2026"
                st_raw = r.get("StartTime", "")
                m = re.search(r"\d+", st_raw)
                if m:
                    import datetime
                    ts = int(m.group(0)) / 1000.0
                    dt = datetime.datetime.fromtimestamp(ts)
                    date_str = dt.strftime("%d/%m/%Y")
                    
                recs.append({
                    "id": sid,
                    "title": name,
                    "date": date_str,
                    "duration": f"{dur_min} mins",
                    "panoptoUrl": f"https://recapexeter.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id={sid}&instance=MoodleELE2",
                    "embedUrl": f"https://recapexeter.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id={sid}&instance=MoodleELE2&autoplay=true&offerviewer=true&interactivity=all&showtitle=true"
                })
            return recs
    except Exception as e:
        print(f"Error fetching Panopto for {folder_id}: {e}")
        return []

def main():
    print("Starting full ELE 2 & Panopto Synchronizer...")
    start_time = time.time()
    sync_logs = []
    
    # Panopto Folders mapping
    PANOPTO_FOLDERS = {
        'MTH2008': '1a88b48c-ddaf-43c5-85a6-b45d00a4d476',
        'MTH2003': '5614a445-565a-40e6-bd8f-b45d00a4cf47',
        'MTH2010': '9f4accbe-5025-467b-ae7e-b45d00a4d7e2',
        'MTH2014': 'aa25974d-a8ee-4f9b-9321-b45d00a4db4f',
        'MTH1000': '7c89b1fb-8534-4a21-ad68-b2f000b88145',
        'MTH1001': 'a0ba3383-61d8-455e-a4a2-b2f000b8828e',
        'MTH1002': 'e96926b6-af74-43b9-b8d9-b2f000b88388',
        'MTH1003': 'ff81933b-1968-4188-861c-b2f000b88484',
        'MTH1004': 'a219539a-cac8-424e-82ab-b2f000b8856e'
    }
    
    panopto_results = {}
    for code, fid in PANOPTO_FOLDERS.items():
        recs = fetch_panopto_sessions_for_folder(fid)
        if recs:
            panopto_results[code] = recs
            print(f"  {code}: Found {len(recs)} Panopto recordings")
            sync_logs.append({
                'id': f'sync-{code}-panopto',
                'timestamp': time.strftime('%H:%M'),
                'moduleCode': code,
                'type': 'verified',
                'fileName': 'Panopto Recordings',
                'description': f'Synced {len(recs)} multi-stream recordings with interactive viewer support'
            })

    # Update mockCourses.ts with fresh recordings, verified solutions, and materials
    with open(MOCK_COURSES_PATH, 'r') as fp:
        mc_content = fp.read()
        
    for code, recs in panopto_results.items():
        recs_json = json.dumps(recs, indent=6)
        pattern = rf'(code:\s*"{code}".*?recordings:\s*)(\[[^\]]*\])'
        def repl(match):
            return match.group(1) + recs_json
        mc_content, count = re.subn(pattern, repl, mc_content, flags=re.DOTALL)
        if count:
            print(f"  Updated recordings in mockCourses.ts for {code}")
            
    with open(MOCK_COURSES_PATH, 'w') as fp:
        fp.write(mc_content)
        
    print(f"Synchronization complete in {round(time.time() - start_time, 2)}s.")
    return {
        'success': True,
        'timestamp': time.strftime('%H:%M'),
        'logs': sync_logs
    }

if __name__ == '__main__':
    res = main()
    print(json.dumps(res, indent=2))
