jQuery(function($){
    var overlay = $('<div>').addClass('loading overlay');
    
    $('.pagination-control').find('a').live('click', function(){	
		var clickedDepartment = $("#clickedDepartment").val();
    	var container = $('#paged-data-container-'+clickedDepartment);
    	
        var href = this.href;
        var pos = this.rel == 'next' ? '-120%' : '120%';
        if (Modernizr.history) {
            history.pushState(location.pathname, '', href);
        }
        
        container.find('.data').animate(
        	{
	            opacity: 0,
	            left: pos,
        	}, 
        	"slow", 
        	'swing', 
        	function() {
        	  var dataContainer = container.find('.paged-data').addClass('loading');
              $.get(
              	href,
              	{ format: 'html' }, 
              	function(data){
  	            	/**
  	            	 * @author Zakaria Moukit
  	            	 */
  	            	data = $(data).find('#paged-data-container-'+clickedDepartment).html();
  	            	
  	                dataContainer.removeClass('loading');
  	                container.html(data);
  	                
  	                makePatientDraggable();
              	}, 'html'
              );
          });
        
        return false;
    });
    
    var initialPath = location.pathname;
    
    $(window).bind('popstate', function(e){
    	container = $('#paged-data-container');
        // Prevent popstate handler dealing with initial page load
        if (location.pathname == initialPath) {
            initialPath = null;
            return;
        }
        container.append(overlay);
        $.get(location.pathname, { format: 'html' }, function(data){
            container.html(data);
        }, 'html');
    });
});