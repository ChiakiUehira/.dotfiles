local options = {
  encoding = "utf-8",
  fileencoding = "utf-8",
  updatetime = 300,
  signcolumn = "yes",
  tabstop = 2,
  shiftwidth = 2,
  confirm = true,
  number = true,
  autoindent = true,
  smartindent = true,
  termguicolors = true,
  autoread = true,
  expandtab = true,
  splitright = true,
  clipboard = "unnamedplus",
  hls = true,
  wrap = false,
  hidden = true,
  mouse = "a",
  undofile = true,
  shell = "zsh",
  tags = "./tags",
}

for k, v in pairs(options) do
  vim.opt[k] = v
end

vim.cmd([[
  let g:airline#extensions#tabline#enabled = 1
  let g:airline_powerline_fonts = 1
  set laststatus=2
  let g:airline_theme = "gruvbox"
  let g:airline#extensions#whitespace#enabled = 0

  let g:VM_mouse_mappings = 1
  let g:VM_maps = {}
  let g:VM_maps['Find Under'] = '<C-g>'
  let g:VM_maps['Find Subword Under'] = '<C-g>'

  let g:tidal_target = "terminal"
]])
