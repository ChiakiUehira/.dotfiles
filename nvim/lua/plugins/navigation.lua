-- ナビゲーションプラグイン: ファイルツリー、ファイル検索、プロジェクト管理、セッション管理、GitHub連携
return {
	-- ファイルツリー: サイドバーファイルエクスプローラー、Git情報表示、カスタムキーマップ対応
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
	-- プロジェクト管理: プロジェクトルートの自動検出と切り替え
	{
		"ahmedkhalf/project.nvim",
		config = function()
			require("project_nvim").setup()
		end,
	},
	-- セッション管理: ワークスペースの保存と復元（自動読み込みは無効）
	{
		"Shatur/neovim-session-manager",
		config = function()
			local config = require("session_manager.config")
			require("session_manager").setup({
				autoload_mode = config.AutoloadMode.Disabled,
			})
		end,
	},
	-- ユーティリティライブラリ: 非同期処理、ファイル操作などの基本機能を提供
	{ "nvim-lua/plenary.nvim" },
	-- ファジーファインダー: ファイル、テキスト、コマンドの高速検索インターフェイス
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
	-- SuperColliderドキュメント検索: SuperColliderのヘルプドキュメントをTelescopeで検索
	{ "davidgranstrom/telescope-scdoc.nvim" },
	-- GitHub連携: GitHubのIssue、PR、レビューをNeovimから操作
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
  -- バッファ削除: バッファを安全に削除するためのプラグイン
  {
    "famiu/bufdelete.nvim"
  }
}
