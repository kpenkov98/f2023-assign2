function changeViews(viewId) {
        //hides views
        const views = document.querySelectorAll('.view');
        views.forEach(view => view.classList.remove('active-view'));

        //shows the selected view
        const selectedView = document.getElementById(viewId);
        if (selectedView) {
            selectedView.classList.add('active-view');
        }
    }
