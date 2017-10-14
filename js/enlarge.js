
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
        var selectedImageName;
        var flag= false;
     
           var id =window.location.search.substring(1).split("=");

            var imageUrlsArrayLevel1 =  [];
            ide= parseInt(localStorage.getItem('level1SelectedImageIndex'));

            selectedImageName = localStorage.getItem('level1ImageName');
            $("button").click(function () {
                $("#panel").slideToggle("slow");
            });
                imageUrlsArrayLevel1 =  JSON.parse(localStorage.getItem('allImages'));
                var level2Images = JSON.parse(localStorage.getItem('allImages'));
                var arr = [];
                level2Images.forEach(function(key,value){
                    key.url = key.url.replace("700:700","1600:1600");
                    var ob = {};
                    ob.id = key.id;
                    ob.name = key.name;
                    ob.url = key.url;
                    arr.push(ob);
                })
                localStorage.setItem('allImagesLevel2',JSON.stringify(arr));
                imageUrlsArrayLevel1.forEach(function(item){
                    $("#imglist").append(`

                                                <div class="img_dive ">
                                                <div class="img_tile">
                                                    <span class="ii"> `+item.name+` </span>
                                                </div>
                                                    <div class="span31">
                                                        <div class="imgee">
                                                        <a href="javascript:void(0)" class=""><img src="`+item.url+`"></a>
                                                        </div>
                                                    </div>
                                        </div>
                                `)
                        //}
                        //$(".nm").text(item.name);
                        flag = true;
                    });
                     if(flag){

                        $('#easyPaginate').easyPaginate({
                               paginateElement: '.img_dive',
                              elementsPerPage: 1,
                                  imgid:ide,
                             effect: 'climb'
                            });
                        }

       
        $(".button1").on("click",function() {
        $("#info1").fadeToggle();
    });

    $(document).on('keydown', function(event){
        var keycode = event.keyCode;
        if(keycode== 38){
            enlarge();
        }
        if(keycode == 40){
            window.location.replace(' viewproject.html');
        }
        //Right key
        if(keycode == 39){
          $('.rightside_menu_middlepanel1 a.next').click();
        }

        //Left Key
        if(keycode == 37){
          $('.rightside_menu_middlepanel1 a.prev').click();
        }
    })

    function enlarge(){
        window.location.replace('eenlarge.html');
    }

    $(".closebtn").click(function(){
        $("#info1").fadeToggle();
    });

        $('select').selectpicker();

      $('.dropdown-toggle').dropdown();

    });