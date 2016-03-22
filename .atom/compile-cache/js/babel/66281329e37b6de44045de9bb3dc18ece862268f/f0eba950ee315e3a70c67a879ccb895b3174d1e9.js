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

'use babel';
'use strict';

var treeViews;

var setTreeViews = function setTreeViews() {
    setImmediate(function () {
        treeViews = [document.querySelector('.tree-view-resizer'), document.querySelector('.remote-ftp-view'), (function () {
            if (document.querySelector('.nuclide-file-tree')) {
                return document.querySelector('.nuclide-file-tree').parentElement.parentElement;
            }
        })()];
    });
};

var removeBlendingEl = function removeBlendingEl() {
    setTreeViews();
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

        console.log(luminance);

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

        setTreeViews();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFHZSxJQUFJOzs7OzRCQUNBLGlCQUFpQjs7OzsyQkFDWixnQkFBZ0I7Ozs7Z0NBQ1gsc0JBQXNCOzs7OzJCQUMzQixnQkFBZ0I7Ozs7MEJBQ2xCLFlBQVk7Ozs7QUFSbEMsV0FBVyxDQUFDO0FBQ1osWUFBWSxDQUFDOztBQVNiLElBQUksU0FBUyxDQUFDOztBQUVkLElBQUksWUFBWSxHQUFHLFNBQWYsWUFBWSxHQUFjO0FBQzFCLGdCQUFZLENBQUMsWUFBTTtBQUNmLGlCQUFTLEdBQUcsQ0FDUixRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQzVDLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFDMUMsQ0FBQSxZQUFZO0FBQ1IsZ0JBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO0FBQzlDLHVCQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO2FBQ25GO1NBQ0osQ0FBQSxFQUFFLENBQ04sQ0FBQztLQUNMLENBQUMsQ0FBQztDQUNOLENBQUM7O0FBRUYsSUFBSSxnQkFBZ0IsR0FBRyxTQUFuQixnQkFBZ0IsR0FBYztBQUM5QixnQkFBWSxFQUFFLENBQUM7QUFDZixhQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFLO0FBQzVCLFlBQUksUUFBUSxFQUFFO0FBQ1YsZ0JBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7O0FBRXZELGdCQUFJLFVBQVUsRUFBRTtBQUNaLHdCQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0o7S0FDSixDQUFDLENBQUM7Q0FDTixDQUFDOztBQUVGLElBQUksQ0FB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by8uZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZy1zY2hlbWEnO1xuaW1wb3J0IGFtdVNldHRpbmdzIGZyb20gJy4vYW11LXNldHRpbmdzJztcbmltcG9ydCBhbXVDb2xvclNldHRpbmdzIGZyb20gJy4vYW11LWNvbG9yLXNldHRpbmdzJztcbmltcG9ydCBhbXVCaW5kaW5ncyBmcm9tICcuL2FtdS1iaW5kaW5ncyc7XG5pbXBvcnQgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xuXG52YXIgdHJlZVZpZXdzO1xuXG52YXIgc2V0VHJlZVZpZXdzID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgdHJlZVZpZXdzID0gW1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyZWUtdmlldy1yZXNpemVyJyksXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVtb3RlLWZ0cC12aWV3JyksXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5udWNsaWRlLWZpbGUtdHJlZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubnVjbGlkZS1maWxlLXRyZWUnKS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSgpXG4gICAgICAgIF07XG4gICAgfSk7XG59O1xuXG52YXIgcmVtb3ZlQmxlbmRpbmdFbCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldFRyZWVWaWV3cygpO1xuICAgIHRyZWVWaWV3cy5mb3JFYWNoKCh0cmVlVmlldykgPT4ge1xuICAgICAgICBpZiAodHJlZVZpZXcpIHtcbiAgICAgICAgICAgIHZhciBibGVuZGluZ0VsID0gdHJlZVZpZXcucXVlcnlTZWxlY3RvcignLnRhYkJsZW5kZXInKTtcblxuICAgICAgICAgICAgaWYgKGJsZW5kaW5nRWwpIHtcbiAgICAgICAgICAgICAgICB0cmVlVmlldy5yZW1vdmVDaGlsZChibGVuZGluZ0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuYXRvbS53b3Jrc3BhY2Uub25EaWRBZGRQYW5lKCgpID0+IHtcbiAgICBzZXRJbW1lZGlhdGUoKCkgPT4gYW11QmluZGluZ3MuYXBwbHkoKSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbmZpZyxcblxuICAgIHRvZ2dsZUNsYXNzKGJvb2xlYW4sIGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2F0b20td29ya3NwYWNlJyk7XG5cbiAgICAgICAgaWYgKGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgd3JpdGVDb25maWcob3B0aW9ucykge1xuICAgICAgICB2YXIgYWNjZW50Q29sb3IgPSBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFjY2VudENvbG9yJykudG9SR0JBU3RyaW5nKCk7XG4gICAgICAgIHZhciBiYXNlQ29sb3IgPSBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFiYXNlQ29sb3InKS50b1JHQkFTdHJpbmcoKTtcbiAgICAgICAgdmFyIGFjY2VudFRleHRDb2xvciA9ICcjNjY2JztcbiAgICAgICAgdmFyIGx1bWluYW5jZSA9IHRpbnljb2xvcihiYXNlQ29sb3IpLmdldEx1bWluYW5jZSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGx1bWluYW5jZSk7XG5cbiAgICAgICAgaWYgKGx1bWluYW5jZSA8PSAwLjMgJiYgbHVtaW5hbmNlID4gMC4yMikge1xuICAgICAgICAgICAgYWNjZW50VGV4dENvbG9yID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC45KSc7XG4gICAgICAgIH0gZWxzZSBpZiAobHVtaW5hbmNlIDw9IDAuMjIpIHtcbiAgICAgICAgICAgIGFjY2VudFRleHRDb2xvciA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOCknO1xuICAgICAgICB9IGVsc2UgaWYgKGx1bWluYW5jZSA+IDAuMykge1xuICAgICAgICAgICAgYWNjZW50VGV4dENvbG9yID0gJ3JnYmEoMCwwLDAsMC42KSc7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiBUaGlzIGlzIGtpbmQgb2YgYWdhaW5zdCBBaXJibmIncyBzdHlsZ3VpZGUsIGJ1dCBwcm9kdWNlcyBhIG11Y2hcbiAgICAgICAgKiBiZXR0ZXIgb3V0cHV0IGFuZCBpcyByZWFkYWJsZS5cbiAgICAgICAgKi9cbiAgICAgICAgdmFyIGNvbmZpZyA9IGBAYWNjZW50LWNvbG9yOiAke2FjY2VudENvbG9yfTtcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgIGBAYWNjZW50LXRleHQtY29sb3I6ICR7YWNjZW50VGV4dENvbG9yfTtcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgIGBAYmFzZS1jb2xvcjogJHtiYXNlQ29sb3J9O1xcbmA7XG5cbiAgICAgICAgZnMud3JpdGVGaWxlKGAke19fZGlybmFtZX0vLi4vc3R5bGVzL2N1c3RvbS5sZXNzYCwgY29uZmlnLCAndXRmOCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5ub1JlbG9hZCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGVtZVBhY2sgPSBhdG9tLnBhY2thZ2VzLmdldExvYWRlZFBhY2thZ2UoJ2F0b20tbWF0ZXJpYWwtdWknKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGVtZVBhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVQYWNrLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IHRoZW1lUGFjay5hY3RpdmF0ZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNhbGxiYWNrICYmIHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlQmxlbmRUcmVlVmlldyhib29sKSB7XG4gICAgICAgIHNldFRyZWVWaWV3cygpO1xuICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xuICAgICAgICAgICAgdHJlZVZpZXdzLmZvckVhY2goKHRyZWVWaWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBibGVuZGluZ0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgICAgICBibGVuZGluZ0VsLmNsYXNzTGlzdC5hZGQoJ3RhYkJsZW5kZXInKTtcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRpbmdFbC5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3ICYmIGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmVlVmlldy5xdWVyeVNlbGVjdG9yKCcudGFiQmxlbmRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQmxlbmRpbmdFbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZVZpZXcuaW5zZXJ0QmVmb3JlKGJsZW5kaW5nRWwsIHRyZWVWaWV3LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRyZWVWaWV3ICYmICFib29sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVCbGVuZGluZ0VsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRyZWVWaWV3ICYmIGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ3RyZWUtdmlldycpIHx8IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgnUmVtb3RlLUZUUCcpIHx8IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgnbnVjbGlkZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUJsZW5kVHJlZVZpZXcoYm9vbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiBhbXVCaW5kaW5ncy5hcHBseSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIGFtdVNldHRpbmdzLmFwcGx5KCk7XG4gICAgICAgIGFtdUNvbG9yU2V0dGluZ3MuYXBwbHkoKTtcbiAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGFtdUJpbmRpbmdzLmFwcGx5KCkpO1xuICAgICAgICB0aGlzLndyaXRlQ29uZmlnKHsgbm9SZWxvYWQ6IHRydWUgfSk7XG4gICAgfSxcblxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQmxlbmRUcmVlVmlldyhmYWxzZSk7XG4gICAgfVxufTtcbiJdfQ==
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/main.js
