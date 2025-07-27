#!/bin/bash

# dotfiles update script

set -e

DOTFILES_DIR="$HOME/.dotfiles"

echo "Updating dotfiles from current system configuration..."

# Update zsh configuration
echo "Updating zsh configuration..."
if [ -f "$HOME/.zshrc" ]; then
    cp "$HOME/.zshrc" "$DOTFILES_DIR/zsh/"
    echo "Updated .zshrc"
fi

if [ -f "$HOME/.zprofile" ]; then
    cp "$HOME/.zprofile" "$DOTFILES_DIR/zsh/"
    echo "Updated .zprofile"
fi

# Update zsh custom configuration
echo "Updating zsh custom configuration..."
if [ -d "$HOME/.config/zsh" ]; then
    # Remove old custom config from dotfiles
    rm -rf "$DOTFILES_DIR/zsh/custom"
    # Copy current custom config
    cp -r "$HOME/.config/zsh" "$DOTFILES_DIR/zsh/custom"
    echo "Updated zsh custom configuration"
fi

# Update neovim configuration
echo "Updating neovim configuration..."
if [ -d "$HOME/.config/nvim" ]; then
    # Remove old nvim config from dotfiles
    rm -rf "$DOTFILES_DIR/nvim"
    # Copy current nvim config
    cp -r "$HOME/.config/nvim" "$DOTFILES_DIR/"
    echo "Updated neovim configuration"
fi

# Update git configuration
echo "Updating git configuration..."
if [ -f "$HOME/.gitconfig" ]; then
    cp "$HOME/.gitconfig" "$DOTFILES_DIR/git/"
    echo "Updated .gitconfig"
fi

if [ -f "$HOME/.gitignore" ]; then
    cp "$HOME/.gitignore" "$DOTFILES_DIR/git/gitignore_global"
    echo "Updated global gitignore"
fi

# Update tmux configuration
echo "Updating tmux configuration..."
if [ -f "$HOME/.tmux.conf" ]; then
    cp "$HOME/.tmux.conf" "$DOTFILES_DIR/tmux/"
    echo "Updated .tmux.conf"
fi

# SSH config (optional, for security reasons)
echo "SSH config update skipped (contains sensitive information)"
echo "If needed, manually update: cp ~/.ssh/config $DOTFILES_DIR/ssh/config.example"

echo ""
echo "Dotfiles update completed!"
echo "Don't forget to commit and push changes to your repository:"
echo "  cd $DOTFILES_DIR"
echo "  git add ."
echo "  git commit -m 'Update dotfiles'"
echo "  git push"