call plug#begin('~/.vim/plugged')

Plug 'scrooloose/nerdtree'
Plug 'Shougo/unite.vim'
Plug 'tpope/vim-endwise'
Plug 'tomtom/tcomment_vim'
Plug 'Shougo/neocomplete.vim'
Plug 'Shougo/neocomplcache.vim'
Plug 'othree/html5.vim'
Plug 'pangloss/vim-javascript'
Plug 'kchmck/vim-coffee-script'
Plug 'hail2u/vim-css3-syntax'
Plug 'tell-k/vim-browsereload-mac'
Plug 'mattn/emmet-vim'

call plug#end()



" vimを立ち上げたときに、自動的にvim-indent-guidesをオンにする
let g:indent_guides_enable_on_vim_startup = 1

highlight Pmenu ctermbg=4
highlight PmenuSel ctermbg=1
highlight PMenuSbar ctermbg=4

" 補完ウィンドウの設定
set completeopt=menuone
"
" rsenseでの自動補完機能を有効化
let g:rsenseUseOmniFunc = 1
let g:rsenseHome = '/usr/local/lib/rsense-0.3'
"
" " auto-ctagsを使ってファイル保存時にtagsファイルを更新
let g:auto_ctags = 1
"
" " 起動時に有効化
let g:neocomplcache_enable_at_startup = 1
"
" " 大文字が入力されるまで大文字小文字の区別を無視する
let g:neocomplcache_enable_smart_case = 1
"
" " _(アンダースコア)区切りの補完を有効化
let g:neocomplcache_enable_underbar_completion = 1
"
let g:neocomplcache_enable_camel_case_completion  =  1
"
" " 最初の補完候補を選択状態にする
let g:neocomplcache_enable_auto_select = 1
"
" " ポップアップメニューで表示される候補の数
let g:neocomplcache_max_list = 20
"
" " シンタックスをキャッシュするときの最小文字長
let g:neocomplcache_min_syntax_length = 3

" " 補完の設定
autocmd FileType ruby setlocal omnifunc=rubycomplete#Complete
if !exists('g:neocomplete#force_omni_input_patterns')
	let g:neocomplete#force_omni_input_patterns = {}
endif
let g:neocomplete#force_omni_input_patterns.ruby = '[^.*\t]\.\w*\|\h\w*::'
if !exists('g:neocomplete#keyword_patterns')
	let g:neocomplete#keyword_patterns = {}
endif
let g:neocomplete#keyword_patterns['default'] = '\h\w*'

augroup MyXML
	  autocmd!
		  autocmd Filetype xml inoremap <buffer> </ </<C-x><C-o>
			  autocmd Filetype html inoremap <buffer> </ </<C-x><C-o>
			augroup END
augroup END

let g:returnApp = "Terminal.app"
nmap <Space>bc :ChromeReloadStart<CR>
nmap <Space>bC :ChromeReloadStop<CR>
nmap <Space>bf :FirefoxReloadStart<CR>
nmap <Space>bF :FirefoxReloadStop<CR>
nmap <Space>bs :SafariReloadStart<CR>
nmap <Space>bS :SafariReloadStop<CR>
nmap <Space>bo :OperaReloadStart<CR>
nmap <Space>bO :OperaReloadStop<CR>
nmap <Space>ba :AllBrowserReloadStart<CR>
nmap <Space>bA :AllBrowserReloadStop<CR>

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
set tabstop=2
set shiftwidth=2

syntax enable
set background=dark
colorscheme solarized
highlight LineNr ctermfg=red

inoremap <C-q> <Esc>$a
inoremap <C-q> <Esc>^a
noremap	 <C-e> <Esc>$a
noremap  <C-e> <Esc>^a

nnoremap :tree :NERDTreeToggle
