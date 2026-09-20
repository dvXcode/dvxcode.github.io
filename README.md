# Volovyk Company Site

This is the company website for Volovyk, a Norwegian software consulting company. The site is built with Jekyll using a customized version of the Jekyll Serif theme.

## About

Volovyk specializes in:
- Azure cloud development
- .NET Core applications
- Delphi legacy systems
- Dart & Flutter cross-platform development
- Startup consulting and mobile app development

## Site Mode Management

### Site Mode Switcher Script

The `site-mode.sh` script allows you to easily switch between live and maintenance modes for the website.

#### Why This Script Exists

- **Maintenance Mode**: Quickly put the site into "under construction" mode during updates, server maintenance, or when you need to temporarily disable the site
- **Search Engine Protection**: The site is configured to prevent indexing (robots.txt, meta tags), and maintenance mode reinforces this
- **Professional Appearance**: Instead of showing broken pages during maintenance, visitors see a polished "under construction" page
- **Easy Recovery**: Simple one-command restoration to live mode when maintenance is complete

#### Usage

```bash
# Switch to under construction mode
./site-mode.sh construction

# Restore live site
./site-mode.sh live

# Show help and available options
./site-mode.sh help
```

#### File Structure

- `index.html` - Current active homepage
- `index.md.backup` - Original site backup (created automatically)
- `index.html.live` - Live site backup (created when switching to construction mode)
- `site-mode.sh` - Mode switcher script

#### Manual Mode Switching

If you prefer manual control:

**Enable maintenance mode:**
```bash
cp index.html index.html.live
# Replace index.html content with under construction HTML
```

**Restore live site:**
```bash
cp index.md.backup index.html
```

### Search Engine Protection

The site includes multiple layers of search engine protection:
- `robots.txt` - Blocks all crawlers
- Meta robots tags - `noindex, nofollow` on all pages  
- `.htaccess` - Server-level crawler blocking
- Config settings - Additional Jekyll-level protection

## Development

The construction page uses plain HTML, CSS, and JavaScript. It needs no build step or JavaScript libraries.

To preview this page:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173` in your browser.

- `assets/css/construction.css` controls the page layout and colors.
- `assets/js/signal-animation.js` draws the pixel ribbon with Canvas 2D.
- The ribbon cycles between the signal scene and bracket waves. Each scene holds for seven seconds, then crossfades for three seconds.
- Square and diamond heads follow the signal paths, with segmented tails that turn at each corner.
- The page uses the dark palette from [Herdr](https://herdr.dev/). CSS color variables also supply the canvas colors.
- The animation runs at about 24 frames per second. It pauses when the tab is hidden.
- The animation plays automatically. Reduced-motion settings select a still frame.
- Keep `index.html` and `under-construction.html` in sync when you edit the construction page.

To run the site locally:

```bash
bundle install
bundle exec jekyll serve
```

## Deployment

The site is deployed using GitHub Pages and is available at [dvxcode.github.io](https://dvxcode.github.io).

---

*Based on the Jekyll Serif theme by Zerostatic*
