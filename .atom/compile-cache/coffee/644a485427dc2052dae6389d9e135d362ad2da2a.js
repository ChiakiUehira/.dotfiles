(function() {
  module.exports = {
    config: {
      ui: {
        order: 1,
        type: 'object',
        properties: {
          accentColor: {
            order: 1,
            title: 'Accent color',
            description: 'Sets the accent color for the UI theme.',
            type: 'string',
            "default": 'Teal',
            "enum": ['Blue', 'Cyan', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow']
          },
          slimScrollbar: {
            title: 'Slim scrollbars',
            type: 'boolean',
            "default": false
          },
          disableAnimations: {
            title: 'Disable animations',
            description: 'Reduces visual distractions when switching tabs or giving focus to text fields.',
            type: 'boolean',
            "default": false
          }
        }
      },
      tabs: {
        order: 2,
        type: 'object',
        properties: {
          tabSize: {
            title: 'Tab bar size',
            description: 'Sets the height for the tab bar',
            type: 'string',
            "default": 'Normal',
            "enum": ['Small', 'Normal', 'Big']
          },
          tabMinWidth: {
            title: 'Tab minimum width',
            type: 'boolean',
            "default": false
          },
          showTabIcons: {
            title: 'Icons in tabs',
            description: 'Shows the file-type icon for focused tabs.',
            type: 'string',
            "default": 'Hide',
            "enum": ['Hide', 'Show on active tab', 'Show on all tabs']
          },
          rippleAccentColor: {
            title: 'Use accent color in tabs\' ripple effect',
            type: 'boolean',
            "default": false
          }
        }
      },
      fonts: {
        order: 3,
        type: 'object',
        properties: {
          useRoboto: {
            title: 'Use Roboto Mono font in text editors',
            type: 'boolean',
            "default": false
          },
          fontSize: {
            title: 'UI font size',
            description: 'Set the font size used through the user interface. It doesn\'t override the text editor font size setting.',
            type: 'string',
            "default": 'Regular',
            "enum": ['Small', 'Regular', 'Big', 'Huge']
          },
          useRobotoInUI: {
            title: 'Use Roboto font for UI',
            type: 'boolean',
            "default": false
          }
        }
      },
      treeView: {
        order: 4,
        type: 'object',
        properties: {
          compactTreeView: {
            title: 'Compact Tree View',
            description: 'Reduces line-height in the tree view component.',
            type: 'boolean',
            "default": false
          }
        }
      },
      panels: {
        order: 5,
        type: 'object',
        properties: {
          panelContrast: {
            title: 'Contrasting panels',
            description: 'Makes panels\' background darker. Applies to tabs, search & replace, tree-view, etc.',
            type: 'boolean',
            "default": false
          },
          depth: {
            title: 'Add depth',
            description: 'Adds a few shadows here and there to add depth to the UI.',
            type: 'boolean',
            "default": false
          },
          altCmdPalette: {
            title: 'Alternative command palette background',
            description: 'Use a syntax\' background color for the command palette and fuzzy finder.',
            type: 'boolean',
            "default": true
          }
        }
      }
    },
    activate: function(state) {
      return atom.themes.onDidChangeActiveThemes(function() {
        var Bindings, Config;
        Config = require('./config');
        Bindings = require('./bindings');
        Config.apply();
        return Bindings.apply();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvc2V0dGluZ3MuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxJQUFBLE1BQUEsRUFDSTtBQUFBLE1BQUEsRUFBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8sQ0FBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFVBQUEsRUFDSTtBQUFBLFVBQUEsV0FBQSxFQUNJO0FBQUEsWUFBQSxLQUFBLEVBQU8sQ0FBUDtBQUFBLFlBQ0EsS0FBQSxFQUFPLGNBRFA7QUFBQSxZQUVBLFdBQUEsRUFBYSx5Q0FGYjtBQUFBLFlBR0EsSUFBQSxFQUFNLFFBSE47QUFBQSxZQUlBLFNBQUEsRUFBUyxNQUpUO0FBQUEsWUFLQSxNQUFBLEVBQU0sQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixPQUFqQixFQUEwQixRQUExQixFQUFvQyxNQUFwQyxFQUE0QyxRQUE1QyxFQUFzRCxLQUF0RCxFQUE2RCxNQUE3RCxFQUFxRSxPQUFyRSxFQUE4RSxRQUE5RSxDQUxOO1dBREo7QUFBQSxVQU9BLGFBQUEsRUFDSTtBQUFBLFlBQUEsS0FBQSxFQUFPLGlCQUFQO0FBQUEsWUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLFlBRUEsU0FBQSxFQUFTLEtBRlQ7V0FSSjtBQUFBLFVBV0EsaUJBQUEsRUFDSTtBQUFBLFlBQUEsS0FBQSxFQUFPLG9CQUFQO0FBQUEsWUFDQSxXQUFBLEVBQWEsaUZBRGI7QUFBQSxZQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsWUFHQSxTQUFBLEVBQVMsS0FIVDtXQVpKO1NBSEo7T0FESjtBQUFBLE1Bb0JBLElBQUEsRUFDSTtBQUFBLFFBQUEsS0FBQSxFQUFPLENBQVA7QUFBQSxR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

//# sourceURL=/Users/haco/.atom/packages/atom-material-ui/lib/settings.coffee
