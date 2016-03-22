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
            document.querySelector(':root').style.fontSize = value.newValue + 'px';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9hbXUtc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7b0JBR2dCLFFBQVE7Ozs7QUFIeEIsV0FBVyxDQUFDO0FBQ1osWUFBWSxDQUFDOztBQUliLElBQUksSUFBSSxHQUFHLFNBQVAsSUFBSSxHQUFjO0FBQ2xCLHNCQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDekYsc0JBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUN6RixzQkFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN0RixzQkFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3hGLHNCQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDckYsc0JBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUMvRixzQkFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNGLHNCQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBQzs7QUFFaEYsWUFBUSxDQUFD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QyxRQUFRLEVBQUUsZUFBZSxDQUFDO1NBQUEsQ0FBQyxDQUFDO0FBQ3pILFlBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLG1DQUFtQyxFQUFFLFVBQUMsS0FBSzttQkFBSyxrQkFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQztTQUFBLENBQUMsQ0FBQztBQUMzSCxZQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyx1Q0FBdUMsRUFBRSxVQUFDLEtBQUs7bUJBQUssa0JBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUM7U0FBQSxDQUFDLENBQUM7QUFDbEksWUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMscUNBQXFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDdEUsZ0JBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLEVBQUU7QUFDMUUsb0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQy9EOztBQUVELDhCQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDdEQsQ0FBQyxDQUFDO0tBQ047Q0FDSixDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9hbXUtc2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGFtdSBmcm9tICcuL21haW4nO1xuXG52YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudGFicy50aW50ZWRUYWJCYXInKSwgJ3RpbnRlZC10YWItYmFyJyk7XG4gICAgYW11LnRvZ2dsZUNsYXNzKGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS50YWJzLmNvbXBhY3RUYWJzJyksICdjb21wYWN0LXRhYi1iYXInKTtcbiAgICBhbXUudG9nZ2xlQ2xhc3MoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnVpLnBhbmVsU2hhZG93cycpLCAncGFuZWwtc2hhZG93cycpO1xuICAgIGFtdS50b2dnbGVDbGFzcyhhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkudWkucGFuZWxDb250cmFzdCcpLCAncGFuZWwtY29udHJhc3QnKTtcbiAgICBhbXUudG9nZ2xlQ2xhc3MoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnVpLmFuaW1hdGlvbnMnKSwgJ3VzZS1hbmltYXRpb25zJyk7XG4gICAgYW11LnRvZ2dsZUNsYXNzKGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5jb21wYWN0TGlzdCcpLCAnY29tcGFjdC10cmVlLXZpZXcnKTtcbiAgICBhbXUudG9nZ2xlQ2xhc3MoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmJsZW5kVGFicycpLCAnYmxlbmQtdHJlZS12aWV3Jyk7XG4gICAgYW11LnRvZ2dsZUJsZW5kVHJlZVZpZXcoYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmJsZW5kVGFicycpKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290Jykuc3R5bGUuZm9udFNpemUgPSBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkuZm9udHMuZm9udFNpemUnKSArICdweCc7XG5cbiAgICAvLyBGSVhNRTogT2JqZWN0Lm9ic2VydmUgaXMgZGVwcmVjYXRlZFxuICAgIGlmIChPYmplY3Qub2JzZXJ2ZSAmJiB0eXBlb2YgT2JqZWN0Lm9ic2VydmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgT2JqZWN0Lm9ic2VydmUoYXRvbS53b3Jrc3BhY2UuZ2V0UGFuZWxzKCdsZWZ0JyksICgpID0+IHtcbiAgICAgICAgICAgIGFtdS50b2dnbGVCbGVuZFRyZWVWaWV3KGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5ibGVuZFRhYnMnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbi8vIENoZWNrIGlmIHRoZXJlIGFyZSBjdXN0b20gaWNvbnMgcGFja2FnZXNcbnZhciBjaGVja1BhY2tzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhdG9tLXdvcmtzcGFjZScpO1xuICAgIHZhciBsb2FkZWRQYWNrYWdlcyA9IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZXMoKTtcbiAgICB2YXIgaWNvblBhY2tzID0gWydmaWxlLWljb25zJywgJ2ZpbGUtdHlwZS1pY29ucycsICdzZXRpLWljb25zJywgJ2VudnlnZWVrcy1maWxlLWljb25zJ107XG5cbiAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1jdXN0b20taWNvbnMnKTtcblxuICAgIGxvYWRlZFBhY2thZ2VzLmZvckVhY2goKHBhY2spID0+IHtcbiAgICAgICAgaWYgKGljb25QYWNrcy5pbmRleE9mKHBhY2submFtZSkgPj0gMCkge1xuICAgICAgICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdoYXMtY3VzdG9tLWljb25zJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFwcGx5KCkge1xuICAgICAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVQYWNrYWdlKCgpID0+IGNoZWNrUGFja3MoKSk7XG4gICAgICAgIGF0b20ucGFja2FnZXMub25EaWREZWFjdGl2YXRlUGFja2FnZSgoKSA9PiBjaGVja1BhY2tzKCkpO1xuXG4gICAgICAgIGluaXQoKTtcblxuICAgICAgICAvLyBGb250IFNpemUgU2V0dGluZ3NcblxuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS5mb250cy5mb250U2l6ZScsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKS5zdHlsZS5mb250U2l6ZSA9IHZhbHVlLm5ld1ZhbHVlICsgJ3B4JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVGFiIGJsZW5kaW5nXG5cbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQmxlbmRUcmVlVmlldyh2YWx1ZS5uZXdWYWx1ZSkpO1xuXG4gICAgICAgIC8vIGNsYXNzTmFtZS10b2dnbGluZyBTZXR0aW5nc1xuXG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMudGludGVkVGFiQmFyJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICd0aW50ZWQtdGFiLWJhcicpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudGFicy5jb21wYWN0VGFicycsICh2YWx1ZSkgPT4gYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAnY29tcGFjdC10YWItYmFyJykpO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS51aS5hbmltYXRpb25zJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICd1c2UtYW5pbWF0aW9ucycpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudWkucGFuZWxTaGFkb3dzJywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICdwYW5lbC1zaGFkb3dzJykpO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS51aS5wYW5lbENvbnRyYXN0JywgKHZhbHVlKSA9PiBhbXUudG9nZ2xlQ2xhc3ModmFsdWUubmV3VmFsdWUsICdwYW5lbC1jb250cmFzdCcpKTtcbiAgICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuY29tcGFjdExpc3QnLCAodmFsdWUpID0+IGFtdS50b2dnbGVDbGFzcyh2YWx1ZS5uZXdWYWx1ZSwgJ2NvbXBhY3QtdHJlZS12aWV3JykpO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5ibGVuZFRhYnMnLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5uZXdWYWx1ZSAmJiAhYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRhYnMudGludGVkVGFiQmFyJykpIHtcbiAgICAgICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkudGFicy50aW50ZWRUYWJCYXInLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYW11LnRvZ2dsZUNsYXNzKHZhbHVlLm5ld1ZhbHVlLCAnYmxlbmQtdHJlZS12aWV3Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iXX0=
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/amu-settings.js
