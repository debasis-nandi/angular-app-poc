$(document).ready(function () {
    //for (let i = 0; i < 10; i++) {
    //    $('body').on("click", "#filter" + i, function () {

    //        $(".toggleFilter"+i).slideToggle(300);
    //    });

    //    $('body').on("click", "#filterSubmit" + i, function () {
    //        var container = $(".toggleFilter"+i);
    //        container.hide();
    //    });
    //    $(document).mouseup(function (e) {

    //        var container = $(".toggleFilter" + i);
    //        if (!container.is(e.target) && container.has(e.target).length === 0) {
    //            container.hide();
    //        }
    //    });

    //}

    

    
    



    $("body" ).on('click','.dropdown-submenu',function(event) {
        event.stopPropagation();
        $( this ).closest("ul").find(".dropdown-submenu").removeClass('open');
        $(this).addClass('open');
    });

    $("body").on('click', '.navbar-collapse li:not(:has(> ul)) > a', function () {
        $(".navbar-collapse li").removeClass('open');
    });

    $(document).mouseup(function (e) {
        var container = $(".toggleContentShare");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            if (global.sessionStorage.pagename == 'CiNews') {
                $('.footer-note').removeClass('minusindex');
                $('footer').removeClass('minusindex');
                $('.searchContainer').removeClass('minusindex');
            }
        }

        var containerCalendar = $(".selector .selectorarrow .selectorarrowleft, table.header, table.caltable");
        if (!containerCalendar.is(e.target) && containerCalendar.has(e.target).length === 0) {
            containerCalendar.hide();
            if (global.sessionStorage.pagename == 'Search') {
                $('my-search-template').removeClass('minusindex');
                $('.footer-note').removeClass('minusindex');
                $('footer').removeClass('minusindex');
                $('.searchContainer').removeClass('minusindex');
            }
        }
    });
  
    $('body').on("click", ".sharecontent", function () {
        $(this).parent().find(".toggleContentShare").slideToggle(300);
        if (global.sessionStorage.pagename == 'CiNews') {
            $('.footer-note').addClass('minusindex');
            $('footer').addClass('minusindex');
            $('.searchContainer').addClass('minusindex');
            
        }
    });

    $('body').on("click", ".selectiongroup", function () {
        $(this).parent().find(".selector .selectorarrow .selectorarrowleft").slideToggle(300);
        if (global.sessionStorage.pagename == 'Search') {
            $('my-search-template').addClass('minusindex');
            $('.footer-note').addClass('minusindex');
            $('footer').addClass('minusindex');
            $('.searchContainer').addClass('minusindex');
        }
    });

    $('body').on("click", ".widgetfilter", function () {
        $(this).parent().find(".toggleWidgetFilter").slideToggle(300);
    });

    $(document).mouseup(function (e) {
        var container = $(".toggleWidgetFilter");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });

    $('body').on("click", ".btn", function () {
        var container = $(".toggleWidgetFilter");
        container.hide();      
    });   
    
	$(".editview").hide()
	$(".editviewBtn2").hide() 

	$(".editviewBtn").click(function () {
		$(".editview").show()  
		$(".viewText").hide()
		$(".editviewBtn2").show()  
		$(this).hide()     
    });


	$(".editviewBtn2").click(function () {
		$(".editview").hide()  
		$(".viewText").show() 
		$(".editviewBtn").show() 
		$(this).hide()     
    });


  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('.overlay').click(function () {
 hamburger_cross();
 $('#wrapper').toggleClass('toggled');
}); 

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });

 $('[data-toggle="tooltip"]').tooltip();
});


