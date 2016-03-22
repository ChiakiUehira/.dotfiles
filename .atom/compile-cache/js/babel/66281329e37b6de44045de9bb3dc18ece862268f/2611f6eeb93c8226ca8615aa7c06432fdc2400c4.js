function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _amuBindings = require('./amu-bindings');

var _amuBindings2 = _interopRequireDefault(_amuBindings);

var _tinycolor2 = require('tinycolor2');

var _tinycolor22 = _interopRequireDefault(_tinycolor2);

var _colorTemplates = require('./color-templates');

var _colorTemplates2 = _interopRequireDefault(_colorTemplates);

'use babel';
'use strict';

var toCamelCase = function toCamelCase(str) {
    return str.replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
    }).replace(/\s/g, '').replace(/^(.)/, function ($1) {
        return $1.toLowerCase();
    });
};

var init = function init() {
    if (!localStorage.getItem('atom-material-ui:configUpdated')) {
        atom.config.set('atom-material-ui');
        _main2['default'].writeConfig({
            callback: function callback() {
                atom.notifications.addSuccess('There were breaking changes and Material UI had to reset its settings.');
                localStorage.setItem('atom-material-ui:configUpdated', true);
            }
        });
    }

    _main2['default'].toggleClass(atom.config.get('atom-material-ui.tabs.tintedTabBar'), 'tinted-tab-bar');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.tabs.compactTabs'), 'compact-tab-bar');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.treeView.blendTabs'), 'blend-tree-view');
    _main2['default'].toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
};

// Check if there are custom icons packages
var checkPacks = function checkPacks() {
    var root = document.querySelector('atom-workspace');
    var loadedPackages = atom.packages.getActivePackages();
    var iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];

    root.classList.remove('has-custom-icons');
    loadedPackages.forEach(function (pack) {
        if (iconPacks.indexOf(pack.name) >= 0) {
            root.classList.add('has-custom-icons');
        }
    });
};

