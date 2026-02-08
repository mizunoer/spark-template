# Content Audit Spreadsheet

This folder contains a content audit of all site HTML pages with **Page**, **Location**, **Text**, and **Update** columns.

## Files

| File | Description |
|------|-------------|
| **content-audit.xml** | Single spreadsheet with **3 sheets**. Open in Microsoft Excel to see tabs: **Text**, **Images**, **Links**. (Excel 2003 XML format.) |
| content-audit-text.csv | Tab 1: All extracted text (titles, paragraphs, headings, links, etc.) |
| content-audit-images.csv | Tab 2: All images (src and alt) |
| content-audit-links.csv | Tab 3: All internal links (href and link text) |

## Columns (all three sheets)

- **Page** – HTML filename (e.g. index.html, about.html)
- **Location** – Section or element (e.g. Title, Header, Banner, Body, Footer, Image, Logo, Link, Nav)
- **Text** – For Text sheet: visible copy. For Images: `src=... | alt=...`. For Links: `href=... | text=...`
- **Update** – Empty; use for your notes or revised copy.

## Regenerating the audit

- **PowerShell** (from repo root):  
  `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\Build-ContentAudit.ps1`  
  Produces the 3 CSVs and **content-audit.xml** (and, if Excel is installed, **content-audit.xlsx**).

- **Node** (for a native .xlsx with 3 tabs):  
  `npm install xlsx` then `npm run content-audit`  
  Produces **content-audit.xlsx** plus the 3 CSVs.
