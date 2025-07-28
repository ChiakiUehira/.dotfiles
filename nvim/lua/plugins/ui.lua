-- UIプラグイン: テーマ、ダッシュボード、ステータスライン、バッファライン、スクロールバー、チャンクハイライト
return {
	-- カラーテーマ: gruvboxテーマを使用
	{
		"morhetz/gruvbox",
		config = function()
			vim.cmd([[colorscheme gruvbox]])
		end,
	},
	-- ダッシュボード: 起動時にスタートスクリーンを表示（プロジェクト選択、ファイル検索など）
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
	-- アイコン: ファイルタイプに応じたアイコンを表示
	{
		"nvim-tree/nvim-web-devicons",
		config = true,
	},
	-- ステータスライン: 下部にモード、ファイル名、Git情報などを表示
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
	-- バッファライン: 上部にタブ形式でバッファを表示
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
	-- スクロールバー: 右側にスクロール位置とGit情報を表示
	{
		"petertriho/nvim-scrollbar",
		config = function()
			require("scrollbar").setup()
		end,
	},
	-- インデントハイライト: インデントレベルと括弧の対応をハイライト表示
	{
		"shellRaining/hlchunk.nvim",
		event = { "UIEnter" },
		config = function()
			require("hlchunk").setup({})
		end,
	},
  -- 空白インデントライン: 空白文字のインデントを視覚的に表示
  {
    "lukas-reineke/indent-blankline.nvim",
    main = "ibl",
    ---@module "ibl"
    ---@type ibl.config
    opts = {},
    config = function()
      require("ibl").setup()
    end,
  }
}
