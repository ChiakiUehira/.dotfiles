Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _tinycolor2 = require('tinycolor2');

var _tinycolor22 = _interopRequireDefault(_tinycolor2);

var _colorTemplates = require('./color-templates');

var _colorTemplates2 = _interopRequireDefault(_colorTemplates);

'use babel';
'use strict';

function toCamelCase(str) {
    return str.replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
    }).replace(/\s/g, '').replace(/^(.)/, function ($1) {
        return $1.toLowerCase();
    });
}

function apply() {

    atom.config.onDidChange('atom-material-ui.colors.accentColor', function () {
        return _main2['default'].writeConfig();
    });

    atom.config.onDidChange('atom-material-ui.colors.abaseColor', function (value) {
        var baseColor = (0, _tinycolor22['default'])(value.newValue.toRGBAString());

        if (atom.config.get('atom-material-ui.colors.genAccent')) {
            var accentColor = baseColor.complement().saturate(20).lighten(5);
            return atom.config.set('atom-material-ui.colors.accentColor', accentColor.toRgbString());
        }

        _main2['default'].writeConfig();
    });

    atom.config.onDidChange('atom-material-ui.colors.predefinedColor', function (value) {
        var newValue = toCamelCase(value.newValue);

        atom.config.set('atom-material-ui.colors.abaseColor', _colorTemplates2['default'][newValue].base);
        atom.config.set('atom-material-ui.colors.accentColor', _colorTemplates2['default'][newValue].accent);
    });
}

exports['default'] = {
    apply: apply
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL2xpYi9hbXUtY29sb3Itc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUdnQixRQUFROzs7OzBCQUNGLFlBQVk7Ozs7OEJBQ1AsbUJBQW1COzs7O0FBTDlDLFdBQVcsQ0FBQztBQUNaLFlBQVksQ0FBQzs7QUFNYixTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDdEIsV0FBTyxHQUFHLENBQ0wsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFTLEVBQUUsRUFBRTtBQUFFLGVBQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQUUsQ0FBQyxDQUM1RCxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUNsQixPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQUUsZUFBTyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7S0FBRSxDQUFDLENBQUM7Q0FDbkU7O0FBRUQsU0FBUyxLQUFLLEdBQUc7O0FBRWIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMscUNBQXFDLEVBQUU7ZUFBTSxrQkFBSSxXQUFXLEVBQUU7S0FBQSxDQUFDLENBQUM7O0FBRXhGLFFBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3JFLFlBQUksU0FBUyxHQUFHLDZCQUFVLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs7QUFFekQsWUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFO0FBQ3RELGdCQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM1Rjs7QUFFRCwwQkFBSSxXQUFXLEVBQUUsQ0FBQztLQUNyQixDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMseUNBQXlDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDMUUsWUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFM0MsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsNEJBQWUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckYsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsNEJBQWUsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0YsQ0FBQyxDQUFDO0NBQ047O3FCQUVjO0FBQ1gsU0FBSyxFQUFMLEtBQUs7Q0FDUiIsImZpbGUiOiIvVXNlcnMvaGFjby8uZG90ZmlsZXMvLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvYW11LWNvbG9yLXNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhbXUgZnJvbSAnLi9tYWluJztcbmltcG9ydCB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XG5pbXBvcnQgY29sb3JUZW1wbGF0ZXMgZnJvbSAnLi9jb2xvci10ZW1wbGF0ZXMnO1xuXG5mdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5yZXBsYWNlKC9cXHMoLikvZywgZnVuY3Rpb24oJDEpIHsgcmV0dXJuICQxLnRvVXBwZXJDYXNlKCk7IH0pXG4gICAgICAgIC5yZXBsYWNlKC9cXHMvZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9eKC4pLywgZnVuY3Rpb24oJDEpIHsgcmV0dXJuICQxLnRvTG93ZXJDYXNlKCk7IH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseSgpIHtcblxuICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hY2NlbnRDb2xvcicsICgpID0+IGFtdS53cml0ZUNvbmZpZygpKTtcblxuICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hYmFzZUNvbG9yJywgKHZhbHVlKSA9PiB7XG4gICAgICAgIHZhciBiYXNlQ29sb3IgPSB0aW55Y29sb3IodmFsdWUubmV3VmFsdWUudG9SR0JBU3RyaW5nKCkpO1xuXG4gICAgICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmdlbkFjY2VudCcpKSB7XG4gICAgICAgICAgICBsZXQgYWNjZW50Q29sb3IgPSBiYXNlQ29sb3IuY29tcGxlbWVudCgpLnNhdHVyYXRlKDIwKS5saWdodGVuKDUpO1xuICAgICAgICAgICAgcmV0dXJuIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWNjZW50Q29sb3InLCBhY2NlbnRDb2xvci50b1JnYlN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFtdS53cml0ZUNvbmZpZygpO1xuICAgIH0pO1xuXG4gICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLnByZWRlZmluZWRDb2xvcicsICh2YWx1ZSkgPT4ge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0b0NhbWVsQ2FzZSh2YWx1ZS5uZXdWYWx1ZSk7XG5cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hYmFzZUNvbG9yJywgY29sb3JUZW1wbGF0ZXNbbmV3VmFsdWVdLmJhc2UpO1xuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFjY2VudENvbG9yJywgY29sb3JUZW1wbGF0ZXNbbmV3VmFsdWVdLmFjY2VudCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcHBseVxufTtcbiJdfQ==
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/lib/amu-color-settings.js
