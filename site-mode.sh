#!/bin/bash

# Website Mode Switcher for Volovyk
# Usage: ./site-mode.sh [construction|live]

MODE=${1:-"help"}

case $MODE in
    "construction")
        echo "🚧 Switching to UNDER CONSTRUCTION mode..."
        if [ -f "index.html" ]; then
            cp index.html index.html.live
            echo "✅ Current site backed up as index.html.live"
        fi
        
        # Replace index.html with under construction content
        cp under-construction.html index.html
        echo "✅ Under construction page is now active"
        echo "📝 Your site will show the maintenance page"
        ;;
        
    "live")
        echo "🌐 Switching to LIVE mode..."
        if [ -f "index.html.live" ]; then
            cp index.html.live index.html
            echo "✅ Live site restored from backup"
            echo "📝 Your original site is now active"
        else
            echo "❌ No backup found (index.html.live)"
            echo "Please restore your original index.html manually"
        fi
        ;;
        
    "help"|*)
        echo "Website Mode Switcher"
        echo "Usage: ./site-mode.sh [MODE]"
        echo ""
        echo "Modes:"
        echo "  construction  - Switch to under construction page"
        echo "  live         - Switch back to live site"
        echo "  help         - Show this help"
        echo ""
        echo "Files:"
        echo "  index.md.backup - Original site backup"
        echo "  index.html.live - Live site backup (when in construction mode)"
        echo "  index.html      - Current active homepage"
        ;;
esac
