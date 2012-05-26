// Setup the namespace

var pullToReload = {

	refreshCapable: false,
	timeStarted: null,
	
	init: function () {
		// Inject the html onto the page
		$('body').prepend('<div id="pullToRefresh"><div class="wrap"><span class="icon">&nbsp;</span><div id="pullyText">Pull to refresh</div></div></div>');
		console.log('pull to reload init');
		$(window).bind('scroll', pullToReload.monitorScroll);
	},

	monitorScroll: function () {

		// Scrolling up has occured, but not enough to reload yet
		if (window.scrollY < 0 && window.scrollY > -40)
		{
			// Set the text to pull to refresh
			$("#pullToRefresh #pullyText").html("Pull to refresh");

			// Set the position of the pull down bar
			$("#pullToRefresh").css({ top: Math.abs(window.scrollY) - 40 });

			// Only set the time if we pull up and if the time is null
			if (pullToReload.refreshCapable === true && pullToReload.timeStarted === null) {
				// Set a date for scrolling back down the way
				pullToReload.timeStarted = new Date();
			}
		}
		
		// Reload threshold has passed
		if (window.scrollY <= -40)
		{
			// Set the text to release
			$("#pullToRefresh #pullyText").html("Release to refresh");

			// Set the position incase we scrolled too fast
			$("#pullToRefresh").css({ top: 0 });

			// Set refresh capable
			pullToReload.refreshCapable = true;

			// Wipe out the time
			pullToReload.timeStarted = null;
		}
		
		// We're back down below the page, let's see if we can reload
		if (window.scrollY >= 0 && pullToReload.refreshCapable === true)
		{
			if (pullToReload.timeStarted !== null) {
				// Check the time
				var nowTime = new Date(),
					diff = nowTime.getTime() - pullToReload.timeStarted.getTime();

				// If we have taken less than a second for the release, reload the page
				if (diff < 500) {
					pullToReload.reloadTheWeePageMate();
				}
			}
			else
			{
				// We haven't even got to set the time it was that fast, let's reload.
				pullToReload.reloadTheWeePageMate();
			}

			// Set the time back to null
			pullToReload.timeStarted = null;
		}

		if (window.scrollY >= 0)
		{
			// Set the position to completely hidden again
			$("#pullToRefresh").css({ top: -40 });
		}
		
	},

	reloadTheWeePageMate: function () {
		console.log("RELOADING");
	}

};

$(document).ready(pullToReload.init);