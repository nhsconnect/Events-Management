
$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $(window).height();
    //console.log (h);
    if (h > 800) {
        $( "#mysidebar" ).attr("class", "nav affix");
    }
    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    /**
     * AnchorJS
     */
    anchors.add('h2,h3,h4,h5');


	// Handle Tab Panel Functionality -------------------------------------------------------------------------------------------------------------------
	
	// Add OnClick to tabPanelHeaders used in event messages pages for diagrams to toggle the visible tab body
	$(".tabPanel .tabHeadings .tabHeading").click(function() {  
		toggleTabPanel( $(this).attr("id") ); 
	});
	// Set first tabs to visible
	toggleTabPanel($(".tabPanel .tabHeadings .tabHeading").first().attr("id"));

});

function toggleTabPanel(panelID) {
	// Clear all panels
	$(".tabBodies .tabBody").css("display","none");
	
	// Set the selected one as visible
	var panelBodyID = "#" + panelID + "Body";
	$(panelBodyID).css("display", "block");
	
	// Set the tab header to selected
	$(".tabPanel .tabHeadings .tabHeading").removeClass("tabActive");
	$("#" + panelID).addClass("tabActive");
};

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });
});

function handleClick(checkbox, imageID) {
	if (checkbox.checked) {
		$("#"+imageID).css("display", "block");
	} else {
		$("#"+imageID).css("display", "none");
	}
}