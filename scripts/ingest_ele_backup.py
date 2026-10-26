#!/usr/bin/env python3
"""
ingest_ele_backup.py
Scans /home/samuel/Documents/ELE_Backup/, copies real PDFs to public/materials/<CODE>/,
and updates src/data/mockCourses.ts with real course resources, problem sheets,
real past papers, and Panopto lecture recordings.
"""

import os
import shutil
import re
import json

BACKUP_DIR = "/home/samuel/Documents/ELE_Backup"
PROJECT_DIR = "/home/samuel/Documents/GitHub/University-of-Exeter-Better-ELE"
MATERIALS_DIR = os.path.join(PROJECT_DIR, "public", "materials")

def format_file_size(num_bytes):
    if num_bytes < 1024 * 1024:
        return f"{num_bytes / 1024:.1f} KB"
    return f"{num_bytes / (1024 * 1024):.1f} MB"

def main():
    print(">>> Scanning ELE Backup directory:", BACKUP_DIR)
    os.makedirs(MATERIALS_DIR, exist_ok=True)

    # 1. Copy Past Papers
    past_papers_dir = os.path.join(BACKUP_DIR, "past papers")
    past_papers_by_code = {}

    if os.path.exists(past_papers_dir):
        for code in os.listdir(past_papers_dir):
            code_path = os.path.join(past_papers_dir, code)
            if not os.path.isdir(code_path):
                continue
            norm_code = code.upper()
            target_code_dir = os.path.join(MATERIALS_DIR, norm_code)
            os.makedirs(target_code_dir, exist_ok=True)
            past_papers_by_code[norm_code] = []

            for pdf_file in os.listdir(code_path):
                if not pdf_file.endswith(".pdf"):
                    continue
                src_pdf = os.path.join(code_path, pdf_file)
                dst_pdf = os.path.join(target_code_dir, pdf_file)
                shutil.copy2(src_pdf, dst_pdf)
                file_size = os.path.getsize(dst_pdf)

                # Parse session and year (e.g. MTH2008-24Jan.pdf)
                match = re.search(r'([0-9]{2})(Jan|May|Aug)', pdf_file, re.IGNORECASE)
                if match:
                    yr = f"20{match.group(1)}"
                    sess = match.group(2).capitalize()
                    title = f"Past Paper – {sess} {yr}"
                else:
                    title = pdf_file.replace('.pdf', '')

                past_papers_by_code[norm_code].append({
                    "id": f"pp-{norm_code.lower()}-{pdf_file.replace('.', '-')}",
                    "courseCode": norm_code,
                    "title": title,
                    "year": yr if match else "2024",
                    "session": sess if match else "Jan",
                    "url": f"/materials/{norm_code}/{pdf_file}",
                    "isLocal": True,
                    "fileSize": format_file_size(file_size)
                })

    print(f"Copied past papers for {len(past_papers_by_code)} modules.")

    # 2. Copy Course Materials (Lecture notes, tutorial sheets, etc.)
    course_dirs = {
        "MTH2008": "Real Analysis (MTH2008_A_1_202627)",
        "MTH2003": "Differential Equations (MTH2003_A_1_202627)",
        "MTH2010": "Groups, Rings and Fields (MTH2010_A_1_202627)",
        "MTH2014": "Numerical Modelling (MTH2014_A_1_202627)",
        "MTH1000": "Foundations (MTH1000_A_1_202526)",
        "MTH1001": "Mathematical Structures (MTH1001_A_12_202526)",
        "MTH1002": "Mathematical Methods (MTH1002_A_12_202526)",
        "MTH1003": "Mathematical Modelling (MTH1003_A_12_202526)",
        "MTH1004": "Probability, Statistics and Data (MTH1004_A_12_202)",
    }

    copied_materials = {}

    for code, folder_name in course_dirs.items():
        src_folder = os.path.join(BACKUP_DIR, folder_name)
        if not os.path.exists(src_folder):
            continue
        dst_folder = os.path.join(MATERIALS_DIR, code)
        os.makedirs(dst_folder, exist_ok=True)
        copied_materials[code] = []

        for root, dirs, files in os.walk(src_folder):
            for f in files:
                if not f.endswith(".pdf"):
                    continue
                src_path = os.path.join(root, f)
                # Clean destination filename
                clean_f = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', f)
                dst_path = os.path.join(dst_folder, clean_f)
                shutil.copy2(src_path, dst_path)
                file_size = os.path.getsize(dst_path)
                rel_sec = os.path.basename(root)

                copied_materials[code].append({
                    "filename": clean_f,
                    "original_name": f,
                    "section": rel_sec,
                    "url": f"/materials/{code}/{clean_f}",
                    "size": format_file_size(file_size)
                })

    for code, items in copied_materials.items():
        print(f"Copied {len(items)} material PDFs for {code}.")

    print(">>> Finished copying ELE backup materials!")

if __name__ == "__main__":
    main()
