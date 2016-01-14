(function() {
  var amu, init, tinycolor;

  tinycolor = require('tinycolor2');

  amu = require('./atom-material-ui');

  init = function() {
    if (!localStorage.getItem('atom-material-ui:configOk')) {
      atom.config.set('atom-material-ui');
      amu.writeConfig(function() {
        atom.notifications.addSuccess('There were breaking changes and Material UI had to reset its settings.');
        return localStorage.setItem('atom-material-ui:configOk', true);
      });
    }
    amu.toggleClass(atom.config.get('atom-material-ui.tabs.tintedTabBar'), 'tinted-tab-bar');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations');
    return amu.toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view');
  };

  module.exports = {
    apply: function() {
      var checkPacks, root;
      root = document.documentElement;
      checkPacks = function() {
        var iconPacks, loadedPackages;
        root.classList.remove('has-custom-icons');
        loadedPackages = atom.packages.getActivePackages();
        iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];
        return loadedPackages.forEach(function(pack, i) {
          if (iconPacks.indexOf(pack.name) >= 0) {
            return root.classList.add('has-custom-icons');
          }
        });
      };
      atom.packages.onDidActivatePackage(function() {
        return checkPacks();
      });
      atom.packages.onDidDeactivatePackage(function() {
        return checkPacks();
      });
      init();
      atom.config.onDidChange('atom-material-ui.colors.accentColor', function(value) {
        return amu.writeConfig();
      });
      atom.config.onDidChange('atom-material-ui.colors.abaseColor', function(value) {
        var accent;
        if (atom.config.get('atom-material-ui.colors.genAccent')) {
          accent = tinycolor(value.newValue.toHexString()).complement().saturate(20).lighten(5);
          atom.config.set('atom-material-ui.colors.accentColor', accent.toHexString());
        }
        return amu.writeConfig();
      });
      atom.themes.onDidChangeActiveThemes(function() {
        return amu.writeConfig();
      });
      atom.config.onDidChange('atom-material-ui.fonts.fontSize', function() {
        return amu.writeConfig();
      });
      atom.config.onDidChange('atom-material-ui.tabs.tintedTabBar', function(value) {
        return amu.toggleClass(value.newValue, 'tinted-tab-bar');
      });
      atom.config.onDidChange('atom-material-ui.ui.animations', function(value) {
        return amu.toggleClass(value.newValue, 'use-animations');
      });
      atom.config.onDidChange('atom-material-ui.ui.panelShadows', function(value) {
        return amu.toggleClass(value.newValue, 'panel-shadows');
      });
      atom.config.onDidChange('atom-material-ui.ui.panelContrast', function(value) {
        return amu.toggleClass(value.newValue, 'panel-contrast');
      });
      return atom.config.onDidChange('atom-material-ui.treeView.compactList', function(value) {
        return amu.toggleClass(value.newValue, 'compact-tree-view');
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvY29uZmlnLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvQkFBQTs7QUFBQSxFQUFBLFNBQUEsR0FBWSxPQUFBLENBQVEsWUFBUixDQUFaLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLG9CQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUdBLElBQUEsR0FBTyxTQUFBLEdBQUE7QUFDSCxJQUFBLElBQUcsQ0FBQSxZQUFhLENBQUMsT0FBYixDQUFxQiwyQkFBckIsQ0FBSjtBQUNJLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGtCQUFoQixDQUFBLENBQUE7QUFBQSxNQUNBLEdBQUcsQ0FBQyxXQUFKLENBQWdCLFNBQUEsR0FBQTtBQUNaLFFBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFuQixDQUE4Qix3RUFBOUIsQ0FBQSxDQUFBO2VBQ0EsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsMkJBQXJCLEVBQWtELElBQWxELEVBRlk7TUFBQSxDQUFoQixDQURBLENBREo7S0FBQTtBQUFBLElBTUEsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG9DQUFoQixDQUFoQixFQUF1RSxnQkFBdkUsQ0FOQSxDQUFBO0FBQUEsSUFPQSxHQUFHLENBQUMsV0FBSixDQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isa0NBQWhCLENBQWhCLEVBQXFFLGVBQXJFLENBUEEsQ0FBQTtBQUFBLElBUUEsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG1DQUFoQixDQUFoQixFQUFzRSxnQkFBdEUsQ0FSQSxDQUFBO0FBQUEsSUFTQSxHQUFHLENBQUMsV0FBSixDQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsZ0NBQWhCLENBQWhCLEVBQW1FLGdCQUFuRSxDQVRBLENBQUE7V0FVQSxHQUFHLENBQUMsV0FBSixDQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsdUNBQWhCLENBQWhCLEVBQTBFLG1CQUExRSxFQVhHO0VBQUEsQ0FIUCxDQUFBOztBQUFBLEVBaUJBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxJQUFBLEtBQUEsRUFBTyxTQUFBLEdBQUE7QUFDSCxVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sUUFBUSxDQUFDLGVBQWhCLENBQUE7QUFBQSxNQUdBLFVBQUEsR0FBYSxTQUFBLEdBQUE7QUFDVCxZQUFBLHlCQUFBO0FBQUEsUUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQWYsQ0FBc0Isa0JBQXRCLENBQUEsQ0FBQTtBQUFBLFFBRUEsY0FBQSxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFkLENBQUEsQ0FGbEIsQ0FBQTtBQUFBLFFBR0EsU0FBQSxHQUFZLENBQUMsWUFBRCxFQUFlLGlCQUFmLEVBQWtDLFlBQWxDLEVBQWdELHNCQUFoRCxDQUhaLENBQUE7ZUFLQSxjQUFjLENBQUMsT0FBZixDQUF1QixTQUFDLElBQUQsRUFBTyxDQUFQLEdBQUE7QUFDbkIsVUFBQSxJQUFJLFNBQVMsQ0FBQyxPQUFWLENBQWtCLElBQUksQ0FBQyxJQUF2QixDQUFBLElBQWdDLENBQXBDO21CQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBZixDQUFtQixrQkFBbkIsRUFESjtXQURtQjtRQUFBLENBQXZCLEVBTlM7TUFBQSxDQUhiLENBQUE7QUFBQSxNQWFBLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQWQsQ0FBbUMsU0FBQSxHQUFBO2VBQU0sVUFBQSxDQUFBLEVBQU47TUFBQSxDQUFuQyxDQWJBLENBQUE7QUFBQSxNQWNBLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQWQsQ0FBcUMsU0FBQSxHQUFBO2VBQU0sVUFBQSxDQUFBLEVBQU47TUFBQSxDQUFyQyxDQWRBLENBQUE7QUFBQSxNQWdCQSxJQUFBLENBQUEsQ0FoQkEsQ0FBQTtBQUFBLE1Bb0JBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3QixxQ0FBeEIsRUFBK0QsU0FBQyxLQUFELEdBQUE7ZUFDM0QsR0FBRyxDQUFDLFdBQUosQ0FBQSxFQUQyRDtNQUFBLENBQS9ELENBcEJBLENBQUE7QUFBQSxNQXVCQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0Isb0NBQXhCLEVBQThELFNBQUMsS0FBRCxHQUFBO0FBQzFELFlBQUEsTUFBQTtBQUFBLFFBQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsbUNBQWhCLENBQUg7QUFDSSxVQUFBLE1BQUEsR0FBUyxTQUFBLENBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFmLENBQUEsQ0FBVixDQUF1QyxDQUFDLFVBQXhDLENBQUEsQ0FBb0QsQ0FBQyxRQUFyRCxDQUE4RCxFQUE5RCxDQUFpRSxDQUFDLE9BQWxFLENBQTBFLENBQTFFLENBQVQsQ0FBQTtBQUFBLFVBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHFDQUFoQixFQUF1RCxNQUFNLENBQUMsV0FBUCxDQUFBLENBQXZELENBREEsQ0FESjtTQUFBO2VBR0EsR0FBRyxDQUFDLFdBQUosQ0FBQSxFQUowRDtNQUFBLENBQTlELENBdkJBLENBQUE7QUFBQSxNQTZCQSxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUFaLENBQW9DLFNBQUEsR0FBQTtlQUNoQyxHQUFHLENBQUMsV0FBSixDQUFBLEVBRGdDO01BQUEsQ0FBcEMsQ0E3QkEsQ0FBQTtBQUFBLE1Ba0NBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3QixpQ0FBeEIsRUFBMkQsU0FBQSxHQUFBO2VBQ3ZELEdBQUcsQ0FBQyxXQUFKLENBQUEsRUFEdUQ7TUFBQSxDQUEzRCxDQWxDQSxDQUFBO0FBQUEsTUF1Q0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFaLENBQXdCLG9DQUF4QixFQUE4RCxTQUFDLEtBQUQsR0FBQTtlQUMxRCxHQUFHLENBQUMsV0FBSixDQUFnQixLQUFLLENBQUMsUUFBdEIsRUFBZ0MsZ0JBQWhDLEVBRDBEO01BQUEsQ0FBOUQsQ0F2Q0EsQ0FBQTtBQUFBLE1BMENBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3QixnQ0FBeEIsRUFBMEQsU0FBQyxLQUFELEdBQUE7ZUFDdEQsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsS0FBSyxDQUFDLFFBQXRCLEVBQWdDLGdCQUFoQyxFQURzRDtNQUFBLENBQTFELENBMUNBLENBQUE7QUFBQSxNQTZDQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0Isa0NBQXhCLEVBQTRELFNBQUMsS0FBRCxHQUFBO2VBQ3hELEdBQUcsQ0FBQyxXQUFKLENBQWdCLEtBQUssQ0FBQyxRQUF0QixFQUFnQyxlQUFoQyxFQUR3RDtNQUFBLENBQTVELENBN0NBLENBQUE7QUFBQSxNQWdEQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsbUNBQXhCLEVBQTZELFNBQUMsS0FBRCxHQUFBO2VBQ3pELEdBQUcsQ0FBQyxXQUFKLENBQWdCLEtBQUssQ0FBQyxRQUF0QixFQUFnQyxnQkFBaEMsRUFEeUQ7TUFBQSxDQUE3RCxDQWhEQSxDQUFBO2FBbURBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3Qix1Q0FBeEIsRUFBaUUsU0FBQyxLQUFELEdBQUE7ZUFDN0QsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsS0FBSyxDQUFDLFFBQXRCLEVBQWdDLG1CQUFoQyxFQUQ2RDtNQUFBLENBQWpFLEVBcERHO0lBQUEsQ0FBUDtHQWxCSixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/haco/.atom/packages/atom-material-ui/lib/config.coffee
