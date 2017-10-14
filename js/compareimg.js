
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


    var imageUrlsArrayDefault =  [];

 
    $("button").click(function () {
        $("#panel").slideToggle("slow");
    });
   
            var getselectedimgs = [];
             getselectedimgs= JSON.parse(localStorage.getItem('selectedimgslevel'));


             getselectedimgs.forEach(function(key,value){
                 if(key.url.indexOf('300:300')>-1){
                     key.url = key.url.replace("300:300","700:700");
                 }
                 
             })




            console.log(getselectedimgs);
            var length = getselectedimgs.length;
            var flag = false;
            getselectedimgs.forEach(function(key,value) {
                $("#img2").append(`
                     
                     <img src="`+key.url+`">
                `);
                 flag = true; 
            }) 
          
            if(flag){
             $('[data-diff]').simpleImageDiff({
                            resize: false,
                            width: 800,
                            titles: {
                
                            },
                            maxWidth: 2000
                        });
                        }

            $('.img1_name').text(getselectedimgs[0].name);
            $('.img2_name').text(getselectedimgs[1].name);        

                $("button").click(function () {
                    $("#panel").slideToggle("slow");
                });

            $('select').selectpicker();

            $('.dropdown-toggle').dropdown();


});
