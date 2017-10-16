
 
 $(document).ready(function () {
     $("#includedSidebar").load("Sidebar.html");
 var selectCount = 1;

    $('.db_carousel').carousel({
        interval: false
    })            

$('.modal-dialog').draggable();


    var $mainButton = $(".tile .float"),
        $zoommenu = $(".tile .soc");
    $(document).on("click", ".tile .float", function () {
        var id = ($(this).attr('id'));
        $zoommenu = $(".ts" + id);
        $(".soc").not($zoommenu).removeClass("pad");
        $(this).html($(this).html() == '<i class="fa fa-times my-float"></i>' ? '<i class="fa fa-plus my-float"></i>' : '<i class="fa fa-times my-float"></i>');
        $zoommenu.toggleClass("pad");
    });


$(".img_toolbar").on("click", function () {
    $(".float").html($(".float").html() == '<i class="fa fa-times my-float"></i>' ? '<i class="fa fa-plus my-float"></i>' : '<i class="fa fa-times my-float"></i>');
    $(".soc").toggleClass("pad");
});

// $(function () {
//     var Accordion = function (el, multiple) {
//         this.el = el || {};
//         // more then one submenu open?
//         this.multiple = multiple || false;

//         var dropdownlink = this.el.find('.dropdownlink');
//         dropdownlink.on('click',
//             { el: this.el, multiple: this.multiple },
//             this.dropdown);
//     };

//     Accordion.prototype.dropdown = function (e) {
//         var $el = e.data.el,
//             $this = $(this),
//             //this is the ul.submenuItems
//             $next = $this.next();

//         $next.slideToggle();
//         $this.parent().toggleClass('open');

//         if (!e.data.multiple) {
//             //show only one menu at the same time
//             $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
//         }
//     }

//     var accordion = new Accordion($('.accordion-menu'), false);
// });


var allAvailableImages = [];  

    var SizeOfImages;
    var noofImages;
    var no_of_img = localStorage.getItem("selectedNoOfImages");
    var size_of_img = localStorage.getItem("selectedSize");
    var selected_filter= localStorage.getItem("selectedfilter");
    var albumList = [];

    SizeOfImages = size_of_img ? size_of_img : "l";
    noofImages = no_of_img ? no_of_img : 20;

    filterselected=selected_filter?selected_filter:"Custom Filter";
    $(".img_size").val(SizeOfImages).change();
    $(".img_no").val(noofImages).change();
    //$(".filter_data").val(filterselected).change();
    // $(".img_size").val(SizeOfImages);

    //localStorage.setItem("selectedNoOfImages"
    userObj = JSON.parse(localStorage.getItem("userObj"));
    $("#user-name").html(userObj.firstName);
    var html = userObj.firstName + " " + userObj.lastName + " - EXEC";
    $("#user-info").html(html);

    var imageData = [];
    var imageUrlsArrayLevel1 = [];
    var imageUrlsArrayLevel2 = [];

    $("button").click(function () {
        $("#panel").slideToggle("slow");
    });

    //Abhi
    projectId = localStorage.getItem("projectId");
    $.ajax({
        type: "GET",
        url: apiurl + "projects/" + projectId,
        dataType: "json",
        headers: {
            "X-API-KEY": localStorage.getItem("id_token")
        },
        beforeSend: function () { },
        success: function (data) {
            var html = "";
            for (var i = 0; i < data.albumData.length; i++) {
                html += '<li><a href="javascript:void(0);"><i class="fa fa-file-image-o albumSelect" aria-hidden="true" id="' + data.albumData[i].id + '">&nbsp;&nbsp;</i>' +
                    '<span id="' + data.albumData[i].id + '" class="albumLink">' + data.albumData[i].name + '</span><span id="count_' + data.albumData[i].id + '"> (' + data.albumData[i].imageCount + ')<span></a></li>';
                var ob = {};
                ob.id =  data.albumData[i].id;
                ob.name =  data.albumData[i].name;
                albumList.push(ob);
            }

            $("#albums").append(html);
            // Shiv Show Grid code
            imageData = data.imageData;
            allAvailableImages = data.imageData;
            var flag = false;
            var level1Images = [];
            imageData.forEach(function (key, value) {
                if (SizeOfImages == "m") {
                    key.url = key.url.replace("300:300", "200:200");

                }
                else if (SizeOfImages == "s") {
                    key.url = key.url.replace("300:300", "125:125");

                }
            })
            var imageDataLength = data.imageData.length;
            for (var i = 0; i < imageDataLength; i++) {
                var image = data.imageData[i];
                $("#imgList").append(`
                        <div class="img_div col-sm-4 col-md-4 col-lg-4" id="img_li_div">
                                            <div class="span3">
                                                <div class="imge" assetName="`+ image.name + `">
                                                <a href="javascript:void(0)" class="thumbnail img-check">
                                                    <img class="getindex" src="`+ image.url + `" name="` + image.name + `"  id="` + image.id + `"
                                                    data-index="`+ i + `" assetName="` + image.name + `"">
                                                </a>
                                                </div>
                                                <div class="tile">
                                                    <h3> <span>`+ image.name + ` </span> </h3>
                                                    <div class="float menu-share" id="`+ i + `">
                                                        <i class="fa fa-plus my-float"></i>
                                                    </div>
                                                    <div class="soc ts`+ i + `">
                                                        <a href="retouch.html" title="Retouch Comment"><i class="fa fa-paint-brush"></i></a>
                                                        <button class="btn btn_image" title="Image Transaction"  data-toggle="modal" data-target="#imagetransreport">T</button>
                                                        <button class="btn btn_image" title="Image History"  data-toggle="modal" data-target="#imagehistory">H</button>
                                                        <button class="btn btn_image" title="Group/Solo"  data-toggle="modal" data-target="#imagesg">G</button>
                                                        <button class="btn btn_image" title="Image Captions"  data-toggle="modal" data-target="#imagecap"><i class="fa fa-comment-o"></i></button>

                                                        <a href="#" title="Image Notes" class="button1" ><i class="fa fa-pencil-square-o"></i></a>
                                                        <button type="button" id="`+ image.id + `" data-imgindex="` + i + `"  name="` + image.name + `"  data-url="` + image.url + `" class="btn btn_image enlargeImg" data title="Enlarge Image"><i class="fa fa-search-plus"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                        `)

                flag = true;
            }
            if (flag) {
                $('#easyPaginate').easyPaginate({
                    paginateElement: '.img_div',
                    elementsPerPage: noofImages,
                    effect: 'climb',
                    gridType: "main"
                });
            }
            localStorage.setItem('perPageImage',noofImages);
            $("#filimages").click(function(){
                for (var i = 0; i < imageDataLength; i++) {
                    var image = data.imageData[i];
                    $(".filter_imgs").append('<p> <span>'+ image.name + ' </span> </p>');

                }
                $('#sda_ffl').modal('toggle');
            })
            

            level1Images = data.imageData;
            setImagesForEnlarge(level1Images);

            albumList.forEach(function(key,value){
                   var optgroup ="<option value='"+key.id+"'>"+key.name+"</option>"; 
                    $('#albumList').append(optgroup);
                });
            $('.selectpicker').selectpicker('refresh');
      },
      error:function(data){}
    });

    var storeIndexes =[];
    function setImagesForEnlarge(level1Images){
        var arr = [];
            level1Images.forEach(function(key,value){
            key.url = key.url.replace("300:300","700:700");
            var ob = {};
            ob.id = key.id;
            ob.name = key.name;
            ob.url = key.url;
            arr.push(ob);
        })
        localStorage.setItem('allImages',JSON.stringify(arr));
    }
    $(document).on('click','.enlargeImg',function(){
        var element = $(this).parent().closest('.tile').siblings('.imge').find('img');
        enlargeImagePage(element);
    });

    $("#albums").on('click', '.albumLink', function () {
        function reload_js(src) {
            $('script[src="' + src + '"]').remove();
            $('<script>').attr('src', src).appendTo('head');
            console.log("Reloaded");
        }
        reload_js('js/jquery.easyPaginate1.js');
        storeIndexes = [];
        $('.imge').removeClass("selectborder");
        getSelectedImages();
        var id = $(this).attr("id");
        loadAlbumImages(id);
    }); 

    function loadAlbumImages(id){
        var projectId = localStorage.getItem("projectId");
      $.ajax({
        type:"GET",
        url:apiurl+"albums/images/"+projectId+"/"+id,
        dataType:"json",
        headers: {
          "X-API-KEY":localStorage.getItem("id_token")
        },
        beforeSend:function(){},
        success:function(data){
          if(data.imageData.length == 0){
            $("#mainGrid").html("");
            $("#albumImgList").empty();                      
            alert("No assets found");
            return false;
          }
          var flag=false;
          var level1Images = [];
          allAvailableImages = data.imageData;
         // $(".easyPaginateNav").empty();
          $("#mainGrid").html("");
          $("#albumImgList").empty();
          for(var i = 0; i< data.imageData.length; i++){
            var image = data.imageData[i];
              $("#albumImgList").append(`
                      <div class="img_div_album col-sm-4 col-md-4 col-lg-4" id="img_li_div">
                                          <div class="span3">
                                              <div class="imge" assetName="`+ image.name + `">
                                              <a href="javascript:void(0)" class="thumbnail img-check">
                                                  <img class="getindex" src=`+ image.url + `" name="` + image.name + `" id="` + image.id + `" data-index="` + i + `" assetName="` + image.name + `">
                                              </a>
                                              </div>
                                              <div class="tile">
                                                  <h3> <span>`+ image.name + ` </span> </h3>
                                                  <div class="float menu-share" id="`+ i + `">
                                                      <i class="fa fa-plus my-float"></i>
                                                  </div>
                                                  <div class="soc ts`+ i + `">
                                                      <a href="retouch.html" title="Retouch Comment"><i class="fa fa-paint-brush"></i></a>
                                                      <button class="btn btn_image" title="Image Transaction"  data-toggle="modal" data-target="#imagetransreport">T</button>
                                                      <button class="btn btn_image" title="Image History"  data-toggle="modal" data-target="#imagehistory">H</button>
                                                      <button class="btn btn_image" title="Group/Solo"  data-toggle="modal" data-target="#imagesg">G</button>
                                                      <button class="btn btn_image" title="Image Captions"  data-toggle="modal" data-target="#imagecap"><i class="fa fa-comment-o"></i></button>

                                                      <a href="javascript:void(0)" title="Image Notes" class="button1" ><i class="fa fa-pencil-square-o"></i></a>
                                                      <a href="enlarge.html" title="Enlarge Image"><i class="fa fa-search-plus"></i></a>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                      `);
                flag = true;
              }
              var imgDataLenght = data.imageData.length;
              var cnt = imgDataLenght >noofImages?noofImages:imgDataLenght;
              localStorage.setItem('perPageImage',cnt);
              if(flag){
                    $('#albumEasyPaginate').easyPaginate1({
                        paginateElement1: '.img_div_album',
                        elementsPerPage1: cnt,
                        effect: 'climb',
                        gridType: "album"
                    });
                }
                level1Images = data.imageData;
                setImagesForEnlarge(level1Images);
        },
        error:function() {}
      });
    }

    $("#albums").on('click', '.albumSelect', function () {
        var id = $(this).attr("id");
        if (selectedAlbum == "") {
            selectedAlbum = id;
            localStorage.setItem("selectedAlbum", id);
            $(this).addClass("border");
        } else if (selectedAlbum == id) {
            selectedAlbum = "";
            localStorage.setItem("selectedAlbum", "");
            $(this).removeClass("border");
        } else {
            selectedAlbum = id;
            localStorage.setItem("selectedAlbum", id);
            $("#albums li i").removeClass("border");
            $(this).addClass("border");
        }
    });

    $('body').on('keydown', function (event) {
        if (selectedAlbum != "" && event.keyCode == 84) {
            $.ajax({
                type: "POST",
                //url: apiurl+"albums/images",
                url: "http://local.api.fs.com/api/albums/images",
                dataType: "json",

                data: { id: selectedAlbum, imageData: getFirstSelectedImageIndex },
                headers: {
                    "X-API-KEY": localStorage.getItem("id_token")
                },
                beforeSend: function () { },
                success: function (data) {
                    if (data.action == 0) {
                        alert("Something went wrong");
                    } else {
                        var html = ' (' + data.imageCount + ')';
                        $("#count_" + selectedAlbum).html(html);
                    }
                },
                error: function () { }
            });
        }
    });

    $("#addAlbumSubmit").click(function () {
        var albumName = $("#albumName").val();
        var projectId = localStorage.getItem("projectId");
        $.ajax({
            type: "POST",
            url: apiurl + "albums",
            dataType: "json",
            data: { name: albumName, projectId: projectId },
            headers: {
                "X-API-KEY": localStorage.getItem("id_token")
            },
            beforeSend: function () { },
            success: function (data) {
                if (data.status) {
                    $("#albumName").val("");
                    var html = '<li><a href="javascript:void(0);"><i class="fa fa-file-image-o albumSelect" aria-hidden="true" id="' + data.id + '">&nbsp;&nbsp;</i>' +
                        '<span id="' + data.id + '" class="albumLink">' + data.name + '</span><span id="count_' + data.id + '"><span></a></li>';
                    $("#AddAlbum").modal('hide');
                    $("#albums").append(html);

                } else {
                    alert(data.message);
                }
            },
            error: function () { }
        });
    });

    $(document).on("change", "#filtered_data", function () {
        selected_filtered = $("#filtered_data option:selected").val();
        localStorage.setItem("selectedfilter", selected_filtered);
        
        if(selected_filtered.indexOf('viewproject.html')>-1){
            window.location.href=selected_filtered;
        }
        else
        {
            loadAlbumImages(selected_filtered);
        }
    });            


/* Shiv */
function enlargeImagePage(selectedImage) {
    localStorage.setItem("level1Image", selectedImage.attr('id'));
    localStorage.setItem("level1ImageName", selectedImage.attr('name'));
    localStorage.setItem("level1SelectedImageIndex", selectedImage.data('index'))

    window.location.replace('enlarge.html');
}

var getFirstSelectedImageIndex;
var getLastSelectedImageIndex;
var getSelectedImagesIndex = [];
var keycode = null;
var allSelectedImagesArray = [];
$(document).on('keydown', function (e) {
    keycode = e.keyCode || e.which;
    if (e.keyCode == 90) {
        var getAllSelectedImageArray = [];
        getAllSelectedImageArray = $('.selectborder');
        if (getAllSelectedImageArray.length > 1) {
            console.log("Please select only image!");
        }
        else {
            enlargeImagePage(getAllSelectedImageArray.find("img"));
        }
    }
    var allElements =[];
        allElements = $('.imge');
    //Right key
    if(keycode == 39){
        getSelectedImages();
        if(allSelectedImagesArray.length>0){
            var selectedImage = $('.selectborder');
            allElements.each(function(value, key){
               var idInList = $(key).find("img").attr('id');
               var selectedImgId = $(selectedImage).find("img").attr('id');
                if( idInList == selectedImgId){
                    allElements[key+1];
                    $('.imge').removeClass("selectborder");
                    jQuery(allElements[value+1]).addClass(" selectborder");
                }
            });
        }
        else{
            var element = allElements[0];
            jQuery(element).addClass(" selectborder");
        }
        getSelectedImages();
        if(allSelectedImagesArray.length ==0){
            //jQuery(allElements[allElements.length-1]).addClass(" selectborder");
            $('.rightside_menu_middlepanel a.next').click();
        }
    }

    //Left Key
    if(keycode == 37){
        getSelectedImages();
        if(allSelectedImagesArray.length>0){
            
            
            var selectedImage = $('.selectborder');
            allElements.each(function(value, key){
                if( $(key).find("img").attr('id') == $(selectedImage).find("img").attr('id')){
                    allElements[key+1];
                    $('.imge').removeClass("selectborder");
                    jQuery(allElements[value-1]).addClass(" selectborder");
                }
            });
        }
        else{
            var element = allElements[0];
            jQuery(element).addClass(" selectborder");
        }
        getSelectedImages();
        if(allSelectedImagesArray.length ==0){
            //jQuery(allElements[0]).addClass(" selectborder");
            $('.rightside_menu_middlepanel a.prev').click();
        }
    }
});
$(document).on('keyup', function (e) {
    keycode = null;
});

$(document).on("click", ".imge", function (event) {
    //Single image select deselect
    if (keycode == null) {
        storeIndexes = [];
        // if($(this).hasClass("selectborder")){
        //     $('.imge').removeClass("selectborder");
        //     $(this).removeClass("selectborder"); 
        //     getSelectedImages();
        //     return false;
        // }
        // else{

            $('.imge').removeClass("selectborder");
            $(this).addClass("selectborder");
            const ct = $(this).find( "img").data('index');
            getFirstSelectedImageIndex = ct;
            storeIndexes.push(ct);
            getSelectedImages();
            return false;
        //}
    }
    // Ctrl key image selection
    if ((keycode == 17) || (keycode == 224)) {
        const ct = $(this).find("img").data('index');
        if ($(this).hasClass("selectborder")) {
            $(this).removeClass("selectborder");
            var index = getSelectedImagesIndex.indexOf(ct);
            getSelectedImagesIndex.splice(index, 1);
        }
        else {
            $(this).addClass("selectborder")
            getSelectedImagesIndex.push(ct);
        }
        getSelectedImages();
        return false;
        
    }
    // Shift key image selection
    if (keycode == 16) {
        storeIndexes[0] = getFirstSelectedImageIndex;
        getLastSelectedImageIndex = $(this).find("img").data('index');
        storeIndexes.push(getLastSelectedImageIndex);
        if (storeIndexes[0] > storeIndexes[1]) {
            var temp = storeIndexes[0];
            storeIndexes[0] = storeIndexes[1];
            storeIndexes[1] = temp;
        }
        for (var i = storeIndexes[0]; i <= storeIndexes[1]; i++) {
            $('img[data-index="' + i + '"]').parent().closest('div').addClass('selectborder');
        }
        storeIndexes[0] = getFirstSelectedImageIndex;
        storeIndexes = [];
        getSelectedImages();
        return false;
      
    }
});


function getSelectedImages() {
    var getAllSelectedImageArray = [];
    allSelectedImagesArray = [];
    getAllSelectedImageArray = $('.selectborder');
    getAllSelectedImageArray.each(function (key, value) {
        var obj = {};
        obj.id = $(value).find("img").attr('id');
        obj.name = $(value).find("img").attr('assetName');
        obj.url = $(value).find("img").attr('src');
        allSelectedImagesArray.push(obj);
    })
    localStorage.setItem("selectedimgs", JSON.stringify(allSelectedImagesArray));
    var cc = ($(".selectborder").length);
    $("#sizee").text(cc);
    console.log("Slected all images index");
    console.log(allSelectedImagesArray);
    return true;
}

$("#selimages").click(function(){
    $(".selected_imgs").empty();
                for (var i = 0; i < allSelectedImagesArray.length; i++) {
                    var imgname = allSelectedImagesArray[i];
                    $(".selected_imgs").append('<p> <span>'+ imgname.name + ' </span> </p>');
                }
                if(allSelectedImagesArray.length>0)
                {
                $('#sda_sfl').modal('show');
                }
                else{
                    alert("Please select image!");
                }
                
 })
$(".select_all").click(function () {
    $(".imge").addClass("selectborder");
   
    getSelectedImages();
});


$(".select_alle").click(function () {
    $(".imge").removeClass("selectborder");
  
    getSelectedImages();
});


$(".button1").on("click", function () {
    $("#info1").show();
});

$(".closebtn").click(function () {
    $("#info1").hide();
});

$('select').selectpicker();

$('.dropdown-toggle').dropdown();
var ops = {
    'html': true,
    content: function () {
        return $('#addkey').html();
    }
};

$(function () {
    $('#adde').popover(ops)
});

var opse = {
    'html': true,
    content: function () {
        return $('#edikey').html();
    }
};

$(function () {
    $('#ede').popover(opse)
});


var opsr = {
    'html': true,
    content: function () {
        return $('#remekey').html();
    }
};

$(function () {
    $('#rme').popover(opsr)
});

$(function () {
    $(".preload").fadeOut(1000);


});

// var numberOfImages=20;
//var SizeOfImages = "l";
$("#view_setting").on("click", function () {
    numberOfImages = $(".img_no option:selected").val();
    localStorage.setItem("selectedNoOfImages", numberOfImages);

    SizeOfImages = $(".img_size option:selected").val();
    localStorage.setItem("selectedSize", SizeOfImages);

    window.location.href = "viewproject.html";
    // alert(id);
    // console.log(id);
    // $(".easyPaginateNav").empty();
    // $("#mainGrid").empty();

});
		function checkStickyMenu(){
			if ( !$("body").hasClass("bgcolor")) return(false);
		
			if($(window).scrollTop() > headerHeight-submenuHeight   &&  $(window).width() >= desktop_width){
				// #Back-Top visible
				
				if($("body").hasClass("sticky-menu-active"))
					return false;
				$("body").addClass("sticky-menu-active");
			
				$('header').css({
							top: -headerHeight,
							opacity:'.5',
							transition: 'none',
						}).stop(true, true).animate({
							top: 0,
							opacity: '1'
					}, 1000, function(){
						$('header').removeAttr('style');
						// Animation complete.
				});			
			} else if( $(window).scrollTop() <= 0||  $(window).width() < desktop_width){
				if ($("body").hasClass("sticky-menu-active")){
					$("body").css('padding-top',0);
					$("body").removeClass("sticky-menu-active");
					$("body").removeAttr('style');
				}
			}
		}	
});

