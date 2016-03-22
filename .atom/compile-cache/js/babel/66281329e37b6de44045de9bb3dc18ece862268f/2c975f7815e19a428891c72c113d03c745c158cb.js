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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFHZSxJQUFJOzs7OzRCQUNBLGlCQUFpQjs7OzsyQkFDWixnQkFBZ0I7Ozs7MkJBQ2hCLGdCQUFnQjs7OztBQU54QyxXQUFXLENBQUM7QUFDWixZQUFZLENBQUM7O0FBT2IsSUFBSSxTQUFTLENBQUM7O0FBRWQsSUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLEdBQWM7QUFDMUIsZ0JBQVksQ0FBQyxZQUFNO0FBQ2YsaUJBQVMsR0FBRyxDQUNSLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFDNUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUMxQyxDQUFBLFlBQVk7QUFDUixnQkFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDOUMsdUJBQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7YUFDbkY7U0FDSixDQUFBLEVBQUUsQ0FDTixDQUFDO0tBQ0wsQ0FBQyxDQUFDO0NBQ04sQ0FBQzs7QUFFRixJQUFJLGdCQUFnQixHQUFHLFNBQW5CLGdCQUFnQixHQUFjO0FBQzlCLGdCQUFZLEVBQUUsQ0FBQztBQUNmLGFBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRLEVBQUs7QUFDNUIsWUFBSSxRQUFRLEVBQUU7QUFDVixnQkFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFdkQsZ0JBQUksVUFBVSxFQUFFO0FBQ1osd0JBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDcEM7U0FDSjtLQUNKLENBQUMsQ0FBQztDQUNOLENBQUM7O0FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBTTtBQUM5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LENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsNENBQVksQ0FBQzsyQ0FBTSx5QkFBWSxLQUFLLEVBQUU7aUNBQUEsQ0FBQyxDQUFDOzZCQUMzQyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNaO3FCQUNKO2lCQUNKO2FBQ0osQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDO0tBQ047O0FBRUQsWUFBUSxFQUFBLG9CQUFHO0FBQ1AsaUNBQVksS0FBSyxFQUFFLENBQUM7QUFDcEIsb0JBQVksQ0FBQzttQkFBTSx5QkFBWSxLQUFLLEVBQUU7U0FBQSxDQUFDLENBQUM7QUFDeEMsWUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDOztBQUVELGNBQVUsRUFBQSxzQkFBRztBQUNULFlBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuQztDQUNKIiwiZmlsZSI6Ii9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnLXNjaGVtYSc7XG5pbXBvcnQgYW11U2V0dGluZ3MgZnJvbSAnLi9hbXUtc2V0dGluZ3MnO1xuaW1wb3J0IGFtdUJpbmRpbmdzIGZyb20gJy4vYW11LWJpbmRpbmdzJztcblxudmFyIHRyZWVWaWV3cztcblxudmFyIHNldFRyZWVWaWV3cyA9IGZ1bmN0aW9uKCkge1xuICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICAgIHRyZWVWaWV3cyA9IFtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmVlLXZpZXctcmVzaXplcicpLFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlbW90ZS1mdHAtdmlldycpLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubnVjbGlkZS1maWxlLXRyZWUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm51Y2xpZGUtZmlsZS10cmVlJykucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0oKVxuICAgICAgICBdO1xuICAgIH0pO1xufTtcblxudmFyIHJlbW92ZUJsZW5kaW5nRWwgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRUcmVlVmlld3MoKTtcbiAgICB0cmVlVmlld3MuZm9yRWFjaCgodHJlZVZpZXcpID0+IHtcbiAgICAgICAgaWYgKHRyZWVWaWV3KSB7XG4gICAgICAgICAgICB2YXIgYmxlbmRpbmdFbCA9IHRyZWVWaWV3LnF1ZXJ5U2VsZWN0b3IoJy50YWJCbGVuZGVyJyk7XG5cbiAgICAgICAgICAgIGlmIChibGVuZGluZ0VsKSB7XG4gICAgICAgICAgICAgICAgdHJlZVZpZXcucmVtb3ZlQ2hpbGQoYmxlbmRpbmdFbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmF0b20ud29ya3NwYWNlLm9uRGlkQWRkUGFuZSgoKSA9PiB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IGFtdUJpbmRpbmdzLmFwcGx5KCkpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWcsXG5cbiAgICBnZXRDb250cmFzdChjb2xvcikge1xuICAgICAgICAvLyBGaW5kcyBhIGNvbnRyYXN0aW5nIHRleHQgY29sb3JcbiAgICAgICAgdmFyIHIgPSBwYXJzZUludChjb2xvci5zdWJzdHIoMSwgMiksIDE2KTtcbiAgICAgICAgdmFyIGcgPSBwYXJzZUludChjb2xvci5zdWJzdHIoMywgMiksIDE2KTtcbiAgICAgICAgdmFyIGIgPSBwYXJzZUludChjb2xvci5zdWJzdHIoNSwgMiksIDE2KTtcbiAgICAgICAgdmFyIHlpcSA9ICgociAqIDI5OSkgKyAoZyAqIDU4NykgKyAoYiAqIDExNCkpIC8gMTAwMDtcblxuICAgICAgICBpZiAoeWlxID49IDIyMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBkZXNhdHVyYXRlKGRhcmtlbigke2NvbG9yfSwgNDAlKSwgMjUlKWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHlpcSA+PSAxOTAgJiYgeWlxIDwgMjIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYGRlc2F0dXJhdGUoZGFya2VuKCR7Y29sb3J9LCAzNSUpLCAyMCUpYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeWlxID49IDEzMCAmJiB5aXEgPCAxOTApIHtcbiAgICAgICAgICAgIHJldHVybiBgZGVzYXR1cmF0ZShkYXJrZW4oJHtjb2xvcn0sIDI1JSksIDIwJSlgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5aXEgPCAxMzApIHtcbiAgICAgICAgICAgIHJldHVybiBgbGlnaHRlbigke2NvbG9yfSwgNjAlKWA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlQ2xhc3MoYm9vbGVhbiwgY2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXRvbS13b3Jrc3BhY2UnKTtcblxuICAgICAgICBpZiAoYm9vbGVhbikge1xuICAgICAgICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB3cml0ZUNvbmZpZyhvcHRpb25zKSB7XG4gICAgICAgIHZhciBhY2NlbnRDb2xvciA9IGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWNjZW50Q29sb3InKS50b0hleFN0cmluZygpO1xuICAgICAgICB2YXIgYmFzZUNvbG9yID0gYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hYmFzZUNvbG9yJykudG9IZXhTdHJpbmcoKTtcbiAgICAgICAgdmFyIGFjY2VudFRleHRDb2xvciA9IHRoaXMuZ2V0Q29udHJhc3QoYmFzZUNvbG9yKTtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gYXRvbS5jb25maWcuZ2V0KCdhdG9tLW1hdGVyaWFsLXVpLmZvbnRzLmZvbnRTaXplJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogVGhpcyBpcyBraW5kIG9mIGFnYWluc3QgQWlyYm5iJ3Mgc3R5bGd1aWRlLCBidXQgcHJvZHVjZXMgYSBtdWNoXG4gICAgICAgICogYmV0dGVyIG91dHB1dCBhbmQgaXMgcmVhZGFibGUuXG4gICAgICAgICovXG4gICAgICAgIHZhciBjb25maWcgPSBgQGFjY2VudC1jb2xvcjogJHthY2NlbnRDb2xvcn07XFxuYCArXG4gICAgICAgICAgICAgICAgICAgICBgQGFjY2VudC10ZXh0LWNvbG9yOiAke2FjY2VudFRleHRDb2xvcn07XFxuYCArXG4gICAgICAgICAgICAgICAgICAgICBgQGJhc2UtY29sb3I6ICR7YmFzZUNvbG9yfTtcXG5gO1xuXG4gICAgICAgIGZzLndyaXRlRmlsZShgJHtfX2Rpcm5hbWV9Ly4uL3N0eWxlcy9jdXN0b20ubGVzc2AsIGNvbmZpZywgJ3V0ZjgnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMubm9SZWxvYWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhlbWVQYWNrID0gYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKCdhdG9tLW1hdGVyaWFsLXVpJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lUGFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGVtZVBhY2suZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gdGhlbWVQYWNrLmFjdGl2YXRlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVCbGVuZFRyZWVWaWV3KGJvb2wpIHtcbiAgICAgICAgc2V0VHJlZVZpZXdzKCk7XG4gICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICB0cmVlVmlld3MuZm9yRWFjaCgodHJlZVZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHJlZVZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsZW5kaW5nRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kaW5nRWwuY2xhc3NMaXN0LmFkZCgndGFiQmxlbmRlcicpO1xuICAgICAgICAgICAgICAgICAgICBibGVuZGluZ0VsLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJlZVZpZXcgJiYgYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3LnF1ZXJ5U2VsZWN0b3IoJy50YWJCbGVuZGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVCbGVuZGluZ0VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlVmlldy5pbnNlcnRCZWZvcmUoYmxlbmRpbmdFbCwgdHJlZVZpZXcuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJlZVZpZXcgJiYgIWJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUJsZW5kaW5nRWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdHJlZVZpZXcgJiYgYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgndHJlZS12aWV3JykgfHwgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCdSZW1vdGUtRlRQJykgfHwgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCdudWNsaWRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlQmxlbmRUcmVlVmlldyhib29sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGFtdUJpbmRpbmdzLmFwcGx5KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgYW11U2V0dGluZ3MuYXBwbHkoKTtcbiAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGFtdUJpbmRpbmdzLmFwcGx5KCkpO1xuICAgICAgICB0aGlzLndyaXRlQ29uZmlnKHsgbm9SZWxvYWQ6IHRydWUgfSk7XG4gICAgfSxcblxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQmxlbmRUcmVlVmlldyhmYWxzZSk7XG4gICAgfVxufTtcbiJdfQ==
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/main.js
