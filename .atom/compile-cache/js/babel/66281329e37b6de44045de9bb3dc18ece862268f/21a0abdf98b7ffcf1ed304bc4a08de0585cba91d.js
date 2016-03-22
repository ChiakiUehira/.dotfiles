function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

'use babel';
'use strict';

var init = function init() {
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.tabs.tintedTabBar'), 'tinted-tab-bar');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.tabs.compactTabs'), 'compact-tab-bar');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view');
    _main2['default'].toggleClass(atom.config.get('atom-material-ui.treeView.blendTabs'), 'blend-tree-view');
    _main2['default'].toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));

    document.querySelector(':root').style.fontSize = atom.config.get('atom-material-ui.fonts.fontSize') + 'px';

    // FIXME: Object.observe is deprecated
    if (Object.observe && typeof Object.observe === 'function') {
        Object.observe(atom.workspace.getPanels('left'), function () {
            _main2['default'].toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
        });
    }
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

        // Font Size Settings

        atom.config.onDidChange('atom-material-ui.fonts.fontSize', function (value) {
            var fontSize = Math.round(value.newValue);
            document.querySelector(':root').style.fontSize = fontSize + 'px';
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
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9hbXUtc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7b0JBR2dCLFFBQVE7Ozs7QUFIeEIsV0FBVyxDQUFDO0FBQ1osWUFBWSxDQUFDOztBQUliLElBQUksSUFBSSxHQUFHLFNBQVAsSUFBSSxHQUFjO0FBQ2xCLHNCQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDekYsc0JBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUN6RixzQkFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN0RixzQkFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3hGLHNCQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDckYsc0JBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUMvRixzQkFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNGLHNCQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBQzs7QUFFaEYsWUFBUSxDQUFD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QyxFQUFFLFVBQUMsS0FBSzttQkFBSyxrQkFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUM7U0FBQSxDQUFDLENBQUM7QUFDekgsWUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsbUNBQW1DLEVBQUUsVUFBQyxLQUFLO21CQUFLLGtCQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDO1NBQUEsQ0FBQyxDQUFDO0FBQzNILFlBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLHVDQUF1QyxFQUFFLFVBQUMsS0FBSzttQkFBSyxrQkFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQztTQUFBLENBQUMsQ0FBQztBQUNsSSxZQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxxQ0FBcUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN0RSxnQkFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsRUFBRTtBQUMxRSxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDL0Q7O0FBRUQsOEJBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUN0RCxDQUFDLENBQUM7S0FDTjtDQUNKLENBQUMiLCJmaWxlIjoiL1VzZXJzL2hhY28vLmRvdGZpbGVzLy5hdG9tL3BhY2thZ2VzL2F0b20tbWF0ZXJpYWwtdWkvbGliL2FtdS1zZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYW11IGZyb20gJy4vbWFpbic7XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgYW11LnRvZ2dsZUNsYXNzKGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS50YWJzLnRpbnRlZFRhYkJhcicpLCAndGludGVkLXRhYi1iYXInKTtcbiAgICBhbXUudG9nZ2xlQ2xhc3MoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMuY29tcGFjdFRhYnMnKSwgJ2NvbXBhY3QtdGFiLWJhcicpO1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudWkucGFuZWxTaGFkb3dzJyksICdwYW5lbC1zaGFkb3dzJyk7XG4gICAgYW11LnRvZ2dsZUNsYXNzKGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS51aS5wYW5lbENvbnRyYXN0JyksICdwYW5lbC1jb250cmFzdCcpO1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudWkuYW5pbWF0aW9ucycpLCAndXNlLWFuaW1hdGlvbnMnKTtcbiAgICBhbXUudG9nZ2xlQ2xhc3MoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmNvbXBhY3RMaXN0JyksICdjb21wYWN0LXRyZWUtdmlldycpO1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJyksICdibGVuZC10cmVlLXZpZXcnKTtcbiAgICBhbXUudG9nZ2xlQmxlbmRUcmVlVmlldyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJykpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKS5zdHlsZS5mb250U2l6ZSA9IGAke2F0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS5mb250cy5mb250U2l6ZScpfXB4YDtcblxuICAgIC8vIEZJWE1FOiBPYmplY3Qub2JzZXJ2ZSBpcyBkZXByZWNhdGVkXG4gICAgaWYgKE9iamVjdC5vYnNlcnZlICYmIHR5cGVvZiBPYmplY3Qub2JzZXJ2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBPYmplY3Qub2JzZXJ2ZShhdG9tLndvcmtzcGFjZS5nZXRQYW5lbHMoJ2xlZnQnKSwgKCkgPT4ge1xuICAgICAgICAgICAgYW11LnRvZ2dsZUJsZW5kVHJlZVZpZXcoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmJsZW5kVGFicycpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuLy8gQ2hlY2sgaWYgdGhlcmUgYXJlIGN1c3RvbSBpY29ucyBwYWNrYWdlc1xudmFyIGNoZWNrUGFja3MgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2F0b20td29ya3NwYWNlJyk7XG4gICAgdmFyIGxvYWRlZFBhY2thZ2VzID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlcygpO1xuICAgIHZhciBpY29uUGFja3MgPSBbJ2ZpbGUtaWNvbnMnLCAnZmlsZS10eXBlLWljb25zJywgJ3NldGktaWNvbnMnLCAnZW52eWdlZWtzLWZpbGUtaWNvbnMnXTtcblxuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWN1c3RvbS1pY29ucycpO1xuXG4gICAgbG9hZGVkUGFja2FnZXMuZm9yRWFjaCgocGFjaykgPT4ge1xuICAgICAgICBpZiAoaWNvblBhY2tzLmluZGV4T2YocGFjay5uYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICByb290LmNsYXNzTGlzdC5hZGQoJ2hhcy1jdXN0b20taWNvbnMnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXBwbHkoKSB7XG4gICAgICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZVBhY2thZ2UoKCkgPT4gY2hlY2tQYWNrcygpKTtcbiAgICAgICAgYXRvbS5wYWNrYWdlcy5vbkRpZERlYWN0aXZhdGVQYWNrYWdlKCgpID0+IGNoZWNrUGFja3MoKSk7XG5cbiAgICAgICAgaW5pdCgpO1xuXG4gICAgICAgIC8vIEZvbnQgU2l6ZSBTZXR0aW5nc1xuXG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLmZvbnRzLmZvbnRTaXplJywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YXIgZm9udFNpemUgPSBNYXRoLnJvdW5kKHZhbHVlLm5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290Jykuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRhYiBibGVuZGluZ1xuXG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmJsZW5kVGFicycsICh2YWx1ZSkgPT4gYW11LnRvZ2dsZUJsZW5kVHJlZVZpZXcodmFsdWUubmV3VmFsdWUpKTtcblxuICAgICAgICAvLyBjbGFzc05hbWUtdG9nZ2xpbmcgU2V0dGluZ3NcblxuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS50YWJzLnRpbnRlZFRhYkJhcicsICh2YWx1ZSkgPT4gYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAndGludGVkLXRhYi1iYXInKSk7XG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMuY29tcGFjdFRhYnMnLCAodmFsdWUpID0+IGFtdS50b2dnbGVDbGFzcyh2YWx1ZS5uZXdWYWx1ZSwgJ2NvbXBhY3QtdGFiLWJhcicpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudWkuYW5pbWF0aW9ucycsICh2YWx1ZSkgPT4gYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAndXNlLWFuaW1hdGlvbnMnKSk7XG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLnVpLnBhbmVsU2hhZG93cycsICh2YWx1ZSkgPT4gYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAncGFuZWwtc2hhZG93cycpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudWkucGFuZWxDb250cmFzdCcsICh2YWx1ZSkgPT4gYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAncGFuZWwtY29udHJhc3QnKSk7XG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmNvbXBhY3RMaXN0JywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICdjb21wYWN0LXRyZWUtdmlldycpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUubmV3VmFsdWUgJiYgIWF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS50YWJzLnRpbnRlZFRhYkJhcicpKSB7XG4gICAgICAgICAgICAgICAgYXRvbS5jb25maWcuc2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMudGludGVkVGFiQmFyJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFtdS50b2dnbGVDbGFzcyh2YWx1ZS5uZXdWYWx1ZSwgJ2JsZW5kLXRyZWUtdmlldycpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIl19
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/amu-settings.js
