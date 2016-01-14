#!/bin/sh

ln -sf ~/.dotfiles/.atom         ~/.atom
ln -sf ~/.dotfiles/.bash_profile ~/.bash_profile
ln -sf ~/.dotfiles/.bashrc       ~/.bashrc
ln -sf ~/.dotfiles/.nanorc       ~/.nanorc


source ~/.dotfiles/.bash_profile
source ~/.dotfiles/.bashrc

echo link!
