Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _configSchema = require('./config-schema');

var _configSchema2 = _interopRequireDefault(_configSchema);

var _amuSettings = require('./amu-settings');

var _amuSettings2 = _interopRequireDefault(_amuSettings);

var _amuColorSettings = require('./amu-color-settings');

var _amuColorSettings2 = _interopRequireDefault(_amuColorSettings);

var _amuBindings = require('./amu-bindings');

var _amuBindings2 = _interopRequireDefault(_amuBindings);

var _tinycolor2 = require('tinycolor2');

var _tinycolor22 = _interopRequireDefault(_tinycolor2);

var _updateConfigSchema = require('./update-config-schema');

'use babel';
'use strict';

var treeViews;

var getTreeViews = function getTreeViews() {
    setImmediate(function () {
        treeViews = [document.querySelector('.tree-view-resizer'), document.querySelector('.remote-ftp-view'), (function () {
            var nuclideTreeView = document.querySelector('.nuclide-file-tree');

            if (nuclideTreeView) {
                return nuclideTreeView.closest('.nuclide-ui-panel-component');
            }
        })()];
    });
};

var removeBlendingEl = function removeBlendingEl() {
    getTreeViews();
    treeViews.forEach(function (treeView) {
        if (treeView) {
            var blendingEl = treeView.querySelector('.tabBlender');

            if (blendingEl) {
                treeView.removeChild(blendingEl);
            }
        }
    });
};

atom.workspace.onDidAddPane(function () {
    setImmediate(function () {
        return _amuBindings2['default'].apply();
    });
});

