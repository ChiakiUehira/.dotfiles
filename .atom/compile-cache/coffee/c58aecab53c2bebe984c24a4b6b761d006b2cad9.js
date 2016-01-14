(function() {
  module.exports = {
    apply: function() {
      var root, tabs;
      root = document.documentElement;
      tabs = document.querySelector('.tab-bar');
      return tabs.addEventListener('click', function(event) {
        var ink, rect, tab, x, y;
        tab = event.target;
        if (tab && tab.nodeName === 'LI') {
          rect = tab.getBoundingClientRect();
          x = event.clientX - rect.left;
          y = event.clientY - rect.top;
          if (tab.querySelectorAll('.ink').length === 0) {
            ink = document.createElement('span');
            ink.classList.add('ink');
            tab.appendChild(ink);
          }
          ink = tab.querySelector('.ink');
          ink.style.left = x + 'px';
          return ink.style.top = y + 'px';
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2hhY28vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvYmluZGluZ3MuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxJQUFBLEtBQUEsRUFBTyxTQUFBLEdBQUE7QUFDSCxVQUFBLFVBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxRQUFRLENBQUMsZUFBaEIsQ0FBQTtBQUFBLE1BQ0EsSUFBQSxHQUFPLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBRFAsQ0FBQTthQUdBLElBQUksQ0FBQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixTQUFDLEtBQUQsR0FBQTtBQUMzQixZQUFBLG9CQUFBO0FBQUEsUUFBQSxHQUFBLEdBQU0sS0FBSyxDQUFDLE1BQVosQ0FBQTtBQUVBLFFBQUEsSUFBSSxHQUFBLElBQU8sR0FBRyxDQUFDLFFBQUosS0FBZ0IsSUFBM0I7QUFDSSxVQUFBLElBQUEsR0FBTyxHQUFHLENBQUMscUJBQUosQ0FBQSxDQUFQLENBQUE7QUFBQSxVQUNBLENBQUEsR0FBSSxLQUFLLENBQUMsT0FBTixHQUFnQixJQUFJLENBQUMsSUFEekIsQ0FBQTtBQUFBLFVBRUEsQ0FBQSxHQUFJLEtBQUssQ0FBQyxPQUFOLEdBQWdCLElBQUksQ0FBQyxHQUZ6QixDQUFBO0FBSUEsVUFBQSxJQUFJLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixNQUFyQixDQUE0QixDQUFDLE1BQTdCLEtBQXVDLENBQTNDO0FBQ0ksWUFBQSxHQUFBLEdBQU0sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBTixDQUFBO0FBQUEsWUFDQSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQWQsQ0FBa0IsS0FBbEIsQ0FEQSxDQUFBO0FBQUEsWUFFQSxHQUFHLENBQUMsV0FBSixDQUFnQixHQUFoQixDQUZBLENBREo7V0FKQTtBQUFBLFVBU0EsR0FBQSxHQUFNLEdBQUcsQ0FBQyxhQUFKLENBQWtCLE1BQWxCLENBVE4sQ0FBQTtBQUFBLFVBVUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFWLEdBQWlCLENBQUEsR0FBSSxJQVZyQixDQUFBO2lCQVdBLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBVixHQUFnQixDQUFBLEdBQUksS0FaeEI7U0FIMkI7TUFBQSxDQUEvQixFQUpHO0lBQUEsQ0FBUDtHQURKLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/haco/.atom/packages/atom-material-ui/lib/bindings.coffee
