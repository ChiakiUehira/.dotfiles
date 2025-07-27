#!/bin/bash

# dotfiles installer script

set -e

DOTFILES_DIR="$HOME/.dotfiles"

echo "Starting dotfiles installation..."

# Backup existing files
backup_file() {
    if [ -f "$1" ] || [ -L "$1" ]; then
        mv "$1" "$1.backup.$(date +%Y%m%d_%H%M%S)"
        echo "Backed up existing $1"
    fi
}

# Create symlinks
create_symlink() {
    local source="$1"
    local target="$2"
    
    if [ -f "$source" ]; then
        backup_file "$target"
        ln -sf "$source" "$target"
        echo "Created symlink: $target -> $source"
    else
        echo "Warning: Source file $source not found"
    fi
}

# Install zsh configuration
echo "Installing zsh configuration..."
create_symlink "$DOTFILES_DIR/zsh/.zshrc" "$HOME/.zshrc"
create_symlink "$DOTFILES_DIR/zsh/.zprofile" "$HOME/.zprofile"

# Install zsh custom configuration
echo "Installing zsh custom configuration..."
if [ -d "$HOME/.config/zsh" ]; then
    mv "$HOME/.config/zsh" "$HOME/.config/zsh.backup.$(date +%Y%m%d_%H%M%S)"
    echo "Backed up existing zsh custom config"
fi
ln -sf "$DOTFILES_DIR/zsh" "$HOME/.config/zsh"

# Install neovim configuration
echo "Installing neovim configuration..."
if [ -d "$HOME/.config/nvim" ]; then
    mv "$HOME/.config/nvim" "$HOME/.config/nvim.backup.$(date +%Y%m%d_%H%M%S)"
    echo "Backed up existing nvim config"
fi
ln -sf "$DOTFILES_DIR/nvim" "$HOME/.config/nvim"

# Install git configuration
echo "Installing git configuration..."
create_symlink "$DOTFILES_DIR/git/.gitconfig" "$HOME/.gitconfig"
create_symlink "$DOTFILES_DIR/git/gitignore_global" "$HOME/.gitignore"

# Install tmux configuration
echo "Installing tmux configuration..."
create_symlink "$DOTFILES_DIR/tmux/.tmux.conf" "$HOME/.tmux.conf"

# SSH config (example file)
echo "SSH config example available at $DOTFILES_DIR/ssh/config.example"
echo "Please review and copy to ~/.ssh/config if needed"

# Install Homebrew packages
echo "Installing Homebrew packages..."
if command -v brew >/dev/null 2>&1; then
    if [ -f "$DOTFILES_DIR/brew/Brewfile" ]; then
        cd "$DOTFILES_DIR/brew"
        brew bundle install
        echo "Homebrew packages installed from Brewfile"
    else
        echo "Warning: Brewfile not found at $DOTFILES_DIR/brew/Brewfile"
    fi
else
    echo "Warning: Homebrew not found. Please install Homebrew first."
fi

# Install npm global packages
echo "Installing npm global packages..."
if command -v npm >/dev/null 2>&1; then
    if [ -f "$DOTFILES_DIR/npm/package-list.json" ]; then
        if command -v jq >/dev/null 2>&1; then
            packages=$(cat "$DOTFILES_DIR/npm/package-list.json" | jq -r '.dependencies | keys[]')
            for package in $packages; do
                echo "Installing npm package: $package"
                npm install -g "$package"
            done
            echo "npm global packages installed"
        else
            echo "Warning: jq not found. Please install jq to install npm packages automatically."
        fi
    else
        echo "Warning: package-list.json not found at $DOTFILES_DIR/npm/package-list.json"
    fi
else
    echo "Warning: npm not found. Please install Node.js and npm first."
fi

echo "Dotfiles installation completed!"
echo "You may need to restart your shell or run 'source ~/.zshrc' to apply changes."
