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

var _amuBindings = require('./amu-bindings');

var _amuBindings2 = _interopRequireDefault(_amuBindings);

'use babel';
'use strict';

var treeViews;

setImmediate(function () {
    treeViews = [document.querySelector('.tree-view-resizer'), document.querySelector('.remote-ftp-view'), (function () {
        if (document.querySelector('.nuclide-file-tree')) {
            return document.querySelector('.nuclide-file-tree').parentElement.parentElement;
        }
    })()];
});

var removeBlendingEl = function removeBlendingEl() {
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

    getContrast: function getContrast(color) {
        // Finds a contrasting text color
        var r = parseInt(color.substr(1, 2), 16);
        var g = parseInt(color.substr(3, 2), 16);
        var b = parseInt(color.substr(5, 2), 16);
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;

        if (yiq >= 220) {
            return 'desaturate(darken(' + color + ', 40%), 25%)';
        }
        if (yiq >= 190 && yiq < 220) {
            return 'desaturate(darken(' + color + ', 35%), 20%)';
        }
        if (yiq >= 130 && yiq < 190) {
            return 'desaturate(darken(' + color + ', 25%), 20%)';
        }
        if (yiq < 130) {
            return 'lighten(' + color + ', 60%)';
        }
    },

    toggleClass: function toggleClass(boolean, className) {
        var root = document.querySelector('atom-workspace');

        if (boolean) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    },

    writeConfig: function writeConfig(options) {
        var accentColor = atom.config.get('atom-material-ui.colors.accentColor').toHexString();
        var baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toHexString();
        var accentTextColor = this.getContrast(baseColor);
        var fontSize = atom.config.get('atom-material-ui.fonts.fontSize');

        /**
        * This is kind of against Airbnb's stylguide, but produces a much
        * better output and is readable.
        */
        var config = '@accent-color: ' + accentColor + ';\n' + ('@accent-text-color: ' + accentTextColor + ';\n') + ('@base-color: ' + baseColor + ';\n') + ':root {\n' + ('   font-size: ' + fontSize + 'px !important;\n') + '}\n';

        _fs2['default'].writeFile(__dirname + '/../styles/custom.less', config, 'utf8', function () {
            if (!options || !options.noReload) {
                var themePack = atom.packages.getLoadedPackage('atom-material-ui');

                themePack.deactivate();
                setImmediate(function () {
                    return themePack.activate();
                });
            }
            if (options && options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        });
    },

    toggleBlendTreeView: function toggleBlendTreeView(bool) {
        var _this = this;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFHZSxJQUFJOzs7OzRCQUNBLGlCQUFpQjs7OzsyQkFDWixnQkFBZ0I7Ozs7MkJBQ2hCLGdCQUFnQjs7OztBQU54QyxXQUFXLENBQUM7QUFDWixZQUFZLENBQUM7O0FBT2IsSUFBSSxTQUFTLENBQUM7O0FBRWQsWUFBWSxDQUFDLFlBQU07QUFDZixhQUFTLEdBQUcsQ0FDUixRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQzVDLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFDMUMsQ0FBQSxZQUFZO0FBQ1IsWUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDOUMsbUJBQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7U0FDbkY7S0FDSixDQUFBLEVBQUUsQ0FDTixDQUFDO0NBQ0wsQ0FBQyxDQUFDOztBQUVILElBQUksZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLEdBQWM7QUFDOUIsYUFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBSztBQUM1QixZQUFJLFFBQVEsRUFBRTtBQUNWLGdCQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUV2RCxnQkFBSSxVQUFVLEVBQUU7QUFDWix3QkFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNwQztTQUNKO0tBQ0osQ0FBQyxDQUFDO0NBQ04sQ0FBQzs7QUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFNO0FBQzlCLGdCQUFZLENBQUM7ZUFBTSx5QkFBWSxLQUFLLEVBQUU7S0FBQSxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDOztxQkFF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SUFBSSxDQUFDLENBQUM7eUJBQ1o7cUJBQ0o7aUJBQ0o7YUFDSixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTjs7QUFFRCxZQUFRLEVBQUEsb0JBQUc7QUFDUCxpQ0FBWSxLQUFLLEVBQUUsQ0FBQztBQUNwQixvQkFBWSxDQUFDO21CQUFNLHlCQUFZLEtBQUssRUFBRTtTQUFBLENBQUMsQ0FBQztBQUN4QyxZQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDeEM7O0FBRUQsY0FBVSxFQUFBLHNCQUFHO0FBQ1QsWUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0NBQ0oiLCJmaWxlIjoiL1VzZXJzL2hhY28vLmRvdGZpbGVzLy5hdG9tL3BhY2thZ2VzL2F0b20tbWF0ZXJpYWwtdWkvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWctc2NoZW1hJztcbmltcG9ydCBhbXVTZXR0aW5ncyBmcm9tICcuL2FtdS1zZXR0aW5ncyc7XG5pbXBvcnQgYW11QmluZGluZ3MgZnJvbSAnLi9hbXUtYmluZGluZ3MnO1xuXG52YXIgdHJlZVZpZXdzO1xuXG5zZXRJbW1lZGlhdGUoKCkgPT4ge1xuICAgIHRyZWVWaWV3cyA9IFtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyZWUtdmlldy1yZXNpemVyJyksXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZW1vdGUtZnRwLXZpZXcnKSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5udWNsaWRlLWZpbGUtdHJlZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5udWNsaWRlLWZpbGUtdHJlZScpLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgpXG4gICAgXTtcbn0pO1xuXG52YXIgcmVtb3ZlQmxlbmRpbmdFbCA9IGZ1bmN0aW9uKCkge1xuICAgIHRyZWVWaWV3cy5mb3JFYWNoKCh0cmVlVmlldykgPT4ge1xuICAgICAgICBpZiAodHJlZVZpZXcpIHtcbiAgICAgICAgICAgIHZhciBibGVuZGluZ0VsID0gdHJlZVZpZXcucXVlcnlTZWxlY3RvcignLnRhYkJsZW5kZXInKTtcblxuICAgICAgICAgICAgaWYgKGJsZW5kaW5nRWwpIHtcbiAgICAgICAgICAgICAgICB0cmVlVmlldy5yZW1vdmVDaGlsZChibGVuZGluZ0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuYXRvbS53b3Jrc3BhY2Uub25EaWRBZGRQYW5lKCgpID0+IHtcbiAgICBzZXRJbW1lZGlhdGUoKCkgPT4gYW11QmluZGluZ3MuYXBwbHkoKSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbmZpZyxcblxuICAgIGdldENvbnRyYXN0KGNvbG9yKSB7XG4gICAgICAgIC8vIEZpbmRzIGEgY29udHJhc3RpbmcgdGV4dCBjb2xvclxuICAgICAgICB2YXIgciA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cigxLCAyKSwgMTYpO1xuICAgICAgICB2YXIgZyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cigzLCAyKSwgMTYpO1xuICAgICAgICB2YXIgYiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cig1LCAyKSwgMTYpO1xuICAgICAgICB2YXIgeWlxID0gKChyICogMjk5KSArIChnICogNTg3KSArIChiICogMTE0KSkgLyAxMDAwO1xuXG4gICAgICAgIGlmICh5aXEgPj0gMjIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYGRlc2F0dXJhdGUoZGFya2VuKCR7Y29sb3J9LCA0MCUpLCAyNSUpYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeWlxID49IDE5MCAmJiB5aXEgPCAyMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgZGVzYXR1cmF0ZShkYXJrZW4oJHtjb2xvcn0sIDM1JSksIDIwJSlgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5aXEgPj0gMTMwICYmIHlpcSA8IDE5MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBkZXNhdHVyYXRlKGRhcmtlbigke2NvbG9yfSwgMjUlKSwgMjAlKWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHlpcSA8IDEzMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBsaWdodGVuKCR7Y29sb3J9LCA2MCUpYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0b2dnbGVDbGFzcyhib29sZWFuLCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhdG9tLXdvcmtzcGFjZScpO1xuXG4gICAgICAgIGlmIChib29sZWFuKSB7XG4gICAgICAgICAgICByb290LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHdyaXRlQ29uZmlnKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGFjY2VudENvbG9yID0gYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hY2NlbnRDb2xvcicpLnRvSGV4U3RyaW5nKCk7XG4gICAgICAgIHZhciBiYXNlQ29sb3IgPSBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFiYXNlQ29sb3InKS50b0hleFN0cmluZygpO1xuICAgICAgICB2YXIgYWNjZW50VGV4dENvbG9yID0gdGhpcy5nZXRDb250cmFzdChiYXNlQ29sb3IpO1xuICAgICAgICB2YXIgZm9udFNpemUgPSBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkuZm9udHMuZm9udFNpemUnKTtcblxuICAgICAgICAvKipcbiAgICAgICAgKiBUaGlzIGlzIGtpbmQgb2YgYWdhaW5zdCBBaXJibmIncyBzdHlsZ3VpZGUsIGJ1dCBwcm9kdWNlcyBhIG11Y2hcbiAgICAgICAgKiBiZXR0ZXIgb3V0cHV0IGFuZCBpcyByZWFkYWJsZS5cbiAgICAgICAgKi9cbiAgICAgICAgdmFyIGNvbmZpZyA9IGBAYWNjZW50LWNvbG9yOiAke2FjY2VudENvbG9yfTtcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgIGBAYWNjZW50LXRleHQtY29sb3I6ICR7YWNjZW50VGV4dENvbG9yfTtcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgIGBAYmFzZS1jb2xvcjogJHtiYXNlQ29sb3J9O1xcbmAgK1xuICAgICAgICAgICAgICAgICAgICAgYDpyb290IHtcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgIGAgICBmb250LXNpemU6ICR7Zm9udFNpemV9cHggIWltcG9ydGFudDtcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgIGB9XFxuYDtcblxuICAgICAgICBmcy53cml0ZUZpbGUoYCR7X19kaXJuYW1lfS8uLi9zdHlsZXMvY3VzdG9tLmxlc3NgLCBjb25maWcsICd1dGY4JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLm5vUmVsb2FkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoZW1lUGFjayA9IGF0b20ucGFja2FnZXMuZ2V0TG9hZGVkUGFja2FnZSgnYXRvbS1tYXRlcmlhbC11aScpO1xuXG4gICAgICAgICAgICAgICAgdGhlbWVQYWNrLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gdGhlbWVQYWNrLmFjdGl2YXRlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jYWxsYmFjayAmJiB0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHRvZ2dsZUJsZW5kVHJlZVZpZXcoYm9vbCkge1xuICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xuICAgICAgICAgICAgdHJlZVZpZXdzLmZvckVhY2goKHRyZWVWaWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBibGVuZGluZ0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgICAgICBibGVuZGluZ0VsLmNsYXNzTGlzdC5hZGQoJ3RhYkJsZW5kZXInKTtcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRpbmdFbC5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3ICYmIGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmVlVmlldy5xdWVyeVNlbGVjdG9yKCcudGFiQmxlbmRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQmxlbmRpbmdFbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZVZpZXcuaW5zZXJ0QmVmb3JlKGJsZW5kaW5nRWwsIHRyZWVWaWV3LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRyZWVWaWV3ICYmICFib29sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVCbGVuZGluZ0VsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRyZWVWaWV3ICYmIGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ3RyZWUtdmlldycpIHx8IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgnUmVtb3RlLUZUUCcpIHx8IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgnbnVjbGlkZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUJsZW5kVHJlZVZpZXcoYm9vbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiBhbXVCaW5kaW5ncy5hcHBseSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIGFtdVNldHRpbmdzLmFwcGx5KCk7XG4gICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiBhbXVCaW5kaW5ncy5hcHBseSgpKTtcbiAgICAgICAgdGhpcy53cml0ZUNvbmZpZyh7IG5vUmVsb2FkOiB0cnVlIH0pO1xuICAgIH0sXG5cbiAgICBkZWFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZUJsZW5kVHJlZVZpZXcoZmFsc2UpO1xuICAgIH1cbn07XG4iXX0=
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/main.js
