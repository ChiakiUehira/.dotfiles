'use babel';
'use strict';

var _this = this;

describe('AMU tree-view options', function () {
    beforeEach(function () {
        waitsForPromise('Theme Activation', function () {
            return atom.packages.activatePackage('atom-material-ui');
        });
        waitsForPromise('tree-view activation', function () {
            return atom.packages.activatePackage('tree-view');
        });

        _this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(_this.workspace);
    });

    it('should be able to toggle compact tree view items', function () {
        atom.config.set('atom-material-ui.treeView.compactList', false);
        expect(_this.workspace.classList.contains('compact-tree-view')).toBe(false);

        atom.config.set('atom-material-ui.treeView.compactList', true);
        expect(_this.workspace.classList.contains('compact-tree-view')).toBe(true);
    });

    // FIXME: Should pass this test.
    // it('should be able to blend with tab-bar', () => {
    //     atom.config.set('atom-material-ui.treeView.blendTabs', false);
    //     expect(document.querySelector('.tabBlender')).toBe(null);
    //
    //     atom.config.set('atom-material-ui.treeView.blendTabs', true);
    //     expect(document.querySelector('.tabBlender')).not.toBe(null);
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWNvLy5kb3RmaWxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLW1hdGVyaWFsLXVpL3NwZWMvc2V0dGluZ3MtdHJlZXZpZXctc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7QUFDWixZQUFZLENBQUM7Ozs7QUFFYixRQUFRLENBQUMsdUJBQXVCLEVBQUUsWUFBTTtBQUNwQyxjQUFVLENBQUMsWUFBTTtBQUNiLHVCQUFlLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtBQUN0QyxtQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzVELENBQUMsQ0FBQztBQUNILHVCQUFlLENBQUMsc0JBQXNCLEVBQUUsWUFBTTtBQUMxQyxtQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyRCxDQUFDLENBQUM7O0FBRUgsY0FBSyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BELGVBQU8sQ0FBQyxXQUFXLENBQUMsTUFBSyxTQUFTLENBQUMsQ0FBQztLQUN2QyxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLGtEQUFrRCxFQUFFLFlBQU07QUFDekQsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDaEUsY0FBTSxDQUFDLE1BQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFM0UsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0QsY0FBTSxDQUFDLE1BQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3RSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FVTixDQUFDLENBQUMiLCJmaWxlIjoiL1VzZXJzL2hhY28vLmRvdGZpbGVzLy5hdG9tL3BhY2thZ2VzL2F0b20tbWF0ZXJpYWwtdWkvc3BlYy9zZXR0aW5ncy10cmVldmlldy1zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4ndXNlIHN0cmljdCc7XG5cbmRlc2NyaWJlKCdBTVUgdHJlZS12aWV3IG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSgnVGhlbWUgQWN0aXZhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnYXRvbS1tYXRlcmlhbC11aScpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2FpdHNGb3JQcm9taXNlKCd0cmVlLXZpZXcgYWN0aXZhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgndHJlZS12aWV3Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMud29ya3NwYWNlID0gYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKTtcbiAgICAgICAgamFzbWluZS5hdHRhY2hUb0RPTSh0aGlzLndvcmtzcGFjZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdG9nZ2xlIGNvbXBhY3QgdHJlZSB2aWV3IGl0ZW1zJywgKCkgPT4ge1xuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuY29tcGFjdExpc3QnLCBmYWxzZSk7XG4gICAgICAgIGV4cGVjdCh0aGlzLndvcmtzcGFjZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBhY3QtdHJlZS12aWV3JykpLnRvQmUoZmFsc2UpO1xuXG4gICAgICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5jb21wYWN0TGlzdCcsIHRydWUpO1xuICAgICAgICBleHBlY3QodGhpcy53b3Jrc3BhY2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb21wYWN0LXRyZWUtdmlldycpKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgLy8gRklYTUU6IFNob3VsZCBwYXNzIHRoaXMgdGVzdC5cbiAgICAvLyBpdCgnc2hvdWxkIGJlIGFibGUgdG8gYmxlbmQgd2l0aCB0YWItYmFyJywgKCkgPT4ge1xuICAgIC8vICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJywgZmFsc2UpO1xuICAgIC8vICAgICBleHBlY3QoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYkJsZW5kZXInKSkudG9CZShudWxsKTtcbiAgICAvL1xuICAgIC8vICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkudHJlZVZpZXcuYmxlbmRUYWJzJywgdHJ1ZSk7XG4gICAgLy8gICAgIGV4cGVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiQmxlbmRlcicpKS5ub3QudG9CZShudWxsKTtcbiAgICAvLyB9KTtcbn0pO1xuIl19
//# sourceURL=/Users/haco/.dotfiles/.atom/packages/atom-material-ui/spec/settings-treeview-spec.js
