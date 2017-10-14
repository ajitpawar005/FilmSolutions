
$(document).ready(function () {
    $("#includedSidebar").load("Sidebar.html");

    
    
    $(function () {
        var Accordion = function (el, multiple) {
            this.el = el || {};
            // more then one submenu open?
            this.multiple = multiple || false;
    
            var dropdownlink = this.el.find('.dropdownlink');
            dropdownlink.on('click',
                { el: this.el, multiple: this.multiple },
                this.dropdown);
        };
    
        Accordion.prototype.dropdown = function (e) {
            var $el = e.data.el,
                $this = $(this),
                //this is the ul.submenuItems
                $next = $this.next();
    
            $next.slideToggle();
            $this.parent().toggleClass('open');
    
            if (!e.data.multiple) {
                //show only one menu at the same time
                $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
            }
        }
    
        var accordion = new Accordion($('.accordion-menu'), false);
    });

 
    var imageUrlsArrayDefault =  [];
   
        var getselectedimgs=[];
        getselectedimgs= JSON.parse(localStorage.getItem('selectedimgs'));
        getselectedimgs.forEach(function(key,value){
            if(key.url.indexOf('125:125')>-1){
                key.url = key.url.replace("125:125","300:300");
            }
            else if(key.url.indexOf('200:200')>-1){
                key.url = key.url.replace("200:200","300:300");
            }
        })
            console.log(getselectedimgs);
        // var  getselectedimgs= JSON.parse(localStorage.getItem('selectedimgs'));
            var length = getselectedimgs.length;
            var flag = false;
            for(var i = 0; i< length; i++){
                var image = getselectedimgs[i];
                $("#comparediv").append(`
                    
                                        <div class="compimg_div col-sm-4 col-md-4 col-lg-4"">
                           
                                            <div class="span3">
                                                <div class="imge" >
                                                         <a href="javascript:void(0)" class="thumbnail img-check">
                                                            <img src=`+image.url+`" data-index="`+i+`" id="`+image.id+`" assetName="`+image.name+`"" class="imagee">
                                                         </a>
                                                </div>
                                                <div class="img_tile">
                                             <span class="ii"> `+image.name+` </span>
                                            </div>
                                            </div>
                                           
                                        </div>
                    
                        `);
                          
                        flag = true;
                    }
                    if(flag){
                          $('#easyPaginate').easyPaginate({
                              paginateElement: '.span3',
                                elementsPerPage: 20,
                               effect: 'climb',
                               gridType: "album"
                          });
                      }
   

    var getFirstSelectedImageIndex;
    var getLastSelectedImageIndex;
    var getSelectedImagesIndex =[];
    var keycode = null;
    var allSelectedImagesArray = [];
    $(document).on('keydown', function(e){
        keycode = e.keyCode || e.which;
    });
    $(document).on('keyup', function(e){
        keycode = null;
    }); 

    $(document).on("click",".imge",function(event){
    // Ctrl key image selection
    if((keycode == 17 )|| (keycode == 224)){
        const ct = $(this).find("img").data('index');
        if($(this).hasClass("selectborder")){
            $(this).removeClass("selectborder"); 
            var index = getSelectedImagesIndex.indexOf(ct);
            getSelectedImagesIndex.splice(index,1);
        }
        else{
            if(getSelectedImagesIndex.length <2){
            $(this).addClass("selectborder")
            getSelectedImagesIndex.push(ct);
            }
            else {
                alert("You have Already selected Two Images to Compare!");
            }
        }
        getSelectedImages();
        return false;
    }
});


   function getSelectedImages(){
    var getAllSelectedImageArray = [];
    allSelectedImagesArraylevel = [];
    getAllSelectedImageArray =  $('.selectborder');
    getAllSelectedImageArray.each(function(key,value){
        var obj = {};
        obj.id = $(value).find("img").attr('id');
        obj.name = $(value).find("img").attr('assetName');
        obj.url = $(value).find("img").attr('src');
        allSelectedImagesArraylevel.push(obj);
    })
    localStorage.setItem("selectedimgslevel", JSON.stringify(allSelectedImagesArraylevel));
    //var cc=($(".selectborder").length);
    //$("#sizee").text(cc);
    console.log("Slected all images index");
    console.log(allSelectedImagesArraylevel);
    return true;
}

$('select').selectpicker();

$('.dropdown-toggle').dropdown();

var p = document.getElementById("myRange");
    p.addEventListener("input", function() {
        document.getElementById('textInput').value =  p.value;
        // var v = p.value;
        // v = v+"px";
        //alert(p.value);
        var img = $('.imagee')[0]; 
        //or however you get a handle to the IMG
        var cWidth = img.naturalWidth;
        var cHeight = img.naturalHeight;

        var width =  cWidth * (p.value / 100);
        var height = cHeight * (p.value / 100);
        $('.imagee').css('height',height+'px');
        $('.imagee').css('width',width+'px');



        $('.span3').addClass("addhb")
        $('.addhb').css('height',(height+35)+'px');
        $('.addhb').css('width',width+'px');

       
    }, false); 

    $(".compare_imgs").on("click", function(){
        if(getSelectedImagesIndex.length==2)
        {
            window.location.replace('compareimg.html');
        }
            else{
                alert("Please Select  Only two Image(s)  to compare!");
            }
        })



});
