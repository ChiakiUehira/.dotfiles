-- 言語固有プラグイン: SuperCollider、TidalCycles、Styled Components、Prismaの開発支援
return {
	-- SuperCollider統合: オーディオプログラミング言語のコード実行、シンタックスハイライト、スニペット
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
	-- TidalCycles支援: ライブコーディング用音楽プログラミング言語のシンタックスハイライト
	{ "tidalcycles/vim-tidal" },
	-- Styled Components支援: CSS-in-JSライブラリのシンタックスハイライト
	{ "styled-components/vim-styled-components" },
	-- Prisma支援: Prismaスキーマファイルのシンタックスハイライト
	{ "prisma/vim-prisma" },
}