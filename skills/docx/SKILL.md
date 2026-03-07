---
name: docx
description: Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers on 'Word doc', '.docx', or requests for reports, memos, or letters as Word files.
---

# DOCX Creation and Editing

## Overview

A .docx file is a ZIP archive of XML files.

## Creating a New Document

Use the `docx-js` library:

```bash
npm install docx
```

## Reading Content

```bash
pandoc document.docx -o output.md
```
