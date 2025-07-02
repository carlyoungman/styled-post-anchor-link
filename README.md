# Styled Post Anchor Link

A custom Gutenberg block plugin built for **dmg::media**. This block allows editors to insert visually styled anchor links to WordPress posts, with search, pagination, and customization options — all from within the block editor.

---

## ✨ Features

- Search for posts by title or ID
- Paginated results with custom navigation
- Displays a styled “Read More” link
- Fully integrated with the WordPress block editor (Gutenberg)
- Color, style, and typography customizations supported
- Built with React, using modern block registration (`blocks-manifest.php`)

---

## 📦 Installation

### Option 1: Upload via WordPress Admin

1. Download this plugin as a `.zip` file.
2. In your WordPress dashboard, go to `Plugins → Add New → Upload Plugin`.
3. Upload and activate.

### Option 2: Manual via FTP

1. Extract the ZIP file.
2. Upload the folder to: `/wp-content/plugins/styled-post-anchor-link`.
3. Activate the plugin in `Plugins`.

---

## 🚀 Development Setup

```bash
npm install       # Install dependencies
npm run start     # Start development build with watch mode
npm run build     # Build for production
npm run format    # Format JS/CSS with Prettier
npm run lint:js   # Lint JavaScript
npm run lint:css  # Lint CSS/SCSS
```

To generate a ZIP file for distribution:
```bash
npm run plugin-zip
```

---

## 🛠 Technologies Used

- WordPress (PHP)
- Gutenberg Block Editor
- React + JSX
- `@wordpress/scripts` build tooling
- `apiFetch` for REST API integration
- `lucide-react` for icons
- `GridLoader` from `react-spinners` for loading UI

---

## 🧪 Linting & Formatting

To fix common issues automatically:

```bash
npm run format            # Fixes all formatting (JS/CSS)
npm run lint:js -- --fix  # Fix JS linting issues
npm run lint:css -- --fix # Fix CSS/SCSS linting issues
```

---

## 📁 File Structure

```
styled-post-anchor-link/
├── build/                      # Compiled assets
├── src/                        # Block source files (JSX, SCSS)
├── editor.scss                 # Block editor styling
├── styled-post-anchor-link.php # Main plugin file
├── blocks-manifest.php         # Efficient block registration
├── package.json                # NPM scripts & dependencies
├── composer.json               # (Empty — ready for server-side PHP packages)
├── README.md                   # This file
```

---

## ✅ Compatibility

- WordPress 6.7+
- PHP 7.4+
- Tested with Gutenberg
- Developed for dmg::media

---

## 🖥 WP-CLI Support

This plugin includes a custom WP-CLI command to search posts for usage of the `styled-post-anchor-link` block.

### 🔍 Command: `wp dmg-read-more search`

Searches all published posts for the presence of the block within a date range.

#### ✅ Usage

```bash
wp dmg-read-more search --date-after="2024-01-01 00:00:00" --date-before="2024-07-01 23:59:59"
```

#### 🧩 Options

| Flag           | Description                                   | Default                      |
|----------------|-----------------------------------------------|------------------------------|
| `--date-after` | Start date in `Y-m-d H:i:s` format            | 30 days ago from now         |
| `--date-before`| End date in `Y-m-d H:i:s` format              | Current time                 |

#### 🛠 What it does

- Scans all `publish` status posts.
- Paginates through large datasets for performance.
- Logs post IDs that contain the block.
- Useful for audits, reporting, or block migration efforts.

---

## 👨‍💻 Author

**Carl Youngman**
[GitHub](https://github.com/carlyoungman) · [Website](https://www.carlyoungman.com)

---

## 📄 License

GPL-2.0-or-later
See [`LICENSE`](https://www.gnu.org/licenses/gpl-2.0.html) for details.
