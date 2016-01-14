(function() {
  module.exports = {
    apply: function() {
      var checkPacks, root, setAccentColor, setAltCmdPalette, setAnimationStatus, setCompactTreeView, setDepth, setFontSize, setPanelContrast, setRippleAccentColor, setRobotoFont, setRobotoUIFont, setShowTabIcons, setSlimScrollbars, setTabMinWidth, setTabSize;
      root = document.documentElement;
      checkPacks = function() {
        var iconPacks, loadedPackages;
        root.classList.remove('dont-change-icons');
        loadedPackages = atom.packages.getActivePackages();
        iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];
        return loadedPackages.forEach(function(pack, i) {
          if (iconPacks.indexOf(pack.name) >= 0) {
            return root.classList.add('dont-change-icons');
          }
        });
      };
      atom.packages.onDidActivatePackage(function() {
        return checkPacks();
      });
      atom.packages.onDidDeactivatePackage(function() {
        return checkPacks();
      });
      setAccentColor = function(currentAccentColor) {
        root.classList.remove('blue');
        root.classList.remove('cyan');
        root.classList.remove('green');
        root.classList.remove('orange');
        root.classList.remove('pink');
        root.classList.remove('purple');
        root.classList.remove('red');
        root.classList.remove('teal');
        root.classList.remove('white');
        root.classList.remove('yellow');
        return root.classList.add(currentAccentColor.toLowerCase());
      };
      atom.config.onDidChange('atom-material-ui.ui.accentColor', function() {
        return setAccentColor(atom.config.get('atom-material-ui.ui.accentColor'));
      });
      setAccentColor(atom.config.get('atom-material-ui.ui.accentColor'));
      setRobotoFont = function(boolean) {
        if (boolean) {
          return root.classList.add('roboto-mono');
        } else {
          return root.classList.remove('roboto-mono');
        }
      };
      atom.config.onDidChange('atom-material-ui.fonts.useRoboto', function() {
        return setRobotoFont(atom.config.get('atom-material-ui.fonts.useRoboto'));
      });
      setRobotoFont(atom.config.get('atom-material-ui.fonts.useRoboto'));
      setRobotoUIFont = function(boolean) {
        if (boolean) {
          return root.classList.add('roboto');
        } else {
          return root.classList.remove('roboto');
        }
      };
      atom.config.onDidChange('atom-material-ui.fonts.useRobotoInUI', function() {
        return setRobotoUIFont(atom.config.get('atom-material-ui.fonts.useRobotoInUI'));
      });
      setRobotoUIFont(atom.config.get('atom-material-ui.fonts.useRobotoInUI'));
      setSlimScrollbars = function(boolean) {
        if (boolean) {
          return root.classList.add('slim-scrollbar');
        } else {
          return root.classList.remove('slim-scrollbar');
        }
      };
      atom.config.onDidChange('atom-material-ui.ui.slimScrollbar', function() {
        return setSlimScrollbars(atom.config.get('atom-material-ui.ui.slimScrollbar'));
      });
      setSlimScrollbars(atom.config.get('atom-material-ui.ui.slimScrollbar'));
      setAnimationStatus = function(boolean) {
        if (boolean) {
          return root.classList.add('no-animations');
        } else {
          return root.classList.remove('no-animations');
        }
      };
      atom.config.onDidChange('atom-material-ui.ui.disableAnimations', function() {
        return setAnimationStatus(atom.config.get('atom-material-ui.ui.disableAnimations'));
      });
      setAnimationStatus(atom.config.get('atom-material-ui.ui.disableAnimations'));
      setPanelContrast = function(boolean) {
        if (boolean) {
          return root.classList.add('panel-contrast');
        } else {
          return root.classList.remove('panel-contrast');
        }
      };
      atom.config.onDidChange('atom-material-ui.panels.panelContrast', function() {
        return setPanelContrast(atom.config.get('atom-material-ui.panels.panelContrast'));
      });
      setPanelContrast(atom.config.get('atom-material-ui.panels.panelContrast'));
      setDepth = function(boolean) {
        if (boolean) {
          return root.classList.add('panel-depth');
        } else {
          return root.classList.remove('panel-depth');
        }
      };
      atom.config.onDidChange('atom-material-ui.panels.depth', function() {
        return setDepth(atom.config.get('atom-material-ui.panels.depth'));
      });
      setDepth(atom.config.get('atom-material-ui.panels.depth'));
      setAltCmdPalette = function(boolean) {
        if (boolean) {
          return root.classList.add('alt-cmd-palette');
        } else {
          return root.classList.remove('alt-cmd-palette');
        }
      };
      atom.config.onDidChange('atom-material-ui.panels.altCmdPalette', function() {
        return setAltCmdPalette(atom.config.get('atom-material-ui.panels.altCmdPalette'));
      });
      setAltCmdPalette(atom.config.get('atom-material-ui.panels.altCmdPalette'));
      setTabSize = function(currentTabSize) {
        root.classList.remove('tab-size-small');
        root.classList.remove('tab-size-normal');
        root.classList.remove('tab-size-big');
        return root.classList.add('tab-size-' + currentTabSize.toLowerCase());
      };
      atom.config.onDidChange('atom-material-ui.tabs.tabSize', function() {
        return setTabSize(atom.config.get('atom-material-ui.tabs.tabSize'));
      });
      setTabSize(atom.config.get('atom-material-ui.tabs.tabSize'));
      setCompactTreeView = function(boolean) {
        if (boolean) {
          return root.classList.add('compact-tree-view');
        } else {
          return root.classList.remove('compact-tree-view');
        }
      };
      atom.config.onDidChange('atom-material-ui.treeView.compactTreeView', function() {
        return setCompactTreeView(atom.config.get('atom-material-ui.treeView.compactTreeView'));
      });
      setCompactTreeView(atom.config.get('atom-material-ui.treeView.compactTreeView'));
      setFontSize = function(currentFontSize) {
        root.classList.remove('font-size-small');
        root.classList.remove('font-size-regular');
        root.classList.remove('font-size-big');
        root.classList.remove('font-size-huge');
        return root.classList.add('font-size-' + currentFontSize.toLowerCase());
      };
      atom.config.onDidChange('atom-material-ui.fonts.fontSize', function() {
        return setFontSize(atom.config.get('atom-material-ui.fonts.fontSize'));
      });
      setFontSize(atom.config.get('atom-material-ui.fonts.fontSize'));
      setShowTabIcons = function(option) {
        root.classList.remove('tab-icons');
        root.classList.remove('tab-icons-all');
        if (option === 'Show on active tab') {
          return root.classList.add('tab-icons');
        } else if (option === 'Show on all tabs') {
          return root.classList.add('tab-icons-all');
        }
      };
      atom.config.onDidChange('atom-material-ui.tabs.showTabIcons', function() {
        return setShowTabIcons(atom.config.get('atom-material-ui.tabs.showTabIcons'));
      });
      setShowTabIcons(atom.config.get('atom-material-ui.tabs.showTabIcons'));
      setRippleAccentColor = function(boolean) {
        if (boolean) {
          return root.classList.add('ripple-accent-color');
        } else {
          return root.classList.remove('ripple-accent-color');
        }
      };
      atom.config.onDidChange('atom-material-ui.tabs.rippleAccentColor', function() {
        return setRippleAccentColor(atom.config.get('atom-material-ui.tabs.rippleAccentColor'));
      });
      setRippleAccentColor(atom.config.get('atom-material-ui.tabs.rippleAccentColor'));
      setTabMinWidth = function(boolean) {
        if (boolean) {
          return root.classList.add('tab-min-width');
        } else {
          return root.classList.remove('tab-min-width');
        }
      };
      atom.config.onDidChange('atom-material-ui.tabs.tabMinWidth', function() {
        return setTabMinWidth(atom.config.get('atom-material-ui.tabs.tabMinWidth'));
      });
      return setTabMinWidth(atom.config.get('atom-material-ui.tabs.tabMinWidth'));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvY29uZmlnLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsSUFBQSxLQUFBLEVBQU8sU0FBQSxHQUFBO0FBQ0gsVUFBQSx5UEFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxlQUFoQixDQUFBO0FBQUEsTUFJQSxVQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1QsWUFBQSx5QkFBQTtBQUFBLFFBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFmLENBQXNCLG1CQUF0QixDQUFBLENBQUE7QUFBQSxRQUVBLGNBQUEsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBZCxDQUFBLENBRmxCLENBQUE7QUFBQSxRQUdBLFNBQUEsR0FBWSxDQUFDLFlBQUQsRUFBZSxpQkFBZixFQUFrQyxZQUFsQyxFQUFnRCxzQkFBaEQsQ0FIWixDQUFBO2VBS0EsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBQyxJQUFELEVBQU8sQ0FBUCxHQUFBO0FBQ25CLFVBQUEsSUFBSSxTQUFTLENBQUMsT0FBVixDQUFrQixJQUFJLENBQUMsSUFBdkIsQ0FBQSxJQUFnQyxDQUFwQzttQkFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQWYsQ0FBbUIsbUJBQW5CLEVBREo7V0FEbUI7UUFBQSxDQUF2QixFQU5TO01BQUEsQ0FKYixDQUFBO0FBQUEsTUFjQSxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFkLENBQW1DLFNBQUEsR0FBQTtlQUFNLFVBQUEsQ0FBQSxFQUFOO01BQUEsQ0FBbkMsQ0FkQSxDQUFBO0FBQUEsTUFlQSxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFkLENBQXFDLFNBQUEsR0FBQTtlQUFNLFVBQUEsQ0FB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

//# sourceURL=/Users/haco/.atom/packages/atom-material-ui/lib/config.coffee
