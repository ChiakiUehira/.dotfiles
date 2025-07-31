local keymap = vim.api.nvim_set_keymap
local opts = { noremap = true, silent = true }

-- Modes
--   normal_mode = 'n',
--   insert_mode = 'i',
--   visual_mode = 'v',
--   visual_block_mode = 'x',
--   term_mode = 't',
--   command_mode = 'c',
keymap("", "<space>", "<Nop>", opts)
vim.g.mapleader = " "
vim.g.maplocalleader = " "

keymap("i", "jj", "<ESC>", opts)

keymap("n", "sf", ":NvimTreeFindFile <Return>", opts)

keymap("n", "<C-h>", ":HopPattern<Return>", opts)

keymap("n", "sc", ":ClaudeCode <Return>", opts)

keymap("n", "sg", ":LazyGit<Return>", opts)

keymap("n", "<S-h>", "0", opts)
keymap("v", "<S-h>", "0", opts)
keymap("n", "<S-l>", "$", opts)
keymap("v", "<S-l>", "$", opts)

keymap("n", "<C-s>", ":update<Return>", opts)
keymap("n", "<C-A>", "gg<S-v>G", opts)

keymap("n", "ss", ":split<Return>", opts)
keymap("n", "sv", ":vsplit<Return>", opts)
keymap("n", "sh", "<C-w>h<Return>", opts)
keymap("n", "sl", "<C-w>l<Return>", opts)
keymap("n", "sj", "<C-w>j<Return>", opts)
keymap("n", "sk", "<C-w>k<Return>", opts)

keymap("n", "<C-p>", ":bprevious<Return>", opts)
keymap("n", "<C-n>", ":bnext<Return>", opts)
keymap("n", "<C-x>", "::Bdelete<Return>", opts)
keymap("n", "<C-q>", ":q<Return>", opts)

keymap("n", "x", '"_x', opts)
keymap("n", "d", '"_d', opts)
keymap("n", "D", '"_D', opts)

keymap("n", "p", "]p", opts)
keymap("n", "P", "]P", opts)

keymap("n", ";b", ":Telescope buffers<Return>", opts)
keymap("n", ";f", ":Telescope find_files<Return>", opts)
keymap("n", ";g", ":Telescope live_grep<Return>", opts)
keymap("n", ";d", ":Telescope diagnostics<Return>", opts)
keymap("n", ";k", ":Telescope keymaps<Return>", opts)
keymap("n", ";c", ":Telescope commands<Return>", opts)
keymap("n", ";p", ":Telescope project<Return>", opts)
keymap("n", ";i", ":Octo issue list<Return>", opts)
keymap("n", ";a", ":Octo issue list assignee=ChiakiUehira<Return>", opts)
keymap("n", ";r", ":Octo pr list<Return>", opts)

keymap("n", "<Leader>ic", ":Octo issue create<Return>", opts)

-- Cheatsheet shortcuts
keymap("n", ";n", ":e ~/.dotfiles/nvim-cheatsheet.md<Return>", opts)
keymap("n", ";t", ":e ~/.dotfiles/tmux-cheatsheet.md<Return>", opts)

keymap("v", "<", "<gv", opts)
keymap("v", ">", ">gv", opts)

keymap("n", "do", ":lua vim.diagnostic.open_float()<Return>", opts)
keymap("n", "dp", ":lua vim.diagnostic.goto_prev()<Return>", opts)
keymap("n", "dn", ":lua vim.diagnostic.goto_next()<Return>", opts)

vim.api.nvim_create_autocmd("LspAttach", {
  group = vim.api.nvim_create_augroup("UserLspConfig", {}),
  callback = function(ev)
    -- Enable completion triggered by <c-x><c-o>
    vim.bo[ev.buf].omnifunc = "v:lua.vim.lsp.omnifunc"
    local opts = { noremap = true, silent = true, buffer = ev.buf }
    vim.keymap.set("n", "gd", vim.lsp.buf.definition, opts)
    vim.keymap.set("n", "<C-l>", vim.lsp.buf.hover, opts)
    vim.keymap.set("n", "gi", vim.lsp.buf.implementation, opts)
    vim.keymap.set("n", "<C-k>", vim.lsp.buf.signature_help, opts)
    vim.keymap.set("n", "<space>wa", vim.lsp.buf.add_workspace_folder, opts)
    vim.keymap.set("n", "<space>wr", vim.lsp.buf.remove_workspace_folder, opts)
    vim.keymap.set("n", "<space>wl", function()
      print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
    end, opts)
    vim.keymap.set("n", "gt", vim.lsp.buf.type_definition, opts)
    vim.keymap.set("n", "<space>rn", vim.lsp.buf.rename, opts)
    vim.keymap.set("n", "<space>c", vim.lsp.buf.code_action, opts)
    vim.keymap.set("n", "gr", vim.lsp.buf.references, opts)
    vim.keymap.set("n", "<space>f", function()
      vim.lsp.buf.format({ async = true })
    end, opts)
  end,
})
