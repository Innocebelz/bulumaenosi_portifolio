# Buluma Enosi — Portfolio

A dark-themed, single-page portfolio. No build step — open `index.html` directly
or deploy the folder as-is to GitHub Pages, Vercel, or Netlify.

## Structure

```
portfolio/
  index.html          → page structure only (rarely needs edits)
  css/style.css        → all custom styling
  js/data.js            → ALL editable content lives here (edit this file)
  js/main.js             → rendering + interaction logic (rarely needs edits)
  images/
    profile/avatar.jpg   → your profile photo
    projects/*.jpg        → one photo per project
```

## Adding or editing content

Everything you'll want to change day-to-day — your bio, skills, project
descriptions, links, quote — lives in **`js/data.js`** as plain JavaScript
objects. Nothing else needs to change.

**Add a new project**: copy one of the objects in `PROJECTS_DATA` and edit
the fields. `size: "large"` gives a full-width card, `size: "small"` gives a
half-width card.

**Change a skill level**: find the skill in `SKILLS_DATA` and change the
number (0–100) next to it.

## Adding real photos

Drop your image files into the folders below, **keeping the same filenames**,
and they'll appear automatically — no code changes needed:

- Profile photo → `images/profile/avatar.jpg` (square photo works best, it's
  cropped into a circle)
- Project photos → `images/projects/voting-system.jpg`,
  `devlink-extension.jpg`, `portfolio-site.jpg`, `uni-projects.jpg`
  (roughly 4:3 or 16:10 screenshots/photos work well)

Want a different filename or to add a new project's photo? Update the
`image:` path for that entry in `js/data.js` to match.

If a photo is missing or fails to load, the site automatically falls back to
a themed icon instead of showing a broken image — so it's safe to deploy
before all your photos are ready, and swap them in later.

Current images are auto-generated placeholders so the layout previews
correctly — replace them whenever you're ready.

## Deploying

No build step required. Push the `portfolio/` folder contents to a GitHub
repo and enable GitHub Pages, or drag the folder into Netlify/Vercel.