exports['default'] = {
    config: _configSchema2['default'],

    toggleClass: function toggleClass(boolean, className) {
        var root = document.querySelector('atom-workspace');

        if (boolean) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    },

    writeConfig: function writeConfig(options) {
        var accentColor = atom.config.get('atom-material-ui.colors.accentColor').toRGBAString();
        var baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toRGBAString();
        var accentTextColor = '#666';
        var luminance = (0, _tinycolor22['default'])(baseColor).getLuminance();

        if (luminance <= 0.3 && luminance > 0.22) {
            accentTextColor = 'rgba(255,255,255,0.9)';
        } else if (luminance <= 0.22) {
            accentTextColor = 'rgba(255,255,255,0.8)';
        } else if (luminance > 0.3) {
            accentTextColor = 'rgba(0,0,0,0.6)';
        }

        /**
        * This is kind of against Airbnb's stylguide, but produces a much
        * better output and is readable.
        */
        var config = '@accent-color: ' + accentColor + ';\n' + ('@accent-text-color: ' + accentTextColor + ';\n') + ('@base-color: ' + baseColor + ';\n');

        _fs2['default'].writeFile(__dirname + '/../styles/custom.less', config, 'utf8', function () {
            if (!options || !options.noReload) {
                var themePack = atom.packages.getLoadedPackage('atom-material-ui');

                if (themePack) {
                    themePack.deactivate();
                    setImmediate(function () {
                        return themePack.activate();
                    });
                }
            }
            if (options && options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        });
    },

    toggleBlendTreeView: function toggleBlendTreeView(bool) {
        var _this = this;

        getTreeViews();
        setImmediate(function () {
            treeViews.forEach(function (treeView) {
                if (treeView) {
                    var blendingEl = document.createElement('div');
                    var title = document.createElement('span');

                    blendingEl.classList.add('tabBlender');
                    blendingEl.appendChild(title);

                    if (treeView && bool) {
                        if (treeView.querySelector('.tabBlender')) {
                            removeBlendingEl();
                        }
                        treeView.insertBefore(blendingEl, treeView.firstChild);
                    } else if (treeView && !bool) {
                        removeBlendingEl();
                    } else if (!treeView && bool) {
                        if (atom.packages.getActivePackage('tree-view') || atom.packages.getActivePackage('Remote-FTP') || atom.packages.getActivePackage('nuclide')) {
                            return setTimeout(function () {
                                _this.toggleBlendTreeView(bool);
                                setImmediate(function () {
                                    return _amuBindings2['default'].apply();
                                });
                            }, 2000);
                        }
                    }
                }
            });
        });
    },

    activate: function activate() {
        (0, _updateConfigSchema.apply)();
        _amuSettings2['default'].apply();
        _amuColorSettings2['default'].apply();
        setImmediate(function () {
            return _amuBindings2['default'].apply();
        });
        this.writeConfig({ noReload: true });
    },

    deactivate: function deactivate() {
        this.toggleBlendTreeView(false);
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFHZSxJQUFJOzs7OzRCQUNBLGlCQUFpQjs7OzsyQkFDWixnQkFBZ0I7Ozs7Z0NBQ1gsc0JBQXNCOzs7OzJCQUMzQixnQkFBZ0I7Ozs7MEJBQ2xCLFlBQVk7Ozs7a0NBQ0ksd0JBQXdCOztBQVQ5RCxXQUFXLENBQUM7QUFDWixZQUFZLENBQUM7O0FBVWIsSUFBSSxTQUFTLENBQUM7O0FBRWQsSUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLEdBQWM7QUFDMUIsZ0JBQVksQ0FBQyxZQUFNO0FBQ2YsaUJBQVMsR0FBRyxDQUNSLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFDNUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUMxQyxDQUFBLFlBQVk7QUFDUixnQkFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUVuRSxnQkFBSSxlQUFlLEVBQUU7QUFDakIsdUJBQU8sZUFBZSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0osQ0FBQSxFQUFFLENBQ04sQ0FBQztLQUNMLENBQUMsQ0FBQztDQUNOLENBQUM7O0FBRUYsSUFBSSxnQkFBZ0IsR0FBRyxTQUFuQixnQkFBZ0IsR0FBYztBQUM5QixnQkFBWSxFQUFFLENBQUM7QUFDZixhQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFLO0FBQzVCLFlBQUksUUFBUSxFQUFFO0FBQ1YsZ0JBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7O0FBRXZELGdCQUFJLFVBQVUsRUFBRTtBQUNaLHdCQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0o7S0FDSixDQUFDLENB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Y28vLmRvdGZpbGVzLy5hdG9tL3BhY2thZ2VzL2F0b20tbWF0ZXJpYWwtdWkvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWctc2NoZW1hJztcbmltcG9ydCBhbXVTZXR0aW5ncyBmcm9tICcuL2FtdS1zZXR0aW5ncyc7XG5pbXBvcnQgYW11Q29sb3JTZXR0aW5ncyBmcm9tICcuL2FtdS1jb2xvci1zZXR0aW5ncyc7XG5pbXBvcnQgYW11QmluZGluZ3MgZnJvbSAnLi9hbXUtYmluZGluZ3MnO1xuaW1wb3J0IHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcbmltcG9ydCB7IGFwcGx5IGFzIHVwZGF0ZVNjaGVtYSB9IGZyb20gJy4vdXBkYXRlLWNvbmZpZy1zY2hlbWEnO1xuXG52YXIgdHJlZVZpZXdzO1xuXG52YXIgZ2V0VHJlZVZpZXdzID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgdHJlZVZpZXdzID0gW1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyZWUtdmlldy1yZXNpemVyJyksXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVtb3RlLWZ0cC12aWV3JyksXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG51Y2xpZGVUcmVlVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5udWNsaWRlLWZpbGUtdHJlZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG51Y2xpZGVUcmVlVmlldykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVjbGlkZVRyZWVWaWV3LmNsb3Nlc3QoJy5udWNsaWRlLXVpLXBhbmVsLWNvbXBvbmVudCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0oKVxuICAgICAgICBdO1xuICAgIH0pO1xufTtcblxudmFyIHJlbW92ZUJsZW5kaW5nRWwgPSBmdW5jdGlvbigpIHtcbiAgICBnZXRUcmVlVmlld3MoKTtcbiAgICB0cmVlVmlld3MuZm9yRWFjaCgodHJlZVZpZXcpID0+IHtcbiAgICAgICAgaWYgKHRyZWVWaWV3KSB7XG4gICAgICAgICAgICB2YXIgYmxlbmRpbmdFbCA9IHRyZWVWaWV3LnF1ZXJ5U2VsZWN0b3IoJy50YWJCbGVuZGVyJyk7XG5cbiAgICAgICAgICAgIGlmIChibGVuZGluZ0VsKSB7XG4gICAgICAgICAgICAgICAgdHJlZVZpZXcucmVtb3ZlQ2hpbGQoYmxlbmRpbmdFbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmF0b20ud29ya3NwYWNlLm9uRGlkQWRkUGFuZSgoKSA9PiB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IGFtdUJpbmRpbmdzLmFwcGx5KCkpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWcsXG5cbiAgICB0b2dnbGVDbGFzcyhib29sZWFuLCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhdG9tLXdvcmtzcGFjZScpO1xuXG4gICAgICAgIGlmIChib29sZWFuKSB7XG4gICAgICAgICAgICByb290LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHdyaXRlQ29uZmlnKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGFjY2VudENvbG9yID0gYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hY2NlbnRDb2xvcicpLnRvUkdCQVN0cmluZygpO1xuICAgICAgICB2YXIgYmFzZUNvbG9yID0gYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hYmFzZUNvbG9yJykudG9SR0JBU3RyaW5nKCk7XG4gICAgICAgIHZhciBhY2NlbnRUZXh0Q29sb3IgPSAnIzY2Nic7XG4gICAgICAgIHZhciBsdW1pbmFuY2UgPSB0aW55Y29sb3IoYmFzZUNvbG9yKS5nZXRMdW1pbmFuY2UoKTtcblxuICAgICAgICBpZiAobHVtaW5hbmNlIDw9IDAuMyAmJiBsdW1pbmFuY2UgPiAwLjIyKSB7XG4gICAgICAgICAgICBhY2NlbnRUZXh0Q29sb3IgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjkpJztcbiAgICAgICAgfSBlbHNlIGlmIChsdW1pbmFuY2UgPD0gMC4yMikge1xuICAgICAgICAgICAgYWNjZW50VGV4dENvbG9yID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC44KSc7XG4gICAgICAgIH0gZWxzZSBpZiAobHVtaW5hbmNlID4gMC4zKSB7XG4gICAgICAgICAgICBhY2NlbnRUZXh0Q29sb3IgPSAncmdiYSgwLDAsMCwwLjYpJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIFRoaXMgaXMga2luZCBvZiBhZ2FpbnN0IEFpcmJuYidzIHN0eWxndWlkZSwgYnV0IHByb2R1Y2VzIGEgbXVjaFxuICAgICAgICAqIGJldHRlciBvdXRwdXQgYW5kIGlzIHJlYWRhYmxlLlxuICAgICAgICAqL1xuICAgICAgICB2YXIgY29uZmlnID0gYEBhY2NlbnQtY29sb3I6ICR7YWNjZW50Q29sb3J9O1xcbmAgK1xuICAgICAgICAgICAgICAgICAgICAgYEBhY2NlbnQtdGV4dC1jb2xvcjogJHthY2NlbnRUZXh0Q29sb3J9O1xcbmAgK1xuICAgICAgICAgICAgICAgICAgICAgYEBiYXNlLWNvbG9yOiAke2Jhc2VDb2xvcn07XFxuYDtcblxuICAgICAgICBmcy53cml0ZUZpbGUoYCR7X19kaXJuYW1lfS8uLi9zdHlsZXMvY3VzdG9tLmxlc3NgLCBjb25maWcsICd1dGY4JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLm5vUmVsb2FkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoZW1lUGFjayA9IGF0b20ucGFja2FnZXMuZ2V0TG9hZGVkUGFja2FnZSgnYXRvbS1tYXRlcmlhbC11aScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lUGFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGVtZVBhY2suZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gdGhlbWVQYWNrLmFjdGl2YXRlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVCbGVuZFRyZWVWaWV3KGJvb2wpIHtcbiAgICAgICAgZ2V0VHJlZVZpZXdzKCk7XG4gICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICB0cmVlVmlld3MuZm9yRWFjaCgodHJlZVZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHJlZVZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsZW5kaW5nRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kaW5nRWwuY2xhc3NMaXN0LmFkZCgndGFiQmxlbmRlcicpO1xuICAgICAgICAgICAgICAgICAgICBibGVuZGluZ0VsLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJlZVZpZXcgJiYgYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3LnF1ZXJ5U2VsZWN0b3IoJy50YWJCbGVuZGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVCbGVuZGluZ0VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlVmlldy5pbnNlcnRCZWZvcmUoYmxlbmRpbmdFbCwgdHJlZVZpZXcuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJlZVZpZXcgJiYgIWJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUJsZW5kaW5nRWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdHJlZVZpZXcgJiYgYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgndHJlZS12aWV3JykgfHwgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCdSZW1vdGUtRlRQJykgfHwgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCdudWNsaWRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlQmxlbmRUcmVlVmlldyhib29sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGFtdUJpbmRpbmdzLmFwcGx5KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdXBkYXRlU2NoZW1hKCk7XG4gICAgICAgIGFtdVNldHRpbmdzLmFwcGx5KCk7XG4gICAgICAgIGFtdUNvbG9yU2V0dGluZ3MuYXBwbHkoKTtcbiAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGFtdUJpbmRpbmdzLmFwcGx5KCkpO1xuICAgICAgICB0aGlzLndyaXRlQ29uZmlnKHsgbm9SZWxvYWQ6IHRydWUgfSk7XG4gICAgfSxcblxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQmxlbmRUcmVlVmlldyhmYWxzZSk7XG4gICAgfVxufTtcbiJdfQ==
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/main.js
