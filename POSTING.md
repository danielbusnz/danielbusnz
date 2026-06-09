# Posting

Posts are plain markdown files in `content/posts/`, one file per post.

## File

Name it `YYYY-MM-DD-slug.md`. The URL is the full filename without `.md`, e.g.
`2026-06-09-hello.md` → `/posts/2026-06-09-hello`. The home page orders posts by
the `date` frontmatter field, newest first.

## Frontmatter

```markdown
---
title: Your title
date: 2026-06-09
summary: One line shown on the home page.
---

Body in markdown. GitHub-flavored markdown works (tables, task lists, etc.).
```

## From the terminal

Tell Claude "post about X". It writes the file, you review the diff, then it
commits and pushes. Vercel auto-deploys from `main`.
