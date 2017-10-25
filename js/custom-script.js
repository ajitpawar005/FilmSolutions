/* Menu Toggle Script Start Here 27/03/2017 */


$(document).ready(function() 
{
	/*24.10.2017 starts here*/
    /* ======== sidebar height calculate =========== */
	// $('.pcw').css('min-height',($(window).height()-($('.header-container-section').height()+$('.bcs').height()+$('.fcs').height()))+'px');
	// $('.sidebar-wrapper, .sidebar-nav').css('min-height',($('.pcw').height())+'px');
    /*24.10.2017 end here*/
    /* ======== Toggle Function =========== */
	$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
	$('.pinfo').removeClass('active');
	$('.side_dropdown').addClass('active');	
	if($("#wrapper").hasClass("toggled"))
	{
		$('.pcw').css('min-height',($(window).height()-($('.header-container-section').height()+$('.bcs').height()+$('.fcs').height()))+'px');
	$('.sidebar-wrapper, .sidebar-nav').css('min-height',($('.pcw').height()+11)+'px');
	}
	else
	{
		$('.pcw').css('min-height',($(window).height()-($('.header-container-section').height()+$('.bcs').height()+$('.fcs').height()))+'px');
	$('.sidebar-wrapper, .sidebar-nav').css('min-height',($('.pcw').height())+'px');
	}
	
    });
	
	$(".menu-toggle-button").on("click", function(){
	if ( $(document).width() < 767 ) 
	{
    $('.menu-toggle-button i').toggleClass('fa-close fa-bars');
	}            
	});	

});
/* Menu Toggle Script End Here 27/03/2017 */