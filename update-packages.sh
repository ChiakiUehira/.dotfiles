#!/bin/bash

# Package lists updater script

set -e

DOTFILES_DIR="$HOME/.dotfiles"

echo "Updating package lists..."

# Update Homebrew packages list
echo "Updating Homebrew package list..."
if command -v brew >/dev/null 2>&1; then
    brew bundle dump --file="$DOTFILES_DIR/brew/Brewfile" --force
    echo "✓ Brewfile updated at $DOTFILES_DIR/brew/Brewfile"
else
    echo "⚠ Warning: Homebrew not found. Skipping Brewfile update."
fi

# Update npm global packages list
echo "Updating npm global packages list..."
if command -v npm >/dev/null 2>&1; then
    npm list -g --depth=0 --json > "$DOTFILES_DIR/npm/package-list.json"
    echo "✓ npm package list updated at $DOTFILES_DIR/npm/package-list.json"
else
    echo "⚠ Warning: npm not found. Skipping npm package list update."
fi

echo ""
echo "Package lists update completed!"
echo "Run 'git status' to see changes, then commit with:"
echo "  git add ."
echo "  git commit -m 'Update package lists'"