$(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
     
//Filter For popover	 
	    
        $('#back-to-top').tooltip('show');
		
			$("[data-toggle=popover]").popover({
			html: true, 
			content: function() {
          	return $('#popover-content').html();
        	}
		});


	//My folder show hide top content
	$(".HomeTop1").hide()
	if ($(".HomeClick").length > 0) {
		$(".HomeClick").click(function () {
			if($(".HomeTop").is(":visible")){
				

					$(".HomeTop").slideUp(function(){$(".HomeTop1").show()})
					
					$(this).animate({top:0})
					$(this).children().removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")
				}
			else{
					
					$(".HomeTop").slideDown(function(){$(".HomeTop1").hide()})					
					
					$(this).animate({bottom:0})
					$(this).children().removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up")
				}
			
		})
	}
	
	
	//My folder show hide top content by mk
	$(".innerTop1").hide()
	if ($(".innerClick").length > 0) {
		$(".innerClick").click(function () {
			if($(".innerTop").is(":visible")){
				

					$(".innerTop").slideUp(function(){$(".innerTop1").show()})
					
					$(this).animate({top:-30})
					$(this).children().removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")
				}
			else{
					
					$(".innerTop").slideDown(function(){$(".innerTop1").hide()})					
					
					$(this).animate({top:473})
					$(this).addClass("imgArrow")
					$(this).children().removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up")
				}
			
		})
	}
//$('#pop1').on('shown.bs.popover', function (){$("#example").slider()}) 
	
//$('body').on('click', function (e) {
        //did not click a popover toggle, or icon in popover toggle, or popover
    //    if ($(e.target).data('toggle') !== 'popover'
     //       && $(e.target).parents('[data-toggle="popover"]').length === 0
     //       && $(e.target).parents('.popover.in').length === 0) { 
     //       $('[data-toggle="popover"]').popover('hide');
       // }
		
   // });
	
	function readmore(index,id) {
	    $('#contentmore' + index + id).toggleClass();
	    event.currentTarget.parentNode.hidden = true;
	}

 $(document).ready(function(){
            var submitIcon = $('.searchbox-icon');
            var inputBox = $('.searchbox-input');
            var searchBox = $('.searchbox');
            var isOpen = false;
            submitIcon.click(function(){
                if(isOpen == false){
                    searchBox.addClass('searchbox-open');
                    inputBox.focus();
                    isOpen = true;
                } else {
                    searchBox.removeClass('searchbox-open');
                    inputBox.focusout();
                    isOpen = false;
                }
            });  
             submitIcon.mouseup(function(){
                    return false;
                });
            searchBox.mouseup(function(){
                    return false;
                });
            $(document).mouseup(function(){
                    if(isOpen == true){
                        $('.searchbox-icon').css('display','block');
                        submitIcon.click();
                    }
                });
			//$("#pop1").click(function(){
			//	$(".toggleMe").slideToggle(300);
			//});			
			//$(document).mouseup(function(e) 
			//{
			//	var container = $(".toggleMe");//YOUR CONTAINER SELECTOR
			
			//	// if the target of the click isn't the container nor a descendant of the container
			//	if (!container.is(e.target) && container.has(e.target).length === 0) 
			//	{
			//	  container.hide();
			//	}
				
				
			//}); 
			

            $('body').on("click", "#export", function () {


               
                $(".toggleExport").slideToggle(300);
            });

            $('body').on("click", "#exportSubmit", function () {
                var container = $(".toggleExport");
                container.hide();
            });

            $(document).mouseup(function (e) {
               
                var container = $(".toggleExport");//YOUR CONTAINER SELECTOR

                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                }


            });

            $('body').on("click", "#filter", function () {
                
                $(".toggleFilter").slideToggle(300);
            });

            $('body').on("click", "#filterSubmit", function () {
                var container = $(".toggleFilter");
                container.hide();
            });
            $(document).mouseup(function (e) {

                var container = $(".toggleFilter");//YOUR CONTAINER SELECTOR

                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                }


            });

          
			//$("#pop2").click(function(){
			//	$(".toggleMe1").slideToggle(300);
			//});			
			//$(document).mouseup(function(e) 
			//{
			//	var container = $(".toggleMe1");//YOUR CONTAINER SELECTOR
			
			//	// if the target of the click isn't the container nor a descendant of the container
			//	if (!container.is(e.target) && container.has(e.target).length === 0) 
			//	{
			//	  container.hide();
			//	}
				
				
			//}); 
			
        
            

			
        });
            function buttonUp(){
                var inputVal = $('.searchbox-input').val();
                inputVal = $.trim(inputVal).length;
                if( inputVal !== 0){
                    $('.searchbox-icon').css('display','none');
                } else {
                    $('.searchbox-input').val('');
                    $('.searchbox-icon').css('display','block');
                }
            }
$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 2010,
      max: 2020,
      values: [ 2011, 2017 ],
      slide: function( event, ui ) {
        $( "#year" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#year" ).val( $( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
});


$( function() {
    if ($('.list li').length) {
               
        var hidWidth;
        var scrollBarWidths = 40;

        var getLeftPosi = function () {
            return $('.list').position().left;
        };

        var widthOfList = function () {
            var itemsWidth = 0;
            $('.list li').each(function () {
                var itemWidth = $(this).outerWidth();
                itemsWidth += itemWidth;
            });
            return itemsWidth;
        };

        var widthOfHidden = function () {
            return (($('.wrapper').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths;
        };



        var reAdjust = function () {
            if (($('.wrapper').outerWidth()) < widthOfList()) {
                $('.scroller-right').show();
            }
            else {
                $('.scroller-right').hide();
            }

            if (getLeftPosi() < 0) {
                $('.scroller-left').show();
            }
            else {
                $('.item').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow');
                $('.scroller-left').hide();
            }
        }

        reAdjust();

        $(window).on('resize', function (e) {
            reAdjust();
        });

        $('.scroller-right').click(function () {
                  
            $('.scroller-left').fadeIn('slow');
            $('.scroller-right').fadeOut('slow');

            $('.list').animate({ left: "+=" + widthOfHidden() + "px" }, 'slow', function () {

            });
        });

        $('.scroller-left').click(function () {
                

            $('.scroller-right').fadeIn('slow');
            $('.scroller-left').fadeOut('slow');

            $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

            });
        });
    };
})
	