module.exports = {
    apply: function apply() {
        atom.packages.onDidActivatePackage(function () {
            return checkPacks();
        });
        atom.packages.onDidDeactivatePackage(function () {
            return checkPacks();
        });

        init();

        // Accent color

        atom.config.onDidChange('atom-material-ui.colors.accentColor', function (value) {
            var accentColor = (0, _tinycolor22['default'])(value.newValue.toHexString());

            if (!accentColor.isValid()) {
                return atom.notifications.addError('The selected color <code>' + value.newValue.toHexString() + '</code> is not a valid HEX value. Try another!. This is a bug within a core package, settings-view, and has been <a href="https://github.com/atom/settings-view/issues/712">reported</a>.', { dismissable: true });
            }
            _main2['default'].writeConfig();
        });
        atom.config.onDidChange('atom-material-ui.colors.abaseColor', function (value) {
            var baseColor = (0, _tinycolor22['default'])(value.newValue.toHexString());

            if (!baseColor.isValid()) {
                return atom.notifications.addError('The selected color <code>' + value.newValue.toHexString() + '</code> is not a valid HEX value. Try another!. This is a bug within a core package, settings-view, and has been <a href="https://github.com/atom/settings-view/issues/712">reported</a>.', { dismissable: true });
            }
            if (baseColor.isValid() && atom.config.get('atom-material-ui.colors.genAccent')) {
                var accentColor = baseColor.complement().saturate(20).lighten(5);

                if (accentColor.isValid()) {
                    atom.config.set('atom-material-ui.colors.accentColor', accentColor.toHexString());
                }
            }
            _main2['default'].writeConfig();
        });
        atom.config.onDidChange('atom-material-ui.colors.predefinedColor', function (value) {
            var newValue = toCamelCase(value.newValue);

            atom.config.set('atom-material-ui.colors.abaseColor', _colorTemplates2['default'][newValue].base);
            atom.config.set('atom-material-ui.colors.accentColor', _colorTemplates2['default'][newValue].accent);
        });

        // Font Size Settings

        atom.config.onDidChange('atom-material-ui.fonts.fontSize', function () {
            return _main2['default'].writeConfig();
        });

        // Tab blending

        atom.config.onDidChange('atom-material-ui.treeView.blendTabs', function (value) {
            return _main2['default'].toggleBlendTreeView(value.newValue);
        });

        // className-toggling Settings

        atom.config.onDidChange('atom-material-ui.tabs.tintedTabBar', function (value) {
            return _main2['default'].toggleClass(value.newValue, 'tinted-tab-bar');
        });
        atom.config.onDidChange('atom-material-ui.tabs.compactTabs', function (value) {
            return _main2['default'].toggleClass(value.newValue, 'compact-tab-bar');
        });
        atom.config.onDidChange('atom-material-ui.ui.animations', function (value) {
            return _main2['default'].toggleClass(value.newValue, 'use-animations');
        });
        atom.config.onDidChange('atom-material-ui.ui.panelShadows', function (value) {
            return _main2['default'].toggleClass(value.newValue, 'panel-shadows');
        });
        atom.config.onDidChange('atom-material-ui.ui.panelContrast', function (value) {
            return _main2['default'].toggleClass(value.newValue, 'panel-contrast');
        });
        atom.config.onDidChange('atom-material-ui.treeView.compactList', function (value) {
            return _main2['default'].toggleClass(value.newValue, 'compact-tree-view');
        });
        atom.config.onDidChange('atom-material-ui.treeView.blendTabs', function (value) {
            if (value.newValue && !atom.config.get('atom-material-ui.tabs.tintedTabBar')) {
                atom.config.set('atom-material-ui.tabs.tintedTabBar', true);
            }

            _main2['default'].toggleClass(value.newValue, 'blend-tree-view');
            _amuBindings2['default'].apply();
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9hbXUtc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7b0JBR2dCLFFBQVE7Ozs7MkJBQ0EsZ0JBQWdCOzs7OzBCQUNsQixZQUFZOzs7OzhCQUNQLG1CQUFtQjs7OztBQU45QyxXQUFXLENBQUM7QUFDWixZQUFZLENBQUM7O0FBT2IsSUFBSSxXQUFXLEdBQUcsU0FBZCxXQUFXLENBQVksR0FBRyxFQUFFO0FBQzVCLFdBQU8sR0FBRyxDQUNMLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBUyxFQUFFLEVBQUU7QUFBRSxlQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUFFLENBQUMsQ0FDNUQsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDbEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFTLEVBQUUsRUFBRTtBQUFFLGVBQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQUUsQ0FBQyxDQUFDO0NBQ25FLENBQUM7O0FBRUYsSUFBSSxJQUFJLEdBQUcsU0FBUCxJQUFJLEdBQWM7QUFDbEIsUUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtBQUN6RCxZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BDLDBCQUFJLFdBQVcsQ0FBQztBQUNaLG9CQUFRLEVBQUEsb0JBQUc7QUFDUCxvQkFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsd0VBQXdFLENBQUMsQ0FBQztBQUN4Ryw0QkFBWSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNoRTtTQUNKLENBQUMsQ0FBQztLQUNOOztBQUVELHNCQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLGdCQUFnQixD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LFVBQUMsS0FBSyxFQUFLO0FBQ3RFLGdCQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFO0FBQzFFLG9CQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMvRDs7QUFFRCw4QkFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25ELHFDQUFZLEtBQUssRUFBRSxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztLQUNOO0NBQ0osQ0FBQyIsImZpbGUiOiIvVXNlcnMvaGFjby8uZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvYW11LXNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhbXUgZnJvbSAnLi9tYWluJztcbmltcG9ydCBhbXVCaW5kaW5ncyBmcm9tICcuL2FtdS1iaW5kaW5ncyc7XG5pbXBvcnQgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xuaW1wb3J0IGNvbG9yVGVtcGxhdGVzIGZyb20gJy4vY29sb3ItdGVtcGxhdGVzJztcblxudmFyIHRvQ2FtZWxDYXNlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAucmVwbGFjZSgvXFxzKC4pL2csIGZ1bmN0aW9uKCQxKSB7IHJldHVybiAkMS50b1VwcGVyQ2FzZSgpOyB9KVxuICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxuICAgICAgICAucmVwbGFjZSgvXiguKS8sIGZ1bmN0aW9uKCQxKSB7IHJldHVybiAkMS50b0xvd2VyQ2FzZSgpOyB9KTtcbn07XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXRvbS1tYXRlcmlhbC11aTpjb25maWdVcGRhdGVkJykpIHtcbiAgICAgICAgYXRvbS5jb25maWcuc2V0KCdhdG9tLW1hdGVyaWFsLXVpJyk7XG4gICAgICAgIGFtdS53cml0ZUNvbmZpZyh7XG4gICAgICAgICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkU3VjY2VzcygnVGhlcmUgd2VyZSBicmVha2luZyBjaGFuZ2VzIGFuZCBNYXRlcmlhbCBVSSBoYWQgdG8gcmVzZXQgaXRzIHNldHRpbmdzLicpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhdG9tLW1hdGVyaWFsLXVpOmNvbmZpZ1VwZGF0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYW11LnRvZ2dsZUNsYXNzKGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS50YWJzLnRpbnRlZFRhYkJhcicpLCAndGludGVkLXRhYi1iYXInKTtcbiAgICBhbXUudG9nZ2xlQ2xhc3MoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMuY29tcGFjdFRhYnMnKSwgJ2NvbXBhY3QtdGFiLWJhcicpO1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudWkucGFuZWxTaGFkb3dzJyksICdwYW5lbC1zaGFkb3dzJyk7XG4gICAgYW11LnRvZ2dsZUNsYXNzKGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS51aS5wYW5lbENvbnRyYXN0JyksICdwYW5lbC1jb250cmFzdCcpO1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudWkuYW5pbWF0aW9ucycpLCAndXNlLWFuaW1hdGlvbnMnKTtcbiAgICBhbXUudG9nZ2xlQ2xhc3MoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmNvbXBhY3RMaXN0JyksICdjb21wYWN0LXRyZWUtdmlldycpO1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJyksICdibGVuZC10cmVlLXZpZXcnKTtcbiAgICBhbXUudG9nZ2xlQmxlbmRUcmVlVmlldyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJykpO1xufTtcblxuLy8gQ2hlY2sgaWYgdGhlcmUgYXJlIGN1c3RvbSBpY29ucyBwYWNrYWdlc1xudmFyIGNoZWNrUGFja3MgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2F0b20td29ya3NwYWNlJyk7XG4gICAgdmFyIGxvYWRlZFBhY2thZ2VzID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlcygpO1xuICAgIHZhciBpY29uUGFja3MgPSBbJ2ZpbGUtaWNvbnMnLCAnZmlsZS10eXBlLWljb25zJywgJ3NldGktaWNvbnMnLCAnZW52eWdlZWtzLWZpbGUtaWNvbnMnXTtcblxuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWN1c3RvbS1pY29ucycpO1xuICAgIGxvYWRlZFBhY2thZ2VzLmZvckVhY2goKHBhY2spID0+IHtcbiAgICAgICAgaWYgKGljb25QYWNrcy5pbmRleE9mKHBhY2submFtZSkgPj0gMCkge1xuICAgICAgICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdoYXMtY3VzdG9tLWljb25zJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFwcGx5KCkge1xuICAgICAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVQYWNrYWdlKCgpID0+IGNoZWNrUGFja3MoKSk7XG4gICAgICAgIGF0b20ucGFja2FnZXMub25EaWREZWFjdGl2YXRlUGFja2FnZSgoKSA9PiBjaGVja1BhY2tzKCkpO1xuXG4gICAgICAgIGluaXQoKTtcblxuICAgICAgICAvLyBBY2NlbnQgY29sb3JcblxuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWNjZW50Q29sb3InLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhciBhY2NlbnRDb2xvciA9IHRpbnljb2xvcih2YWx1ZS5uZXdWYWx1ZS50b0hleFN0cmluZygpKTtcblxuICAgICAgICAgICAgaWYgKCFhY2NlbnRDb2xvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGBUaGUgc2VsZWN0ZWQgY29sb3IgPGNvZGU+JHt2YWx1ZS5uZXdWYWx1ZS50b0hleFN0cmluZygpfTwvY29kZT4gaXMgbm90IGEgdmFsaWQgSEVYIHZhbHVlLiBUcnkgYW5vdGhlciEuIFRoaXMgaXMgYSBidWcgd2l0aGluIGEgY29yZSBwYWNrYWdlLCBzZXR0aW5ncy12aWV3LCBhbmQgaGFzIGJlZW4gPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tL3NldHRpbmdzLXZpZXcvaXNzdWVzLzcxMlwiPnJlcG9ydGVkPC9hPi5gLCB7IGRpc21pc3NhYmxlOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW11LndyaXRlQ29uZmlnKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWJhc2VDb2xvcicsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGJhc2VDb2xvciA9IHRpbnljb2xvcih2YWx1ZS5uZXdWYWx1ZS50b0hleFN0cmluZygpKTtcblxuICAgICAgICAgICAgaWYgKCFiYXNlQ29sb3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihgVGhlIHNlbGVjdGVkIGNvbG9yIDxjb2RlPiR7dmFsdWUubmV3VmFsdWUudG9IZXhTdHJpbmcoKX08L2NvZGU+IGlzIG5vdCBhIHZhbGlkIEhFWCB2YWx1ZS4gVHJ5IGFub3RoZXIhLiBUaGlzIGlzIGEgYnVnIHdpdGhpbiBhIGNvcmUgcGFja2FnZSwgc2V0dGluZ3MtdmlldywgYW5kIGhhcyBiZWVuIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYXRvbS9zZXR0aW5ncy12aWV3L2lzc3Vlcy83MTJcIj5yZXBvcnRlZDwvYT4uYCwgeyBkaXNtaXNzYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiYXNlQ29sb3IuaXNWYWxpZCgpICYmIGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuZ2VuQWNjZW50JykpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWNjZW50Q29sb3IgPSBiYXNlQ29sb3IuY29tcGxlbWVudCgpLnNhdHVyYXRlKDIwKS5saWdodGVuKDUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjY2VudENvbG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFjY2VudENvbG9yJywgYWNjZW50Q29sb3IudG9IZXhTdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW11LndyaXRlQ29uZmlnKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMucHJlZGVmaW5lZENvbG9yJywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB0b0NhbWVsQ2FzZSh2YWx1ZS5uZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWJhc2VDb2xvcicsIGNvbG9yVGVtcGxhdGVzW25ld1ZhbHVlXS5iYXNlKTtcbiAgICAgICAgICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWNjZW50Q29sb3InLCBjb2xvclRlbXBsYXRlc1tuZXdWYWx1ZV0uYWNjZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRm9udCBTaXplIFNldHRpbmdzXG5cbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkuZm9udHMuZm9udFNpemUnLCAoKSA9PiBhbXUud3JpdGVDb25maWcoKSk7XG5cbiAgICAgICAgLy8gVGFiIGJsZW5kaW5nXG5cbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQmxlbmRUcmVlVmlldyh2YWx1ZS5uZXdWYWx1ZSkpO1xuXG4gICAgICAgIC8vIGNsYXNzTmFtZS10b2dnbGluZyBTZXR0aW5nc1xuXG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMudGludGVkVGFiQmFyJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICd0aW50ZWQtdGFiLWJhcicpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudGFicy5jb21wYWN0VGFicycsICh2YWx1ZSkgPT4gYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAnY29tcGFjdC10YWItYmFyJykpO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS51aS5hbmltYXRpb25zJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICd1c2UtYW5pbWF0aW9ucycpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudWkucGFuZWxTaGFkb3dzJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICdwYW5lbC1zaGFkb3dzJykpO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS51aS5wYW5lbENvbnRyYXN0JywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICdwYW5lbC1jb250cmFzdCcpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuY29tcGFjdExpc3QnLCAodmFsdWUpID0+IGFtdS50b2dnbGVDbGFzcyh2YWx1ZS5uZXdWYWx1ZSwgJ2NvbXBhY3QtdHJlZS12aWV3JykpO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5ibGVuZFRhYnMnLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5uZXdWYWx1ZSAmJiAhYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMudGludGVkVGFiQmFyJykpIHtcbiAgICAgICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkudGFicy50aW50ZWRUYWJCYXInLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAnYmxlbmQtdHJlZS12aWV3Jyk7XG4gICAgICAgICAgICBhbXVCaW5kaW5ncy5hcHBseSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIl19
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/amu-settings.js
