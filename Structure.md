# Project Structure

This document describes the purpose and structure of each file in the `calma-scape` project, and proposes a new folder organization for clarity and maintainability.

---

## Proposed Directory Structure

```
calma-scape/
│
├── README.md
├── Structure.md
├── index.html
├── style.css
│
├── screensavers/
│   ├── animated-rain/
│   │   └── animated-rain-background.html
│   ├── aurora-borealis/
│   │   ├── aurora-borealis.html
│   │   ├── aurora-borealis.css
│   │   └── aurora-borealis.js
│   └── starfield/
│       ├── starfield-with-galaxies.html
│       └── starfield.js
│
└── script.js
```

---

## Folder and File Descriptions

### Root Directory
- **README.md**: Project overview and instructions.
- **Structure.md**: This structure and documentation file.
- **index.html**: Main catalog page listing available screensavers.
- **style.css**: General styles for the catalog and screensaver list.
- **script.js**: (Currently unused) Example script for dynamically listing screensavers.

### `screensavers/` Folder
Contains all screensaver-related files, grouped by screensaver type.

#### `animated-rain/`
- **animated-rain-background.html**: Full-screen animated rain background screensaver with interactive controls. All logic and styles are inline.

#### `aurora-borealis/`
- **aurora-borealis.html**: Aurora Borealis screensaver page, references its own CSS and JS.
- **aurora-borealis.css**: Styles for the Aurora Borealis screensaver, including animated backgrounds and UI.
- **aurora-borealis.js**: Placeholder for Aurora Borealis screensaver logic (currently just a console log).

#### `starfield/`
- **starfield-with-galaxies.html**: Full-screen animated starfield with galaxies screensaver. Contains embedded JavaScript for animation.
- **starfield.js**: Standalone starfield animation script (not directly referenced in HTML, but could be used for modularity).

---

## Notes
- This organization groups each screensaver's files together, making it easier to maintain and extend the project.
- Shared or global files (like the catalog and general styles) remain in the root directory.
- If more screensavers are added, simply create a new folder under `screensavers/` for each one. 