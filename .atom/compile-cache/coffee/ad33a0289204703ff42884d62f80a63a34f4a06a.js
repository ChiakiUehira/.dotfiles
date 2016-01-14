(function() {
  var Ps, rippleClick;

  Ps = require('perfect-scrollbar');

  rippleClick = function(event) {
    var ink, item, rect, x, y;
    item = event.target;
    if (item) {
      rect = item.getBoundingClientRect();
      x = (event.clientX || 80) - rect.left;
      y = (event.clientY || 24) - rect.top;
      if (item.querySelectorAll('.ink').length === 0) {
        ink = document.createElement('span');
        ink.classList.add('ink');
        item.appendChild(ink);
      }
      ink = item.querySelector('.ink');
      ink.style.left = x + 'px';
      return ink.style.top = y + 'px';
    }
  };

  module.exports = {
    apply: function() {
      var atomWorkspace, tabs, treeView;
      tabs = document.querySelector('.tab-bar');
      treeView = document.querySelector('.tree-view-scroller');
      atomWorkspace = document.querySelector('atom-workspace');
      tabs.addEventListener('click', function(event) {
        return rippleClick(event);
      });
      if (treeView) {
        treeView.addEventListener('scroll', function(event) {
          var projectRoot, scrollPosX, scrollPosY;
          scrollPosY = treeView.scrollTop;
          scrollPosX = treeView.scrollLeft;
          projectRoot = document.querySelector('.project-root > .header');
          return projectRoot.style.transform = 'translate(' + scrollPosX + 'px,' + scrollPosY + 'px)';
        });
        treeView.addEventListener('click', function() {
          if (atomWorkspace.classList.contains('scrollbars-visible-always')) {
            return setTimeout(function() {
              return Ps.update(treeView);
            }, 0);
          }
        });
      }
      atom.workspace.onDidChangeActivePaneItem(function() {
        var activeTab, tabBar;
        tabBar = document.querySelector('.tab-bar');
        activeTab = document.querySelector('.tab-bar .tab.active');
        if (activeTab && activeTab.click) {
          return activeTab.click();
        }
      });
      if (treeView && atomWorkspace.classList.contains('scrollbars-visible-always')) {
        Ps.initialize(treeView);
      }
      window.addEventListener('resize', function() {
        if (treeView && atomWorkspace.classList.contains('scrollbars-visible-always')) {
          return setTimeout(function() {
            return Ps.update(treeView);
          }, 0);
        }
      });
      if (treeView) {
        return document.querySelector('.project-root > .header').style.transform = 'translateY(' + treeView.scrollTop + 'px)';
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvYmluZGluZ3MuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGVBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLG1CQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUVBLFdBQUEsR0FBYyxTQUFDLEtBQUQsR0FBQTtBQUNWLFFBQUEscUJBQUE7QUFBQSxJQUFBLElBQUEsR0FBTyxLQUFLLENBQUMsTUFBYixDQUFBO0FBRUEsSUFBQSxJQUFJLElBQUo7QUFDSSxNQUFBLElBQUEsR0FBTyxJQUFJLENBQUMscUJBQUwsQ0FBQSxDQUFQLENBQUE7QUFBQSxNQUNBLENBQUEsR0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFOLElBQWlCLEVBQWxCLENBQUEsR0FBd0IsSUFBSSxDQUFDLElBRGpDLENBQUE7QUFBQSxNQUVBLENBQUEsR0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFOLElBQWlCLEVBQWxCLENBQUEsR0FBd0IsSUFBSSxDQUFDLEdBRmpDLENBQUE7QUFJQSxNQUFBLElBQUksSUFBSSxDQUFDLGdCQUFMLENBQXNCLE1BQXRCLENBQTZCLENBQUMsTUFBOUIsS0FBd0MsQ0FBNUM7QUFDSSxRQUFBLEdBQUEsR0FBTSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixDQUFOLENBQUE7QUFBQSxRQUNBLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBZCxDQUFrQixLQUFsQixDQURBLENBQUE7QUFBQSxRQUVBLElBQUksQ0FBQyxXQUFMLENBQWlCLEdBQWpCLENBRkEsQ0FESjtPQUpBO0FBQUEsTUFTQSxHQUFBLEdBQU0sSUFBSSxDQUFDLGFBQUwsQ0FBbUIsTUFBbkIsQ0FUTixDQUFBO0FBQUEsTUFVQSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQVYs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

//# sourceURL=/Users/haco/.atom/packages/atom-material-ui/lib/bindings.coffee
