-- LSPプラグイン: コード補完、LSPサーバー、スニペット、Copilot、Prettier
return {
	-- コード補完エンジン: キーボード操作と補完ソースの設定
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
					{ name = "cmp_git" },
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
	-- LSP補完ソース: LSPサーバーからの補完候補を提供
	{
		"hrsh7th/cmp-nvim-lsp",
	},
	-- パス補完ソース: ファイルパスの補完候補を提供
	{
		"hrsh7th/cmp-path",
	},
	-- バッファ補完ソース: 現在のバッファ内のテキストから補完候補を提供
	{
		"hrsh7th/cmp-buffer",
	},
	-- コマンドライン補完ソース: コマンドモードでの補完候補を提供
	{
		"hrsh7th/cmp-cmdline",
	},
	-- スニペットエンジン: Lua製の高機能スニペットエンジン
	{
		"L3MON4D3/LuaSnip",
		version = "v2.*",
		build = "make install_jsregexp",
		config = function()
			require("luasnip").add_snippets("supercollider", require("scnvim/utils").get_snippets())
		end,
	},
	-- LuaSnip補完ソース: LuaSnipスニペットの補完候補を提供
	{
		"saadparwaiz1/cmp_luasnip",
	},
	-- タグ補完ソース: ctagsファイルからの補完候補を提供
	{
		"quangnguyen30192/cmp-nvim-tags",
	},
	-- Copilot補完連携: GitHub Copilotとnvim-cmpを連携
	{
		"zbirenbaum/copilot-cmp",
		config = function()
			require("copilot_cmp").setup()
		end,
	},
	-- GitHub Copilot: AIコード補完支援（サジェスト機能は無効化）
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
	-- LSP設定: 各言語のLSPサーバーとの通信設定
	{
		"neovim/nvim-lspconfig",
	},
	-- LSPサーバーマネージャー: LSPサーバー、DAP、リンター、フォーマッターのインストール管理
  {
    "mason-org/mason.nvim",
    opts = {}
  },
  {
    "mason-org/mason-lspconfig.nvim",
    opts = {},
    dependencies = {
        { "mason-org/mason.nvim", opts = {} },
        "neovim/nvim-lspconfig",
    },
  },
	-- LSPファイル操作: nvim-treeでのファイル操作をLSPサーバーに通知
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
	-- Prettierフォーマッター: コードフォーマット支援
	{
		"MunifTanjim/prettier.nvim",
		config = function()
			require("prettier").setup()
		end,
	},
}
