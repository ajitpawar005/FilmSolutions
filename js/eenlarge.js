
        $(document).ready(function () {
            $("#includedSidebar").load("Sidebar.html");
            $('.db_carousel').carousel({
                interval: false
            })
       
        $('.modal-dialog').draggable();
    
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

        var ide;
        var id;
        var currentImgIndex;
      
            id =window.location.search.substring(1).split("=");
            var imageUrlsArrayLevel2 =  [];
            ide=parseInt(localStorage.getItem('level1SelectedImageIndex'));            
            $("button").click(function () {
                $("#panel").slideToggle("slow");
            });
                var flag = false;
                    imageUrlsArrayLevel2 =  JSON.parse(localStorage.getItem('allImagesLevel2'));
                    imageUrlsArrayLevel2.forEach(function(item){
                        
                            $("#imgelist").append(`
                                                <div class="eimg_dive "> 
                                                    <div class="img_tile">
                                                        <span class="ii"> `+item.name+` </span>
                                                    </div>
                                                    <div class="span312">
                                                          
                                                                <div class="eimgee">
                                                             
                                                                    <a href="javascript:void(0)" class="eimg_dive_ver"><img src=`+item.url+`"></a>
                                                               
                                                            </div>
                                                    </div>
                                                </div>
                               
                                `)
                               // $(".nme").text(item.name);
                        flag = true;
                    });
                    if(flag){
                        //$(".nme").text(imageUrlsArrayLevel2[ide].name);
                        $('#easyPaginate').easyPaginate({
                                paginateElement: '.eimg_dive',
                                  elementsPerPage: 1,
                                  imgid:ide,
                                 effect: 'climb'
                            });
                        }
       

        function close_eenlarge(){
            //console.log('fd');
            //window.location = 'eenlarge.html?id='+ide;
            window.location.replace('enlarge.html');
        }  

    $(".button1").on("click",function() {
        $("#info1").fadeToggle();
    });

    $(document).on('keydown', function(event){
        if(event.keyCode == 40){
            close_eenlarge();
        }
    })
    
    $(".closebtn").click(function(){
        $("#info1").fadeToggle();
    });

        $('select').selectpicker();

      $('.dropdown-toggle').dropdown();

    });