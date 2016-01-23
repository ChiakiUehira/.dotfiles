(function() {
  module.exports = {
    activate: function() {
      var _TriggerKey, _command, _commands, _keymap, _linuxSelector, _macSelector, _triggerKey, _windowsSelector;
      _command = 'color-picker:open';
      _triggerKey = (atom.config.get('color-picker.triggerKey')).toLowerCase();
      _TriggerKey = _triggerKey.toUpperCase();
      _macSelector = '.platform-darwin atom-workspace';
      _windowsSelector = '.platform-win32 atom-workspace';
      _linuxSelector = '.platform-linux atom-workspace';
      _keymap = {};
      _keymap["" + _macSelector] = {};
      _keymap["" + _macSelector]["cmd-" + _TriggerKey] = _command;
      _keymap["" + _windowsSelector] = {};
      _keymap["" + _windowsSelector]["ctrl-alt-" + _triggerKey] = _command;
      _keymap["" + _linuxSelector] = {};
      _keymap["" + _linuxSelector]["ctrl-alt-" + _triggerKey] = _command;
      atom.keymaps.add('color-picker:trigger', _keymap);
      atom.contextMenu.add({
        'atom-text-editor': [
          {
            label: 'Color Picker',
            command: _command
          }
        ]
      });
      _commands = {};
      _commands["" + _command] = (function(_this) {
        return function() {
          var _ref;
          return (_ref = _this.view) != null ? _ref.open() : void 0;
        };
      })(this);
      atom.commands.add('atom-text-editor', _commands);
      return this.view.activate();
    },
    deactivate: function() {
      var _ref;
      return (_ref = this.view) != null ? _ref.destroy() : void 0;
    },
    provideColorPicker: function() {
      return {
        open: (function(_this) {
          return function(Editor, Cursor) {
            if (!_this.view) {
              return;
            }
            return _this.view.open(Editor, Cursor);
          };
        })(this)
      };
    },
    config: {
      randomColor: {
        title: 'Serve a random color on open',
        description: 'If the Color Picker doesn\'t get an input color, it serves a completely random color.',
        type: 'boolean',
        "default": true
      },
      automaticReplace: {
        title: 'Automatically Replace Color',
        description: 'Replace selected color automatically on change. Works well with as-you-type CSS reloaders.',
        type: 'boolean',
        "default": false
      },
      abbreviateValues: {
        title: 'Abbreviate Color Values',
        description: 'If possible, abbreviate color values, like for example “0.3” to “.3”,  “#ffffff” to “#fff” and “rgb(0, 0, 0)” to “rgb(0,0,0)”.',
        type: 'boolean',
        "default": false
      },
      uppercaseColorValues: {
        title: 'Uppercase Color Values',
        description: 'If sensible, uppercase the color value. For example, “#aaa” becomes “#AAA”.',
        type: 'boolean',
        "default": false
      },
      preferredFormat: {
        title: 'Preferred Color Format',
        description: 'On open, the Color Picker will show a color in this format.',
        type: 'string',
        "enum": ['RGB', 'HEX', 'HSL', 'HSV', 'VEC'],
        "default": 'RGB'
      },
      triggerKey: {
        title: 'Trigger key',
        description: 'Decide what trigger key should open the Color Picker. `CMD-SHIFT-{TRIGGER_KEY}` and `CTRL-ALT-{TRIGGER_KEY}`. Requires a restart.',
        type: 'string',
        "enum": ['C', 'E', 'H', 'K'],
        "default": 'C'
      }
    },
    view: (require('./ColorPicker-view'))()
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvY29sb3ItcGlja2VyL2xpYi9Db2xvclBpY2tlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFJSTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDSTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNOLFVBQUEsc0dBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxtQkFBWCxDQUFBO0FBQUEsTUFJQSxXQUFBLEdBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IseUJBQWhCLENBQUQsQ0FBMkMsQ0FBQyxXQUE1QyxDQUFBLENBSmQsQ0FBQTtBQUFBLE1BS0EsV0FBQSxHQUFjLFdBQVcsQ0FBQyxXQUFaLENBQUEsQ0FMZCxDQUFBO0FBQUEsTUFRQSxZQUFBLEdBQWUsaUNBUmYsQ0FBQTtBQUFBLE1BU0EsZ0JBQUEsR0FBbUIsZ0NBVG5CLENBQUE7QUFBQSxNQVVBLGNBQUEsR0FBaUIsZ0NBVmpCLENBQUE7QUFBQSxNQVlBLE9BQUEsR0FBVSxFQVpWLENBQUE7QUFBQSxNQWVBLE9BQVEsQ0FBQSxFQUFBLEdBQW5CLFlBQW1CLENBQVIsR0FBK0IsRUFmL0IsQ0FBQTtBQUFBLE1BZ0JBLE9BQVEsQ0FBQSxFQUFBLEdBQW5CLFlBQW1CLENBQXFCLENBQUMsTUFBQSxHQUF6QyxXQUF3QyxDQUE3QixHQUF1RCxRQWhCdkQsQ0FBQTtBQUFBLE1Ba0JBLE9BQVEsQ0FBQSxFQUFBLEdBQW5CLGdCQUFtQixDQUFSLEdBQW1DLEVBbEJuQyxDQUFBO0FBQUEsTUFtQkEsT0FBUSxDQUFBLEVBQUEsR0FBbkIsZ0JBQW1CLENBQXlCLENBQUMsV0FBQSxHQUE3QyxXQUE0QyxDQUFqQyxHQUFnRSxRQW5CaEUsQ0FBQTtBQUFBLE1BcUJBLE9BQVEsQ0FBQSxFQUFBLEdBQW5CLGNBQW1C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

//# sourceURL=/Users/haco/.atom/packages/color-picker/lib/ColorPicker.coffee
