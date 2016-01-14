(function() {
  var AutoUpdatePackages, PackageUpdater, fs;

  fs = require('fs');

  AutoUpdatePackages = require('../lib/auto-update-packages');

  PackageUpdater = require('../lib/package-updater');

  require('./spec-helper');

  describe('auto-upgrade-packages', function() {
    afterEach(function() {
      return restoreEnvironment();
    });
    describe('.loadLastUpdateTime', function() {
      describe('when no update has done ever', function() {
        beforeEach(function() {
          var path;
          path = AutoUpdatePackages.getLastUpdateTimeFilePath();
          if (fs.existsSync(path)) {
            return fs.unlinkSync(path);
          }
        });
        return it('returns null', function() {
          return expect(AutoUpdatePackages.loadLastUpdateTime()).toBeNull();
        });
      });
      return describe('when any update has done ever', function() {
        beforeEach(function() {
          return AutoUpdatePackages.saveLastUpdateTime();
        });
        return it('returns the time', function() {
          var loadedTime, now;
          loadedTime = AutoUpdatePackages.loadLastUpdateTime();
          now = Date.now();
          expect(loadedTime).toBeLessThan(now + 1);
          return expect(loadedTime).toBeGreaterThan(now - 1000);
        });
      });
    });
    describe('.updatePackagesIfAutoUpdateBlockIsExpired', function() {
      describe('when no update has done ever', function() {
        beforeEach(function() {
          var path;
          path = AutoUpdatePackages.getLastUpdateTimeFilePath();
          if (fs.existsSync(path)) {
            return fs.unlinkSync(path);
          }
        });
        return it('runs update', function() {
          spyOn(AutoUpdatePackages, 'updatePackages');
          AutoUpdatePackages.updatePackagesIfAutoUpdateBlockIsExpired();
          return expect(AutoUpdatePackages.updatePackages).toHaveBeenCalled();
        });
      });
      return describe('when a update has done just now', function() {
        beforeEach(function() {
          spyOn(PackageUpdater, 'updatePackages');
          return AutoUpdatePackages.updatePackagesIfAutoUpdateBlockIsExpired();
        });
        return it('does not run update', function() {
          spyOn(AutoUpdatePackages, 'updatePackages');
          AutoUpdatePackages.updatePackagesIfAutoUpdateBlockIsExpired();
          return expect(AutoUpdatePackages.updatePackages).not.toHaveBeenCalled();
        });
      });
    });
    describe('.getAutoUpdateBlockDuration', function() {
      describe('when "auto-update-packages.intervalMinutes" is 360', function() {
        beforeEach(function() {
          return atom.config.set('auto-update-packages.intervalMinutes', 360);
        });
        return it('returns 21600000 (6 hours)', function() {
          return expect(AutoUpdatePackages.getAutoUpdateBlockDuration()).toBe(21600000);
        });
      });
      describe('when "auto-update-packages.intervalMinutes" is 30', function() {
        beforeEach(function() {
          return atom.config.set('auto-update-packages.intervalMinutes', 30);
        });
        return it('returns 1800000', function() {
          return expect(AutoUpdatePackages.getAutoUpdateBlockDuration()).toBe(1800000);
        });
      });
      return describe('when "auto-update-packages.intervalMinutes" is 14', function() {
        beforeEach(function() {
          return atom.config.set('auto-update-packages.intervalMinutes', 14);
        });
        return it('returns 900000 (15 minutes) to avoid too frequent access to the server', function() {
          return expect(AutoUpdatePackages.getAutoUpdateBlockDuration()).toBe(900000);
        });
      });
    });
    return describe('.getAutoUpdateCheckInterval', function() {
      describe('when "auto-update-packages.intervalMinutes" is 360', function() {
        beforeEach(function() {
          return atom.config.set('auto-update-packages.intervalMinutes', 360);
        });
        return it('returns 1440000 (24 minutes)', function() {
          return expect(AutoUpdatePackages.getAutoUpdateCheckInterval()).toBe(1440000);
        });
      });
      return describe('when "auto-update-packages.intervalMinutes" is 30', function() {
        beforeEach(function() {
          return atom.config.set('auto-update-packages.intervalMinutes', 30);
        });
        return it('returns 120000 (2 minutes)', function() {
          return expect(AutoUpdatePackages.getAutoUpdateCheckInterval()).toBe(120000);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXV0by11cGRhdGUtcGFja2FnZXMvc3BlYy9hdXRvLXVwZGF0ZS1wYWNrYWdlcy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzQ0FBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsNkJBQVIsQ0FEckIsQ0FBQTs7QUFBQSxFQUVBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLHdCQUFSLENBRmpCLENBQUE7O0FBQUEsRUFHQSxPQUFBLENBQVEsZUFBUixDQUhBLENBQUE7O0FBQUEsRUFLQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO0FBQ2hDLElBQUEsU0FBQSxDQUFVLFNBQUEsR0FBQTthQUNSLGtCQUFBLENBQUEsRUFEUTtJQUFBLENBQVYsQ0FBQSxDQUFBO0FBQUEsSUFHQSxRQUFBLENBQVMscUJBQVQsRUFBZ0MsU0FBQSxHQUFBO0FBQzlCLE1BQUEsUUFBQSxDQUFTLDhCQUFULEVBQXlDLFNBQUEsR0FBQTtBQUN2QyxRQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxjQUFBLElBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxrQkFBa0IsQ0FBQyx5QkFBbkIsQ0FBQSxDQUFQLENBQUE7QUFDQSxVQUFBLElBQXVCLEVBQUUsQ0FBQyxVQUFILENBQWMsSUFBZCxDQUF2QjttQkFBQSxFQUFFLENBQUMsVUFBSCxDQUFjLElBQWQsRUFBQTtXQUZTO1FBQUEsQ0FBWCxDQUFBLENBQUE7ZUFJQSxFQUFBLENBQUcsY0FBSCxFQUFtQixTQUFBLEdBQUE7aUJBQ2pCLE1BQUEsQ0FBTyxrQkFBa0IsQ0FBQyxrQkFBbkIsQ0FBQSxDQUFQLENBQStDLENBQUMsUUFB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

//# sourceURL=/Users/haco/.atom/packages/auto-update-packages/spec/auto-update-packages-spec.coffee
