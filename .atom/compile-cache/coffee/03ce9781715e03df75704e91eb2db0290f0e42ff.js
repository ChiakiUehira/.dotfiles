(function() {
  module.exports = {
    config: {
      accentColor: {
        title: 'Accent color',
        description: 'Sets the accent color for the UI theme.',
        type: 'string',
        "default": 'Teal',
        "enum": ['Blue', 'Cyan', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow']
      },
      tabSize: {
        title: 'Tab bar size',
        description: 'Sets the height for the tab bar',
        type: 'string',
        "default": 'Normal',
        "enum": ['Small', 'Normal', 'Big']
      },
      useRoboto: {
        title: 'Use Roboto Mono font in text editors',
        type: 'boolean',
        "default": false
      },
      slimScrollbar: {
        title: 'Slim scrollbars',
        type: 'boolean',
        "default": false
      },
      disableAnimations: {
        title: 'Disable animations',
        description: 'Reduces visual distractions when switching tabs or giving focus to text fields.',
        type: 'boolean',
        "default": false
      },
      panelContrast: {
        title: 'Contrasting panels',
        description: 'Makes panels\' background darker. Applies to tabs, search & replace, tree-view, etc.',
        type: 'boolean',
        "default": false
      },
      depth: {
        title: 'Add depth',
        description: 'Adds a few shadows here and there to add depth to the UI.',
        type: 'boolean',
        "default": false
      },
      altCmdPalette: {
        title: 'Alternative command palette background',
        description: 'Use a syntax\' background color for the command palette and fuzzy finder.',
        type: 'boolean',
        "default": true
      },
      compactTreeView: {
        title: 'Compact Tree View',
        description: 'Reduces line-height in the tree view component.',
        type: 'boolean',
        "default": false
      },
      fontSize: {
        title: 'UI font size',
        description: 'Set the font size used through the user interface. It doesn\'t override the text editor font size setting.',
        type: 'string',
        "default": 'Regular',
        "enum": ['Small', 'Regular', 'Big', 'Huge']
      },
      showTabIcons: {
        title: 'Icons in tabs',
        description: 'Shows the file-type icon for focused tabs.',
        type: 'string',
        "default": 'Hide',
        "enum": ['Hide', 'Show on active tab', 'Show on all tabs']
      },
      rippleAccentColor: {
        title: 'Use accent color in tabs\' ripple effect',
        type: 'boolean',
        "default": false
      },
      useRobotoInUI: {
        title: 'Use Roboto font for UI',
        type: 'boolean',
        "default": false
      }
    },
    activate: function(state) {
      return atom.themes.onDidChangeActiveThemes(function() {
        var Config;
        Config = require('./config');
        return Config.apply();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvc2V0dGluZ3MuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxJQUFBLE1BQUEsRUFDSTtBQUFBLE1BQUEsV0FBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8sY0FBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLHlDQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sUUFGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLE1BSFQ7QUFBQSxRQUlBLE1BQUEsRUFBTSxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLE9BQWpCLEVBQTBCLFFBQTFCLEVBQW9DLE1BQXBDLEVBQTRDLFFBQTVDLEVBQXNELEtBQXRELEVBQTZELE1BQTdELEVBQXFFLE9BQXJFLEVBQThFLFFBQTlFLENBSk47T0FESjtBQUFBLE1BTUEsT0FBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8sY0FBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLGlDQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sUUFGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLFFBSFQ7QUFBQSxRQUlBLE1BQUEsRUFBTSxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLEtBQXBCLENBSk47T0FQSjtBQUFBLE1BWUEsU0FBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8sc0NBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxTQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsS0FGVDtPQWJKO0FBQUEsTUFnQkEsYUFBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8saUJBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxTQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsS0FGVDtPQWpCSjtBQUFBLE1Bb0JBLGlCQUFBLEVBQ0k7QUFBQSxRQUFBLEtBQUEsRUFBTyxvQkFBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLGlGQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLEtBSFQ7T0FyQko7QUFBQSxNQXlCQSxhQUFBLEVBQ0k7QUFBQSxRQUFBLEtBQUEsRUFBTyxvQkFBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLHNGQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLEtBSFQ7T0ExQko7QUFBQSxNQThCQSxLQUFBLEVBQ0k7QUFBQSxRQUFBLEtBQUEsRUFBTyxXQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsMkRBRGI7QUFBQSxRQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsUUFHQSxTQUFBLEVBQVMsS0FIVDtPQS9CSjtBQUFBLE1BbUNBLGFBQUEsRUFDSTtBQUFBLFFBQUEsS0FBQSxFQUFPLHdDQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsMkVBRGI7QUFBQSxRQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsUUFHQSxTQUFBLEVBQVMsSUFIVDtPQXBDSjtBQUFBLE1Bd0NBLGVBQUEsRUFDSTtBQUFBLFFBQUEsS0FBQSxFQUFPLG1CQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsaURBRGI7QUFBQSxRQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsUUFHQSxTQUFBLEVBQVMsS0FIVDtPQXpDSjtBQUFBLE1BNkNBLFFBQUEsRUFDSTtBQUFBLFFBQUEsS0FBQSxFQUFPLGNBQVA7QUFBQSxRQUNBLFdBQUEsRUFBYSw0R0FEYjtBQUFBLFFBRUEsSUFBQSxFQUFNLFFBRk47QUFBQSxRQUdBLFNBQUEsRUFBUyxTQUhUO0FBQUEsUUFJQSxNQUFBLEVBQU0sQ0FBQyxPQUFELEVBQVUsU0FBVixFQUFxQixLQUFyQixFQUE0QixNQUE1QixDQUpOO09BOUNKO0FBQUEsTUFtREEsWUFBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8sZUFBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLDRDQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sUUFGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLE1BSFQ7QUFBQSxRQUlBLE1BQUEsRUFBTSxDQUFDLE1BQUQsRUFBUyxvQkFBVCxFQUErQixrQkFBL0IsQ0FKTjtPQXBESjtBQUFBLE1BeURBLGlCQUFBLEVBQ0k7QUFBQSxRQUFBLEtBQUEsRUFBTywwQ0FBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BMURKO0FBQUEsTUE2REEsYUFBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8sd0JBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxTQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsS0FGVDtPQTlESjtLQURKO0FBQUEsSUFtRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBWixDQUFvQyxTQUFBLEdBQUE7QUFDaEMsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FBVCxDQUFBO2VBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBQSxFQUZnQztNQUFBLENBQXBDLEVBRE07SUFBQSxDQW5FVjtHQURKLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/haco/.atom/packages/atom-material-ui/lib/settings.coffee
