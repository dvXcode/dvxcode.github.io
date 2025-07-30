# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a Jekyll-based static website hosted on GitHub Pages, serving as a personal blog and consulting services showcase for Volovyk ENK. The site uses the Minimal Mistakes theme.

**Core Technologies:**
- Jekyll static site generator
- Ruby with Bundler for dependency management
- Minimal Mistakes remote theme
- GitHub Pages for hosting
- Kramdown for Markdown processing

## Development Commands

**Local Development:**
```bash
bundle install          # Install Ruby dependencies
bundle exec jekyll serve # Start local development server at http://localhost:4000
bundle exec jekyll build # Build the site for production
```

**Content Management:**
- Blog posts go in `_posts/` with YYYY-MM-DD-title.md format
- Pages go in `_pages/` directory
- Services/products go in `_products/` collection
- Images and assets go in `assets/` directory

## Site Architecture

**Content Structure:**
- `_config.yml` - Main Jekyll configuration with theme settings, collections, and defaults
- `_data/navigation.yml` - Site navigation structure
- `_posts/` - Blog posts with frontmatter (title, categories, tags)
- `_pages/` - Static pages (about, contact, archives)
- `_products/` - Services collection for consulting offerings
- `assets/images/` - Image assets including bio photo

**Key Collections:**
- Posts: Technical blog content focusing on Azure, .NET, and development practices
- Products: Consulting services and startup MVP offerings
- Pages: Standard site pages with custom permalinks

**Theme Configuration:**
- Uses `mmistakes/minimal-mistakes` remote theme
- Configured for air skin with pagination (5 posts per page)
- Author profile with bio, avatar, and social links
- Category and tag archives with liquid-based generation
- Search functionality enabled

**Content Guidelines:**
- Blog posts should include relevant categories and tags
- Use frontmatter consistently across content types
- Images should be optimized and placed in `assets/images/`
- Follow established permalink patterns for consistency