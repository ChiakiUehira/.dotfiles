local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"https://github.com/folke/lazy.nvim.git",
		"--branch=stable", -- latest stable release
		lazypath,
	})
end

vim.opt.rtp:prepend(lazypath)

local plugins = {}

-- 各モジュールからプラグインを読み込み
local modules = {
	"plugins.ui",
	"plugins.lsp", 
	"plugins.editor",
	"plugins.navigation",
	"plugins.languages"
}

for _, module in ipairs(modules) do
	local ok, module_plugins = pcall(require, module)
	if ok then
		vim.list_extend(plugins, module_plugins)
	else
		vim.notify("Failed to load " .. module, vim.log.levels.ERROR)
	end
end

require("lazy").setup(plugins)