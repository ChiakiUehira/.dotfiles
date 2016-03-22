#!/bin/sh

ln -sf ~/.dotfiles/.atom         ~/.atom
ln -sf ~/.dotfiles/.bash_profile ~/.bash_profile
ln -sf ~/.dotfiles/.bashrc       ~/.bashrc
ln -sf ~/.dotfiles/.nanorc       ~/.nanorc
ln -sf ~/.dotfiles/.gitconfig    ~/.gitconfig
ln -sf ~/.dotfiles/.gitignore    ~/.gitignore
ln -sf ~/.dotfiles/.shell    ~/.shell

source ~/.bash_profile
source ~/.bashrc

echo link!
