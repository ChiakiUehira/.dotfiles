(function() {
  var PackageUpdater;

  PackageUpdater = require('../lib/package-updater');

  require('./spec-helper');

  describe('PackageUpdater', function() {
    afterEach(function() {
      return restoreEnvironment();
    });
    describe('.parseLog', function() {
      var entries;
      entries = null;
      describe('when some updates are done', function() {
        beforeEach(function() {
          var log;
          log = ['Package Updates Available (2)', '└── atom-lint 0.8.0 -> 0.8.1', '└── sort-lines 0.1.0 -> 0.3.0', '', 'Installing atom-lint@0.8.1 to /Users/me/.atom/packages ✓', 'Installing sort-lines@0.3.0 to /Users/me/.atom/packages ✗'].join('\n');
          return entries = PackageUpdater.parseLog(log);
        });
        it('returns entries of package installation', function() {
          return expect(entries.length).toBe(2);
        });
        it('extracts package name', function() {
          expect(entries[0].name).toBe('atom-lint');
          return expect(entries[1].name).toBe('sort-lines');
        });
        it('extracts package version', function() {
          expect(entries[0].version).toBe('0.8.1');
          return expect(entries[1].version).toBe('0.3.0');
        });
        return it('recognizes success and failure', function() {
          expect(entries[0].isInstalled).toBe(true);
          return expect(entries[1].isInstalled).toBe(false);
        });
      });
      describe("when there's no update", function() {
        beforeEach(function() {
          var log;
          log = ['Package Updates Available (0)', '└── (empty)'].join('\n');
          return entries = PackageUpdater.parseLog(log);
        });
        return it('returns empty array', function() {
          return expect(entries.length).toBe(0);
        });
      });
      return describe("when nothing is in the log", function() {
        beforeEach(function() {
          return entries = PackageUpdater.parseLog('');
        });
        return it('returns empty array', function() {
          return expect(entries.length).toBe(0);
        });
      });
    });
    return describe('.generateSummary', function() {
      describe('when no package is updated', function() {
        return it('returns null', function() {
          var entries, summary;
          entries = [
            {
              name: 'atom-lint',
              isInstalled: false
            }
          ];
          summary = PackageUpdater.generateSummary(entries);
          return expect(summary).toBeNull();
        });
      });
      describe('when a packages is updated', function() {
        return it('mentions the packages name', function() {
          var entries, summary;
          entries = [
            {
              name: 'atom-lint',
              isInstalled: true
            }
          ];
          summary = PackageUpdater.generateSummary(entries);
          return expect(summary).toBe('atom-lint has been updated automatically.');
        });
      });
      describe('when 2 packages are updated', function() {
        return it('handles conjugation properly', function() {
          var entries, summary;
          entries = [
            {
              name: 'atom-lint',
              isInstalled: true
            }, {
              name: 'sort-lines',
              isInstalled: true
            }
          ];
          summary = PackageUpdater.generateSummary(entries);
          return expect(summary).toBe('atom-lint and sort-lines have been updated automatically.');
        });
      });
      describe('when more than 2 packages are updated', function() {
        return it('lists the packages names properly', function() {
          var entries, summary;
          entries = [
            {
              name: 'atom-lint',
              isInstalled: true
            }, {
              name: 'sort-lines',
              isInstalled: true
            }, {
              name: 'language-slim',
              isInstalled: true
            }, {
              name: 'language-haskell',
              isInstalled: true
            }
          ];
          summary = PackageUpdater.generateSummary(entries);
          return expect(summary).toBe('atom-lint, sort-lines, language-slim and language-haskell ' + 'have been updated automatically.');
        });
      });
      describe('when more than 5 packages are updated', function() {
        return it('omits the package names', function() {
          var entries, summary;
          entries = [
            {
              name: 'atom-lint',
              isInstalled: true
            }, {
              name: 'sort-lines',
              isInstalled: true
            }, {
              name: 'language-slim',
              isInstalled: true
            }, {
              name: 'language-haskell',
              isInstalled: true
            }, {
              name: 'language-ruby',
              isInstalled: true
            }, {
              name: 'language-python',
              isInstalled: true
            }
          ];
          summary = PackageUpdater.generateSummary(entries);
          return expect(summary).toBe('6 packages have been updated automatically.');
        });
      });
      return describe('when non-auto-update', function() {
        return it('does not say "automatically"', function() {
          var entries, summary;
          entries = [
            {
              name: 'atom-lint',
              isInstalled: true
            }
          ];
          summary = PackageUpdater.generateSummary(entries, false);
          return expect(summary).toBe('atom-lint has been updated.');
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXV0by11cGRhdGUtcGFja2FnZXMvc3BlYy9wYWNrYWdlLXVwZGF0ZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsY0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLHdCQUFSLENBQWpCLENBQUE7O0FBQUEsRUFDQSxPQUFBLENBQVEsZUFBUixDQURBLENBQUE7O0FBQUEsRUFHQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLElBQUEsU0FBQSxDQUFVLFNBQUEsR0FBQTthQUNSLGtCQUFBLENBQUEsRUFEUTtJQUFBLENBQVYsQ0FBQSxDQUFBO0FBQUEsSUFHQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7QUFDcEIsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsTUFFQSxRQUFBLENBQVMsNEJBQVQsRUFBdUMsU0FBQSxHQUFBO0FBQ3JDLFFBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULGNBQUEsR0FBQTtBQUFBLFVBQUEsR0FBQSxHQUFNLENBQ0osK0JBREksRUFFSiw4QkFGSSxFQUdKLCtCQUhJLEVBSUosRUFKSSxFQUtKLDBEQUxJLEVBTUosMkRBTkksQ0FPTCxDQUFDLElBUEksQ0FPQyxJQVBELENBQU4sQ0FBQTtpQkFVQSxPQUFBLEdBQVUsY0FBYyxDQUFDLFFBQWYsQ0FBd0IsR0FBeEIsRUFYRDtRQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsUUFhQSxFQUFBLENBQUcseUNBQUgsRUFBOEMsU0FBQSxHQUFBO2lCQUM1QyxNQUFBLENBQU8sT0FBTyxDQUFDLE1BQWYsQ0FBc0IsQ0FBQyxJQUF2QixDQUE0QixDQUE1QixFQUQ0QztRQUFBLENBQTlDLENBYkEsQ0FB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

//# sourceURL=/Users/haco/.atom/packages/auto-update-packages/spec/package-updater-spec.coffee
