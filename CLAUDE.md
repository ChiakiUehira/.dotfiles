# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a dotfiles repository for managing personal configuration files and development environment setup. It contains configurations for zsh, Neovim, git, tmux, and SSH.

## Architecture

```
.dotfiles/
├── zsh/          # Zsh shell configuration (Oh My Zsh)
├── nvim/         # Neovim configuration (Lua-based)
├── git/          # Git global configuration and gitignore
├── tmux/         # Tmux terminal multiplexer configuration
├── ssh/          # SSH configuration (example files)
├── install.sh    # Installation script
└── README.md     # Documentation
```

## Common Commands

```bash
# Install all dotfiles
./install.sh

# Update dotfiles from current system configuration
./update.sh

# Test Neovim configuration
nvim --version
nvim +checkhealth

# Reload zsh configuration
source ~/.zshrc

# Test tmux configuration
tmux source-file ~/.tmux.conf
```

## Update Workflow

When you modify your configurations and want to update the dotfiles repository:

1. **Update dotfiles from system**: `./update.sh`
2. **Review changes**: `git diff`
3. **Commit changes**: `git add . && git commit -m "Update configurations"`
4. **Push to repository**: `git push`

## Key Configuration Details

- **Zsh**: Uses Oh My Zsh with robbyrussell theme, case-sensitive completion enabled
- **Neovim**: Lua-based configuration with lazy.nvim plugin manager
- **Git**: Includes global gitconfig and comprehensive gitignore
- **Tmux**: Custom key bindings and status bar configuration
- **SSH**: Example configuration file (security sensitive)

## Development Guidelines

- Always backup existing configurations before installing
- Test configurations in isolated environments first
- Keep sensitive information (SSH keys, personal tokens) in example files only
- Update plugin managers and dependencies regularly