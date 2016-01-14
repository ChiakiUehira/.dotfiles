(function() {
  var fs;

  fs = require('fs');

  module.exports = {
    getContrast: function(color) {
      var b, g, r, yiq;
      r = parseInt(color.substr(1, 2), 16);
      g = parseInt(color.substr(3, 2), 16);
      b = parseInt(color.substr(5, 2), 16);
      yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      if (yiq >= 220) {
        return "desaturate(darken(" + color + ", 40%), 25%)";
      }
      if (yiq >= 190 && yiq < 220) {
        return "desaturate(darken(" + color + ", 35%), 20%)";
      }
      if (yiq >= 130 && yiq < 190) {
        return "desaturate(darken(" + color + ", 25%), 20%)";
      }
      if (yiq < 130) {
        return "lighten(" + color + ", 60%)";
      }
    },
    config: {
      colors: {
        order: 1,
        type: 'object',
        properties: {
          abaseColor: {
            title: 'Primary color',
            description: 'Changes the main theme color.',
            type: 'color',
            "default": '#009688'
          },
          accentColor: {
            title: 'Accent color',
            description: 'Accent color used to underline active tabs.',
            type: 'color',
            "default": '#FFFFFF'
          },
          genAccent: {
            title: 'Generate complementary accent',
            description: 'Material UI will try to generate a complementary color to your selected base color and set it as an accent. If it fails, just pick a different accent color to reload the theme. <small>Experimental</small>',
            type: 'boolean',
            "default": false
          }
        }
      },
      ui: {
        order: 2,
        type: 'object',
        properties: {
          panelShadows: {
            title: 'Panels cast shadows',
            description: 'Adds depth to the user interface by using shadows.',
            type: 'boolean',
            "default": false
          },
          animations: {
            title: 'Use animations',
            description: 'Enables animations for clicked tabs and other UI elements.',
            type: 'boolean',
            "default": true
          },
          panelContrast: {
            title: 'Contrasting panels',
            description: 'Adds a little contrast between panels to differentiate where one starts and the other ends.',
            type: 'boolean',
            "default": false
          }
        }
      },
      tabs: {
        order: 3,
        type: 'object',
        properties: {
          tintedTabBar: {
            title: 'Tinted tab bar',
            description: 'Paints the tab bar with the chosen primary color.',
            type: 'boolean',
            "default": false
          }
        }
      },
      treeView: {
        order: 4,
        type: 'object',
        properties: {
          compactList: {
            title: 'Compact tree view',
            description: 'Reduces line height in the tree view component.',
            type: 'boolean',
            "default": false
          }
        }
      },
      fonts: {
        order: 5,
        type: 'object',
        properties: {
          fontSize: {
            title: 'User interface font size',
            description: 'Scales the entire UI based on this value.',
            "default": 16,
            minimum: 10,
            type: 'number'
          }
        }
      }
    },
    toggleClass: function(boolean, className) {
      var root;
      root = document.documentElement;
      if (boolean) {
        return root.classList.add(className);
      } else {
        return root.classList.remove(className);
      }
    },
    writeConfig: function(cb) {
      var accentColor, accentTextColor, baseColor, config, fontSize;
      accentColor = atom.config.get('atom-material-ui.colors.accentColor').toHexString();
      baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toHexString();
      accentTextColor = this.getContrast(baseColor);
      fontSize = atom.config.get('atom-material-ui.fonts.fontSize');
      config = "@accent-color: " + accentColor + ";\n@accent-text-color: " + accentTextColor + ";\n@base-color: " + baseColor + ";\n:root {\n    font-size: " + fontSize + "px;\n}";
      return fs.writeFile("" + __dirname + "/../styles/custom.less", config, 'utf8', function() {
        var themePack;
        themePack = atom.packages.getLoadedPackage('atom-material-ui');
        themePack.deactivate();
        themePack.activate();
        if (cb && typeof cb === 'function') {
          return cb();
        }
      });
    },
    activate: function() {
      return atom.themes.onDidChangeActiveThemes(function() {
        var Bindings, Config;
        Config = require('./config');
        Bindings = require('./bindings');
        Config.apply();
        return setTimeout(function() {
          return Bindings.apply();
        }, 0);
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvYXRvbS1tYXRlcmlhbC11aS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsRUFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUFMLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsSUFBQSxXQUFBLEVBQWEsU0FBQyxLQUFELEdBQUE7QUFFVCxVQUFBLFlBQUE7QUFBQSxNQUFBLENBQUEsR0FBSSxRQUFBLENBQVMsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQVQsRUFBNkIsRUFBN0IsQ0FBSixDQUFBO0FBQUEsTUFDQSxDQUFBLEdBQUksUUFBQSxDQUFTLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFULEVBQTZCLEVBQTdCLENBREosQ0FBQTtBQUFBLE1BRUEsQ0FBQSxHQUFJLFFBQUEsQ0FBUyxLQUFLLENBQUMsTUFBTixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBVCxFQUE2QixFQUE3QixDQUZKLENBQUE7QUFBQSxNQUdBLEdBQUEsR0FBTSxDQUFDLENBQUMsQ0FBQSxHQUFJLEdBQUwsQ0FBQSxHQUFZLENBQUMsQ0FBQSxHQUFJLEdBQUwsQ0FBWixHQUF3QixDQUFDLENBQUEsR0FBSSxHQUFMLENBQXpCLENBQUEsR0FBc0MsSUFINUMsQ0FBQTtBQUtBLE1BQUEsSUFBbUQsR0FBQSxJQUFPLEdBQTFEO0FBQUEsZUFBUSxvQkFBQSxHQUFvQixLQUFwQixHQUEwQixjQUFsQyxDQUFBO09BTEE7QUFNQSxNQUFBLElBQW1ELEdBQUEsSUFBTyxHQUFQLElBQWMsR0FBQSxHQUFNLEdBQXZFO0FBQUEsZUFBUSxvQkFBQSxHQUFvQixL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

//# sourceURL=/Users/haco/.atom/packages/atom-material-ui/lib/atom-material-ui.coffee
