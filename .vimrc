call plug#begin('~/.vim/plugged')

Plug 'scrooloose/nerdtree'
Plug 'Shougo/unite.vim'
Plug 'tpope/vim-endwise'
Plug 'tomtom/tcomment_vim'
Plug 'nathanaelkane/vim-indent-guides'

call plug#end()



" vimを立ち上げたときに、自動的にvim-indent-guidesをオンにする
let g:indent_guides_enable_on_vim_startup = 1

imap { {}<LEFT>
imap [ []<LEFT>
imap ( ()<LEFT>

set title
set wildmenu
set showcmd
set smartcase
set background=dark
set incsearch
set number
set showmatch
set autoindent
set smartindent
set tabstop=4
set shiftwidth=2

syntax enable
set background=dark
colorscheme solarized
highlight LineNr ctermfg=red

inoremap <C-q> <Esc>$a
inoremap <C-q> <Esc>^a
noremap	 <C-e> <Esc>$a
noremap  <C-e> <Esc>^a
