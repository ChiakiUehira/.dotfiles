
init:
	make homebrew
	make -i brew
	make -i fishshell
	fish
	make node
	make link
	make php
	
link:
	ln -sf ~/.dotfiles/bash/.bashrc ~/.bashrc
	ln -sf ~/.dotfiles/bash/.bash_profile ~/.bash_profile
	ln -sf ~/.dotfiles/git/.gitconfig ~/.gitconfig
	ln -sf ~/.dotfiles/git/.master_gitignore ~/.master_gitignore
	ln -sf ~/.dotfiles/vim/.vimrc ~/.vimrc
	ln -sf ~/.dotfiles/nano/.nanorc ~/.nanorc
	ln -sf ~/.dotfiles/tmux/.tmux.conf ~/.tmux.conf	
	ln -sf ~/.dotfiles/fish/aliases.fish ~/.config/fish/aliases.fish
	ln -sf ~/.dotfiles/fish/config.fish ~/.config/fish/config.fish
	ln -sf ~/.dotfiles/fish/fishfile ~/.config/fish/fishfile

homebrew:
	curl -o install -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install
	ruby ./install
	rm ./install

brew:
	make -i brew-opt
	brew install ettercap
	brew install gibo
	brew install git
	brew install glide
	brew install go --cross-compile-common
	brew install httpie
	brew install hub
	brew install micro
	brew install nkf
	brew install nodebrew
	brew install peco
	brew install tmux
	brew install tor
	brew install torsocks
	brew install tree
	brew install w3m
	brew install wget
	brew install wireshark
	brew install youtube-dl
	brew install z

brew-opt:
	brew update
	brew upgrade
	brew cleanup

fishshell: 
	brew install fish
	curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs git.io/fisher
	ln -sf ~/.dotfiles/fish/aliases.fish ~/.config/fish/aliases.fish
	ln -sf ~/.dotfiles/fish/config.fish ~/.config/fish/config.fish
	ln -sf ~/.dotfiles/fish/fishfile ~/.config/fish/fishfile
	fish --command "fisher install"

node:
	nodebrew selfupdate
	nodebrew install-binary stable
	nodebrew use stable

php:
	curl -s http://php-osx.liip.ch/install.sh | bash -s 7.1
