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

require("lazy").setup({
	{
		"morhetz/gruvbox",
		config = function()
			vim.cmd([[colorscheme gruvbox]])
		end,
	},
	{
		"davidgranstrom/scnvim",
		config = function()
			local scnvim = require("scnvim")
			local map = scnvim.map
			local map_expr = scnvim.map_expr
			require("scnvim").setup({
				keymaps = {
					["<C-e>"] = {
						map("editor.send_block", { "i", "n" }),
						map("editor.send_selection", "x"),
					},
					["<C-m>"] = map_expr("CmdPeriod.run"),
					["<F1>"] = map("sclang.start"),
				},
				snippet = {
					engine = {
						options = {
							name = "luasnip",
							descriptions = true,
						},
					},
				},
				editor = {
					highlight = {
						color = "IncSearch",
					},
				},
			})
		end,
	},
	{ "tidalcycles/vim-tidal" },
	{ "styled-components/vim-styled-components" },
	{ "prisma/vim-prisma" },
	{
		"ahmedkhalf/project.nvim",
		config = function()
			require("project_nvim").setup()
		end,
	},
	{
		"Shatur/neovim-session-manager",
		config = function()
			local config = require("session_manager.config")
			require("session_manager").setup({
				autoload_mode = config.AutoloadMode.Disabled,
			})
		end,
	},
	{
		"goolord/alpha-nvim",
		event = "VimEnter",
		dependencies = { "nvim-tree/nvim-web-devicons" },
		config = function()
			local dashboard = require("alpha.themes.dashboard")
			dashboard.section.buttons.val = {
				dashboard.button("e", "New file", ":ene <BAR> startinsert <CR>"),
				dashboard.button("p", "Find projects", ":Telescope projects<CR>"),
				dashboard.button("f", "Find file", ":Telescope find_files<CR>"),
				dashboard.button("w", "Find word", ":Telescope live_grep<CR>"),
				dashboard.button("h", "Recently opened files", ":Telescope oldfiles<CR>"),
				dashboard.button("r", "Restore session", ":SessionManager load_last_session<CR>"),
				dashboard.button("s", "Settings", ":e $MYVIMRC | :cd %:p:h<CR>"),
				dashboard.button("q", "Quit", ":qa<CR>"),
			}
			require("alpha").setup(dashboard.opts)
		end,
	},
	{
		"kylechui/nvim-surround",
		version = "*",
		event = "VeryLazy",
		config = function()
			require("nvim-surround").setup()
		end,
	},
	{
		"nvim-tree/nvim-tree.lua",
		version = "*",
		dependencies = {
			"nvim-tree/nvim-web-devicons",
		},
		config = function()
			require("nvim-tree").setup({
				disable_netrw = true,
				hijack_netrw = true,
				respect_buf_cwd = true,
				sync_root_with_cwd = true,
				filters = {
					dotfiles = false,
				},
				git = {
					ignore = true,
				},
				view = {
					preserve_window_proportions = true,
				},
				actions = {
					open_file = {
						window_picker = {
							enable = false,
						},
					},
				},
				on_attach = function(bufnr)
					local api = require("nvim-tree.api")
					local function opts(desc)
						return {
							desc = "nvim-tree: " .. desc,
							buffer = bufnr,
							noremap = true,
							silent = true,
							nowait = true,
						}
					end
					vim.keymap.set("n", "<C-]>", api.tree.change_root_to_node, opts("CD"))
					vim.keymap.set("n", "<C-e>", api.node.open.replace_tree_buffer, opts("Open: In Place"))
					vim.keymap.set("n", "<C-k>", api.node.show_info_popup, opts("Info"))
					vim.keymap.set("n", "<C-r>", api.fs.rename_sub, opts("Rename: Omit Filename"))
					vim.keymap.set("n", "<C-t>", api.node.open.tab, opts("Open: New Tab"))
					vim.keymap.set("n", "<C-v>", api.node.open.vertical, opts("Open: Vertical Split"))
					vim.keymap.set("n", "<C-x>", api.node.open.horizontal, opts("Open: Horizontal Split"))
					vim.keymap.set("n", "<BS>", api.node.navigate.parent_close, opts("Close Directory"))
					vim.keymap.set("n", "<CR>", api.node.open.edit, opts("Open"))
					vim.keymap.set("n", "<Tab>", api.node.open.preview, opts("Open Preview"))
					vim.keymap.set("n", ">", api.node.navigate.sibling.next, opts("Next Sibling"))
					vim.keymap.set("n", "<", api.node.navigate.sibling.prev, opts("Previous Sibling"))
					vim.keymap.set("n", ".", api.node.run.cmd, opts("Run Command"))
					vim.keymap.set("n", "-", api.tree.change_root_to_parent, opts("Up"))
					vim.keymap.set("n", "a", api.fs.create, opts("Create"))
					vim.keymap.set("n", "bmv", api.marks.bulk.move, opts("Move Bookmarked"))
					vim.keymap.set("n", "B", api.tree.toggle_no_buffer_filter, opts("Toggle No Buffer"))
					vim.keymap.set("n", "c", api.fs.copy.node, opts("Copy"))
					vim.keymap.set("n", "C", api.tree.toggle_git_clean_filter, opts("Toggle Git Clean"))
					vim.keymap.set("n", "[c", api.node.navigate.git.prev, opts("Prev Git"))
					vim.keymap.set("n", "]c", api.node.navigate.git.next, opts("Next Git"))
					vim.keymap.set("n", "d", api.fs.remove, opts("Delete"))
					vim.keymap.set("n", "D", api.fs.trash, opts("Trash"))
					vim.keymap.set("n", "E", api.tree.expand_all, opts("Expand All"))
					vim.keymap.set("n", "e", api.fs.rename_basename, opts("Rename: Basename"))
					vim.keymap.set("n", "]e", api.node.navigate.diagnostics.next, opts("Next Diagnostic"))
					vim.keymap.set("n", "[e", api.node.navigate.diagnostics.prev, opts("Prev Diagnostic"))
					vim.keymap.set("n", "F", api.live_filter.clear, opts("Clean Filter"))
					vim.keymap.set("n", "g?", api.tree.toggle_help, opts("Help"))
					vim.keymap.set("n", "gy", api.fs.copy.absolute_path, opts("Copy Absolute Path"))
					vim.keymap.set("n", "H", api.tree.toggle_hidden_filter, opts("Toggle Dotfiles"))
					vim.keymap.set("n", "I", api.tree.toggle_gitignore_filter, opts("Toggle Git Ignore"))
					vim.keymap.set("n", "J", api.node.navigate.sibling.last, opts("Last Sibling"))
					vim.keymap.set("n", "K", api.node.navigate.sibling.first, opts("First Sibling"))
					vim.keymap.set("n", "m", api.marks.toggle, opts("Toggle Bookmark"))
					vim.keymap.set("n", "o", api.node.open.edit, opts("Open"))
					vim.keymap.set("n", "O", api.node.open.no_window_picker, opts("Open: No Window Picker"))
					vim.keymap.set("n", "p", api.fs.paste, opts("Paste"))
					vim.keymap.set("n", "P", api.node.navigate.parent, opts("Parent Directory"))
					vim.keymap.set("n", "q", api.tree.close, opts("Close"))
					vim.keymap.set("n", "r", api.fs.rename, opts("Rename"))
					vim.keymap.set("n", "R", api.tree.reload, opts("Refresh"))
					vim.keymap.set("n", "S", api.tree.search_node, opts("Search"))
					vim.keymap.set("n", "U", api.tree.toggle_custom_filter, opts("Toggle Hidden"))
					vim.keymap.set("n", "W", api.tree.collapse_all, opts("Collapse"))
					vim.keymap.set("n", "x", api.fs.cut, opts("Cut"))
					vim.keymap.set("n", "y", api.fs.copy.filename, opts("Copy Name"))
					vim.keymap.set("n", "Y", api.fs.copy.relative_path, opts("Copy Relative Path"))
					vim.keymap.set("n", "<2-LeftMouse>", api.node.open.edit, opts("Open"))
					vim.keymap.set("n", "<2-RightMouse>", api.tree.change_root_to_node, opts("CD"))
					vim.keymap.set("n", "h", api.node.navigate.parent_close, opts("Close Directory"))
					vim.keymap.set("n", "l", api.node.open.edit, opts("Edit"))
					vim.keymap.set("n", "<Return>", api.node.open.edit, opts("Edit"))
				end,
			})
		end,
	},
	{
		"hrsh7th/nvim-cmp",
		config = function()
			local cmp = require("cmp")
			local luasnip = require("luasnip")
			local cmp_autopairs = require("nvim-autopairs.completion.cmp")
			cmp.setup({
				snippet = {
					expand = function(args)
						require("luasnip").lsp_expand(args.body)
					end,
				},
				mapping = cmp.mapping.preset.insert({
					["<C-p>"] = cmp.mapping.select_prev_item(),
					["<C-n>"] = cmp.mapping.select_next_item(),
					["<C-b>"] = cmp.mapping.scroll_docs(-4),
					["<C-f>"] = cmp.mapping.scroll_docs(4),
					["<C-e>"] = cmp.mapping.abort(),
					["<Tab>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							cmp.select_next_item()
						elseif luasnip.locally_jumpable(1) then
							luasnip.jump(1)
						else
							fallback()
						end
					end, { "i", "s" }),
					["<S-Tab>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							cmp.select_prev_item()
						elseif luasnip.locally_jumpable(-1) then
							luasnip.jump(-1)
						else
							fallback()
						end
					end, { "i", "s" }),
					["<CR>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							local entry = cmp.get_selected_entry()
							if entry then
								cmp.confirm({
									select = false,
								})
							else
								fallback()
								cmp.close()
							end
						else
							fallback()
						end
					end),
				}),
				sources = {
					{ name = "copilot" },
					{ name = "nvim_lsp" },
					{ name = "tag" },
					{ name = "luasnip" },
				},
				experimental = {
					ghost_text = false,
				},
			})
			cmp.setup.filetype("gitcommit", {
				sources = cmp.config.sources({
					{ name = "cmp_git" }, -- You can specify the `cmp_git` source if you were installed it.
				}, {
					{ name = "buffer" },
				}),
			})
			cmp.setup.cmdline({ "/", "?" }, {
				mapping = cmp.mapping.preset.cmdline(),
				sources = {
					{ name = "buffer" },
				},
			})
			cmp.setup.cmdline(":", {
				mapping = cmp.mapping.preset.cmdline(),
				sources = cmp.config.sources({
					{ name = "path" },
				}, {
					{ name = "cmdline" },
				}),
			})
			cmp.event:on("confirm_done", cmp_autopairs.on_confirm_done())
		end,
	},
	{
		"hrsh7th/cmp-nvim-lsp",
	},
	{
		"hrsh7th/cmp-path",
	},
	{
		"L3MON4D3/LuaSnip",
		version = "v2.*", -- Replace <CurrentMajor> by the latest released major (first number of latest release)
		build = "make install_jsregexp",
		config = function()
			require("luasnip").add_snippets("supercollider", require("scnvim/utils").get_snippets())
		end,
	},
	{
		"saadparwaiz1/cmp_luasnip",
	},
	{
		"quangnguyen30192/cmp-nvim-tags",
	},
	{
		"hrsh7th/cmp-buffer",
	},
	{
		"hrsh7th/cmp-cmdline",
	},
	{
		"zbirenbaum/copilot-cmp",
		config = function()
			require("copilot_cmp").setup()
		end,
	},
	{
		"neovim/nvim-lspconfig",
	},
	{
		"williamboman/mason.nvim",
		build = ":MasonUpdate",
		config = function()
			require("mason").setup()
		end,
	},
	-- {
	-- 	"williamboman/mason-lspconfig.nvim",
	-- 	dependencies = {
	-- 		"williamboman/mason.nvim",
	-- 		"neovim/nvim-lspconfig",
	-- 	},
	-- 	config = function()
	-- 		require("mason-lspconfig").setup()
	-- 	end,
	-- },
	{ "mg979/vim-visual-multi" },
	{
		"zbirenbaum/copilot.lua",
		cmd = "Copilot",
		event = "InsertEnter",
		config = function()
			require("copilot").setup({
				suggestion = { enabled = false },
				panel = { enabled = false },
			})
		end,
	},
	{
		"windwp/nvim-autopairs",
		event = "InsertEnter",
		config = function()
			require("nvim-autopairs").setup()
		end,
	},
	{
		"windwp/nvim-ts-autotag",
		config = function()
			require("nvim-ts-autotag").setup()
		end,
	},
	{
		"nvim-treesitter/nvim-treesitter-textobjects",
	},
	{
		"nvim-treesitter/nvim-treesitter",
		config = function()
			require("nvim-treesitter.install").update({ with_sync = true })
			require("nvim-treesitter.configs").setup({
				autotag = {
					enable = true,
				},
				indent = {
					enable = true,
				},
				textobjects = {
					select = {
						enable = true,
						lookahead = true,
						keymaps = {
							["af"] = "@function.outer",
							["if"] = "@function.inner",
							["ac"] = "@class.outer",
							["ic"] = "@class.inner",
							["ab"] = "@block.outer",
							["ib"] = "@block.inner",
						},
					},
				},
			})
		end,
	},
	{ "nvim-lua/plenary.nvim" },
	{
		"nvim-telescope/telescope.nvim",
		config = function()
			require("telescope").setup({
				defaults = {
					file_ignore_patterns = { "node_modules", "dist", "build", "target" },
					mappings = {
						i = {
							["<esc>"] = require("telescope.actions").close,
						},
					},
				},
			})
			require("telescope").load_extension("projects")
			require("telescope").load_extension("scdoc")
		end,
	},
	{ "davidgranstrom/telescope-scdoc.nvim" },
	{
		"numToStr/Comment.nvim",
		config = function()
			require("Comment").setup()
		end,
	},
	{
		"nvim-tree/nvim-web-devicons",
		config = true,
	},
	{
		"phaazon/hop.nvim",
		config = true,
	},
	{
		"pwntester/octo.nvim",
		dependencies = {
			"nvim-lua/plenary.nvim",
			"nvim-telescope/telescope.nvim",
			"nvim-tree/nvim-web-devicons",
		},
		config = function()
			require("octo").setup()
		end,
	},
	{
		"nvim-lualine/lualine.nvim",
		dependencies = { "nvim-tree/nvim-web-devicons" },
		config = function()
			require("lualine").setup({
				options = {
					theme = "auto",
				},
			})
		end,
	},
	{
		"akinsho/bufferline.nvim",
		dependencies = "nvim-tree/nvim-web-devicons",
		config = function()
			require("bufferline").setup({
				options = {
					show_buffer_close_icons = false,
					show_close_icon = false,
				},
			})
		end,
	},
	{
		"lewis6991/gitsigns.nvim",
		config = function()
			require("gitsigns").setup({
				current_line_blame = true,
			})
		end,
	},
	{
		"mattn/emmet-vim",
		lazy = true,
	},
	{
		"antosha417/nvim-lsp-file-operations",
		dependencies = {
			"nvim-lua/plenary.nvim",
			"nvim-tree/nvim-tree.lua",
		},
		config = function()
			require("lsp-file-operations").setup()
		end,
	},
	{
		"MunifTanjim/prettier.nvim",
		config = function()
			require("prettier").setup()
		end,
	},
	{
		"petertriho/nvim-scrollbar",
		config = function()
			require("scrollbar").setup()
		end,
	},
	{
		"shellRaining/hlchunk.nvim",
		event = { "UIEnter" },
		config = function()
			require("hlchunk").setup({})
		end,
	},
	{
		"greggh/claude-code.nvim",
		dependencies = {
			"nvim-lua/plenary.nvim", -- Required for git operations
		},
		config = function()
			require("claude-code").setup({
        window = {
          position = "botright"
        }
      })
		end,
	},
})
