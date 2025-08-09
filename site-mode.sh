#!/bin/bash

# Website Mode Switcher for Volovyk
# Usage: ./site-mode.sh [construction|live]

MODE=${1:-"help"}

case $MODE in
    "construction")
        echo "🚧 Switching to UNDER CONSTRUCTION mode..."
        if [ -f "index.md.backup" ]; then
            cp index.md index.md.live
            echo "✅ Current site backed up as index.md.live"
        fi
        
        # The under construction content is already in index.md
        echo "✅ Under construction page is now active"
        echo "📝 Your site will show the maintenance page"
        ;;
        
    "live")
        echo "🌐 Switching to LIVE mode..."
        if [ -f "index.md.backup" ]; then
            cp index.md.backup index.md
            echo "✅ Live site restored from backup"
            echo "📝 Your original site is now active"
        else
            echo "❌ No backup found (index.md.backup)"
            echo "Please restore your original index.md manually"
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
        echo "  index.md.live   - Live site backup (when in construction mode)"
        ;;
esac
