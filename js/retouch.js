
        $(document).ready(function () {
            $('.db_carousel').carousel({
                interval: false
            })
        });
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



        $(document).ready(function () {
            $("button").click(function () {
                $("#panel").slideToggle("slow");
            });
        });

        $('select').selectpicker();

        $('.dropdown-toggle').dropdown();

        $('.colorSelect').on("click",function () {
		         $('.colorPanel').toggle();
        });
    
	    $('.colorBox').on("hover",function () {
            var colorName = $(this).attr('colorName');
            var colorCode = $(this).attr('colorCode');
            $('.colorSelect').text(colorName);
            $('.colorSelect').css('background-color', colorCode);
            if(colorName == "White"  || colorName == "Yellow"){
                $('.colorSelect').css('color', 'black')
            }else{ 
                $('.colorSelect').css('color', 'white')
            }			    
        });
        $('.colorBox').on("click",function () {
            var colorName = $(this).attr('colorName');
            var colorCode = $(this).attr('colorCode');
            $('.colorSelect').css('background-color', colorCode);
            $('.fa-paint-brush').css('color', colorCode);
            if(colorName == "White"  || colorName == "Yellow"){
                $('.colorSelect').css('color', 'black')
            }else{ 
                $('.colorSelect').css('color', 'white')
            }	
            $('.colorPanel').hide();
            $('.colorSelect').text(colorName);
        });


