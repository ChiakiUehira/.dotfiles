(function() {
  var originalPackageConfig;

  originalPackageConfig = atom.config.get('auto-update-packages');

  window.restoreEnvironment = function() {
    return atom.config.set('auto-update-packages', originalPackageConfig);
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXV0by11cGRhdGUtcGFja2FnZXMvc3BlYy9zcGVjLWhlbHBlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscUJBQUE7O0FBQUEsRUFBQSxxQkFBQSxHQUF3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isc0JBQWhCLENBQXhCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsa0JBQVAsR0FBNEIsU0FBQSxHQUFBO1dBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixzQkFBaEIsRUFBd0MscUJBQXhDLEVBRDBCO0VBQUEsQ0FGNUIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/haco/.atom/packages/auto-update-packages/spec/spec-helper.coffee
