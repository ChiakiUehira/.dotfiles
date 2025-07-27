-- 既存設定のクリア
vim.api.nvim_clear_autocmds({})

-- 言語設定
vim.scriptencoding = "utf-8"
vim.opt.encoding = "utf-8"
vim.opt.fileencoding = "utf-8"
vim.env.LANG = "ja_JP.UTF-8"

vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1


-- quickfixウィンドウを自動で閉じる設定
vim.api.nvim_create_autocmd("FileType", {
	callback = function()
		local bufnr = vim.fn.bufnr("%")
		vim.keymap.set("n", "<Return>", function()
			vim.api.nvim_command([[execute "normal! \<cr>"]])
			vim.api.nvim_command(bufnr .. "bd")
		end, { buffer = bufnr })
	end,
	pattern = "qf",
})

-- Neovim起動時にnvim-treeを自動で開く
vim.api.nvim_create_autocmd({ "VimEnter" }, {
	callback = function(data)
		-- buffer is a real file on the disk
		local real_file = vim.fn.filereadable(data.file) == 1

		-- buffer is a [No Name]
		local no_name = data.file == "" and vim.bo[data.buf].buftype == ""

		if not real_file and not no_name then
			return
		end
	end,
})

-- 透明背景設定
vim.api.nvim_create_autocmd('VimEnter', {
  pattern = '*',
  command = 'hi Normal guibg=NONE ctermbg=NONE'
})

-- 非推奨API の互換性対応
if vim.lsp.buf_get_clients == nil then
  vim.lsp.buf_get_clients = function(bufnr)
    return vim.lsp.get_clients({ bufnr = bufnr })
  end
end
