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

To run the site locally:

```bash
bundle install
bundle exec jekyll serve
```

## Deployment

The site is deployed using GitHub Pages and is available at [dvxcode.github.io](https://dvxcode.github.io).

---

*Based on the Jekyll Serif theme by Zerostatic*
