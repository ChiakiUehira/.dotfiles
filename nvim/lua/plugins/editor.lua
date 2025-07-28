-- エディタープラグイン: 文字囲み、マルチカーソル、自動括弧、コメント、Git、ジャンプ、Emmet、Claude Code
return {
  -- 文字囲み操作: カッコ、クォート、タグなどでテキストを囲む・変更・削除
  {
    "kylechui/nvim-surround",
    version = "*",
    event = "VeryLazy",
    config = function()
      require("nvim-surround").setup()
    end,
  },
  -- マルチカーソル: 複数のカーソルで同時編集（Sublime Text風）
  {
    "mg979/vim-visual-multi",
  },
  -- 自動括弧补完: 括弧、クォートなどの自動閉じと削除
  {
    "windwp/nvim-autopairs",
    event = "InsertEnter",
    config = function()
      require("nvim-autopairs").setup()
    end,
  },
  -- HTMLタグ自動補完: HTML/XMLタグの自動閉じとリネーム
  {
    "windwp/nvim-ts-autotag",
    config = function()
      require("nvim-ts-autotag").setup()
    end,
  },
  -- Treesitterテキストオブジェクト: 関数、クラス、ブロックなどの選択と操作
  {
    "nvim-treesitter/nvim-treesitter-textobjects",
  },
  -- シンタックスハイライト: 高性能なシンタックスハイライトとコード解析
  {
    "nvim-treesitter/nvim-treesitter",
    branch = 'main',
    build = ':TSUpdate'
  },
  -- コメント操作: コメントのトグルと言語別コメント形式対応
  {
    "numToStr/Comment.nvim",
    config = function()
      require("Comment").setup()
    end,
  },
  -- ジャンプ留移動: 文字ラベルでカーソルを高速移動（EasyMotion風）
  {
    "phaazon/hop.nvim",
    config = true,
  },
  -- Git統合: 変更箷所の表示、ステージング、blame情報の表示
  {
    "lewis6991/gitsigns.nvim",
    config = function()
      require("gitsigns").setup({
        current_line_blame = true,
      })
    end,
  },
  -- Lazygit統合: NeovimからLazygitを呼び出す
  {
    "kdheepak/lazygit.nvim",
    dependencies = {
      "nvim-lua/plenary.nvim",
    },
    config = function()
      vim.g.lazygit_floating_window_winblend = 0
      vim.g.lazygit_floating_window_scaling_factor = 0.9
      vim.g.lazygit_floating_window_corner_chars = { "╭", "╮", "╰", "╯" }
      vim.g.lazygit_floating_window_use_plenary = 0
      vim.g.lazygit_use_neovim_remote = 1
    end,
  },
  -- Emmet: HTML/CSSの略記記法で高速コーディング
  {
    "mattn/emmet-vim",
    lazy = true,
  },
  -- Claude Code連携: Claude CodeとNeovimの連携機能
  {
    "greggh/claude-code.nvim",
    dependencies = {
      "nvim-lua/plenary.nvim",
    },
    config = function()
      require("claude-code").setup({
        window = {
          position = "botright"
        }
      })
    end,
  }
}
