(function() {
  var ATOM_BUNDLE_IDENTIFIER, BufferedProcess, INSTALLATION_LINE_PATTERN, glob, path;

  path = require('path');

  glob = require('glob');

  BufferedProcess = require('atom').BufferedProcess;

  ATOM_BUNDLE_IDENTIFIER = 'com.github.atom';

  INSTALLATION_LINE_PATTERN = /^Installing +([^@]+)@(\S+).+\s+(\S+)$/;

  module.exports = {
    updatePackages: function(isAutoUpdate) {
      if (isAutoUpdate == null) {
        isAutoUpdate = true;
      }
      return this.runApmUpgrade((function(_this) {
        return function(log) {
          var entries, summary;
          entries = _this.parseLog(log);
          summary = _this.generateSummary(entries, isAutoUpdate);
          if (!summary) {
            return;
          }
          return _this.notify({
            title: 'Atom Package Updates',
            message: summary,
            sender: ATOM_BUNDLE_IDENTIFIER,
            activate: ATOM_BUNDLE_IDENTIFIER
          });
        };
      })(this));
    },
    runApmUpgrade: function(callback) {
      var args, command, exit, log, stdout;
      command = atom.packages.getApmPath();
      args = ['upgrade', '--no-confirm', '--no-color'];
      log = '';
      stdout = function(data) {
        return log += data;
      };
      exit = function(exitCode) {
        return callback(log);
      };
      return new BufferedProcess({
        command: command,
        args: args,
        stdout: stdout,
        exit: exit
      });
    },
    parseLog: function(log) {
      var line, lines, matches, name, result, version, _i, _len, _match, _results;
      lines = log.split('\n');
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        matches = line.match(INSTALLATION_LINE_PATTERN);
        if (matches == null) {
          continue;
        }
        _match = matches[0], name = matches[1], version = matches[2], result = matches[3];
        _results.push({
          'name': name,
          'version': version,
          'isInstalled': result === '\u2713'
        });
      }
      return _results;
    },
    generateSummary: function(entries, isAutoUpdate) {
      var names, successfulEntries, summary;
      if (isAutoUpdate == null) {
        isAutoUpdate = true;
      }
      successfulEntries = entries.filter(function(entry) {
        return entry.isInstalled;
      });
      if (!(successfulEntries.length > 0)) {
        return null;
      }
      names = successfulEntries.map(function(entry) {
        return entry.name;
      });
      summary = successfulEntries.length <= 5 ? this.generateEnumerationExpression(names) : "" + successfulEntries.length + " packages";
      summary += successfulEntries.length === 1 ? ' has' : ' have';
      summary += ' been updated';
      if (isAutoUpdate) {
        summary += ' automatically';
      }
      summary += '.';
      return summary;
    },
    generateEnumerationExpression: function(items) {
      var expression, index, item, _i, _len;
      expression = '';
      for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
        item = items[index];
        if (index > 0) {
          if (index + 1 < items.length) {
            expression += ', ';
          } else {
            expression += ' and ';
          }
        }
        expression += item;
      }
      return expression;
    },
    notify: function(notification) {
      var args, command, key, value;
      command = this.getTerminalNotifierPath();
      if (!command) {
        return console.log("terminal-notifier is not found.");
      }
      args = [];
      for (key in notification) {
        value = notification[key];
        args.push("-" + key, value);
      }
      return new BufferedProcess({
        command: command,
        args: args
      });
    },
    getTerminalNotifierPath: function() {
      var paths, pattern;
      if (this.cachedTerminalNotifierPath !== void 0) {
        return this.cachedTerminalNotifierPath;
      }
      pattern = path.join(__dirname, '..', 'vendor', '**', 'terminal-notifier');
      paths = glob.sync(pattern);
      return this.cachedTerminalNotifierPath = paths.length === 0 ? null : paths[0];
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXV0by11cGRhdGUtcGFja2FnZXMvbGliL3BhY2thZ2UtdXBkYXRlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOEVBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQUZELENBQUE7O0FBQUEsRUFJQSxzQkFBQSxHQUF5QixpQkFKekIsQ0FBQTs7QUFBQSxFQUtBLHlCQUFBLEdBQTRCLHVDQUw1QixDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUFnQixTQUFDLFlBQUQsR0FBQTs7UUFBQyxlQUFlO09BQzlCO2FBQUEsSUFBQyxDQUFBLGFBQUQsQ0FBZSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxHQUFELEdBQUE7QUFDYixjQUFBLGdCQUFBO0FBQUEsVUFBQSxPQUFBLEdBQVUsS0FBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLENBQVYsQ0FBQTtBQUFBLFVBQ0EsT0FBQSxHQUFVLEtBQUMsQ0FBQSxlQUFELENBQWlCLE9BQWpCLEVBQTBCLFlBQTFCLENBRFYsQ0FBQTtBQUVBLFVBQUEsSUFBQSxDQUFBLE9BQUE7QUFBQSxrQkFBQSxDQUFBO1dBRkE7aUJBR0EsS0FBQyxDQUFBLE1BQUQsQ0FDRTtBQUFBLFlBQUEsS0FBQSxFQUFPLHNCQUFQO0FBQUEsWUFDQSxPQUFBLEVBQVMsT0FEVDtBQUFBLFlBRUEsTUFBQSxFQUFRLHNCQUZSO0FBQUEsWUFHQSxRQUFBLEVBQVUsc0JBSFY7V0FERixFQUphO1FBQUEsRUFBQTtN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

//# sourceURL=/Users/haco/.atom/packages/auto-update-packages/lib/package-updater.coffee
