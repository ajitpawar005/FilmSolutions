/* Menu Toggle Script Start Here 27/03/2017 */


$(document).ready(function() 
{
    /* ======== sidebar height calculate =========== */
	$('.pcw').css('min-height',($(window).height()-($('.header-container-section').height()+$('.bcs').height()+$('.fcs').height()))+'px');
	$('.sidebar-wrapper, .sidebar-nav').css('min-height',($('.pcw').height())+'px');

    /* ======== Toggle Function =========== */
	$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
	$('.pinfo').removeClass('active');
	$('.side_dropdown').addClass('active');	
	if($("#wrapper").hasClass("toggled"))
	{
	$('.sidebar-wrapper, .sidebar-nav').css('min-height',($('.pcw').height()+11)+'px');
	}
	else
	{
	$('.sidebar-wrapper, .sidebar-nav').css('min-height',($('.pcw').height())+'px');
	}
	
    });
	
	
	
	
	
	
	$('#plus-circle-togglebutton1').click(function(){
	$(".image-editor-toolslist1").toggle(500);
    $('#plus-circle-togglebutton1 i').toggleClass('fa-close fa-plus');
    $('.image-editor-toolslist1').toggleClass('image-editortools-marginleft');
	});
	$('#plus-circle-togglebutton2').click(function(){
	$(".image-editor-toolslist2").toggle(500);
    $('#plus-circle-togglebutton2 i').toggleClass('fa-close fa-plus');
    $('.image-editor-toolslist2').toggleClass('image-editortools-marginleft');
	});
	$('#plus-circle-togglebutton3').click(function(){
	$(".image-editor-toolslist3").toggle(500);
    $('#plus-circle-togglebutton3 i').toggleClass('fa-close fa-plus');
    $('.image-editor-toolslist3').toggleClass('image-editortools-marginleft');
	});
	$('#plus-circle-togglebutton4').click(function(){
	$(".image-editor-toolslist4").toggle(500);
    $('#plus-circle-togglebutton4 i').toggleClass('fa-close fa-plus');
    $('.image-editor-toolslist4').toggleClass('image-editortools-marginleft');
	});
	$('#plus-circle-togglebutton5').click(function(){
	$(".image-editor-toolslist5").toggle(500);
    $('#plus-circle-togglebutton5 i').toggleClass('fa-close fa-plus');
    $('.image-editor-toolslist5').toggleClass('image-editortools-marginleft');
	});
	$('#plus-circle-togglebutton6').click(function(){
	$(".image-editor-toolslist6").toggle(500);
    $('#plus-circle-togglebutton6 i').toggleClass('fa-close fa-plus');
    $('.image-editor-toolslist6').toggleClass('image-editortools-marginleft');
	});	
	
	$(".menu-toggle-button").on("click", function(){
	if ( $(document).width() < 767 ) 
	{
    $('.menu-toggle-button i').toggleClass('fa-close fa-bars');
	}            
	});	

	
});
/* Menu Toggle Script End Here 27/03/2017 */