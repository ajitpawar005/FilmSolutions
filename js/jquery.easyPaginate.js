/*
* jQuery easyShare plugin
* Update on 04 april 2017
* Version 1.2
*
* Licensed under GPL <http://en.wikipedia.org/wiki/GNU_General_Public_License>
* Copyright (c) 2008, St?hane Litou <contact@mushtitude.com>
* All rights reserved.
*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($){
    $.fn.easyPaginate = function (options) {
       // console.log(options);
        var defaults = {
            
            hashPage: 'page',
            effect: 'default',
            slideOffset: 200,
            firstButton: true,
            firstButtonText: '<i class="fa fa-step-backward"></i>',
            lastButton: true,
            lastButtonText: '<i class="fa fa-step-forward"></i>',        
            prevButton: true,
            prevButtonText: '<i class="fa fa-backward"></i>',        
            nextButton: true,
            nextButtonText: '<i class="fa fa-forward"></i>'
        }
            
    
        
        return this.each (function (instance) {        
            
            var plugin = {};
            plugin.el = $(this);
            plugin.el.addClass('easyPaginateList');
    
            plugin.settings = {
                pages: 0,
                objElements: Object,
                currentPage:1
            }
            
            var getNbOfPages = function() {
                return Math.ceil(plugin.settings.objElements.length / plugin.settings.elementsPerPage);         
            };
            
            var displayNav = function() {
                htmlNav = '<div class="easyPaginateNav">';
                
                if(plugin.settings.firstButton) {
                    htmlNav += '<li><a href="#'+plugin.settings.hashPage+':1" title="First page" rel="1" class="first">'+plugin.settings.firstButtonText+'</a></li>';
                }
                
                if(plugin.settings.prevButton) {
                    htmlNav += '<li><a href="" title="Previous" rel="" class="prev">'+plugin.settings.prevButtonText+'</a></li>';
                }
                
                htmlNav += '<li><p>Page : <span id="updatedPage"> 1 </span> of <span class="pages">'+plugin.settings.pages+'</span></p></li>';
               /* for(i = 1;i <= plugin.settings.pages;i++) {
                    htmlNav += '<li><a href="#'+plugin.settings.hashPage+':'+i+'" title="Page '+i+'" rel="'+i+'" class="page">'+i+'</a>';
                };*/
                
                if(plugin.settings.nextButton) {
                    htmlNav += '<li><a href="" title="Next" rel="" class="next">'+plugin.settings.nextButtonText+'</a></li>';
                }
                
                if(plugin.settings.lastButton) {
                    htmlNav += '<li><a href="#'+plugin.settings.hashPage+':'+plugin.settings.pages+'" title="Last page" rel="'+plugin.settings.pages+'" class="last">'+plugin.settings.lastButtonText+'</a></li>';
                }
                
                htmlNav += '</div>';
                plugin.nav = $(htmlNav);
                plugin.nav.css({
                    'width': plugin.el.width()
                });
                //plugin.el.after(plugin.nav);
                $(".rightside_menu_middlepanel ul").append(plugin.nav);
                $(".rightside_menu_middlepanel1 ul").append(plugin.nav);
                //var elSelector = '#' + plugin.el.get(0).id + ' + ';
                // $('.easyPaginateNav a.page,.easyPaginateNav a.first,.easyPaginateNav a.last').on('click', function(e) {
                //     e.preventDefault();
                //     displayPage($(this).attr('rel'));                
                // });

                $('.easyPaginateNav a.page,.easyPaginateNav a.first').on('click', function(e) {
                    e.preventDefault();
                    $("#updatedPage").text(1);
                    displayPage($(this).attr('rel'));                
                });
    
                $('.easyPaginateNav a.last').on('click', function(e) {
                    e.preventDefault();
                    $("#updatedPage").text(plugin.settings.pages);
                    displayPage($(this).attr('rel'));                
                });
    
               
                $('.rightside_menu_middlepanel1 a.prev').on('click', function(e) {
                    e.preventDefault();
                    page = plugin.settings.currentPage > 1?parseInt(plugin.settings.currentPage) - 1:1;
                    $("#updatedPage").text(page);
                    displayPage(page);
                });

                $('.rightside_menu_middlepanel1 a.next').on('click', function(e) {
                    e.preventDefault();
                    page = plugin.settings.currentPage < plugin.settings.pages?parseInt(plugin.settings.currentPage) + 1:plugin.settings.pages;
                    $("#updatedPage").text(page);
                    displayPage(page);
                });
            };
            
            var displayPage = function(page, forceEffect) {
                if(plugin.settings.currentPage != page) {
                    plugin.settings.currentPage = parseInt(page);
                    offsetStart = (page - 1) * plugin.settings.elementsPerPage;
                    offsetEnd = page * plugin.settings.elementsPerPage;
                    if(typeof(forceEffect) != 'undefined') {
                        eval("transition_"+forceEffect+"("+offsetStart+", "+offsetEnd+")");
                    }else {
                        eval("transition_"+plugin.settings.effect+"("+offsetStart+", "+offsetEnd+")");
                    }
                    
                    plugin.nav.find('.current').removeClass('current');
                    plugin.nav.find('a.page:eq('+(page - 1)+')').addClass('current');
                    
                    switch(plugin.settings.currentPage) {
                        case 1:
                            $('.easyPaginateNav a', plugin).removeClass('disabled');
                            $('.easyPaginateNav a.first, .easyPaginateNav a.prev', plugin).addClass('disabled');
                            break;
                        case plugin.settings.pages:
                            $('.easyPaginateNav a', plugin).removeClass('disabled');
                            $('.easyPaginateNav a.last, .easyPaginateNav a.next', plugin).addClass('disabled');
                            break;
                        default:
                            $('.easyPaginateNav a', plugin).removeClass('disabled');
                            break;
                    }
                }
            };
            
            var transition_default = function(offsetStart, offsetEnd) {
                plugin.currentElements.hide();
                plugin.currentElements = plugin.settings.objElements.slice(offsetStart, offsetEnd).clone();
                plugin.el.html(plugin.currentElements);
                plugin.currentElements.show();
            };
            
            var transition_fade = function(offsetStart, offsetEnd) {
                plugin.currentElements.fadeOut();
                plugin.currentElements = plugin.settings.objElements.slice(offsetStart, offsetEnd).clone();
                plugin.el.html(plugin.currentElements);
                plugin.currentElements.fadeIn();
            };
            
            var transition_slide = function(offsetStart, offsetEnd) {
                plugin.currentElements.animate({
                    
                }, function() {
                    $(this).remove();
                });
                
                plugin.currentElements = plugin.settings.objElements.slice(offsetStart, offsetEnd).clone();
                plugin.currentElements.css({
                   
                });
                plugin.el.html(plugin.currentElements);
                plugin.currentElements.animate({
                   
                });
            };
                    
            var transition_climb = function(offsetStart, offsetEnd) {            
                plugin.currentElements.each(function(i) {
                    var $objThis = $(this);
                    setTimeout(function() {
                        $objThis.animate({
                           
                        }, function() {
                            $(this).remove();
                        });
                    }, );
                });
                
                plugin.currentElements = plugin.settings.objElements.slice(offsetStart, offsetEnd).clone();
                plugin.currentElements.css({
                  
                });
                plugin.el.html(plugin.currentElements);
                plugin.currentElements.each(function(i) {
                    var $objThis = $(this);
                    setTimeout(function() {
                        
                    }, );
                });
            };
                    
            plugin.settings = $.extend({}, defaults, options);
            
            plugin.currentElements = $([]);
            plugin.settings.objElements = plugin.el.find(plugin.settings.paginateElement);
            plugin.settings.pages = getNbOfPages();
            if(plugin.settings.pages > 1) {
                plugin.el.html();
        
                // Here we go
                displayNav();
                var flag = false;
                page = 1;
                if(document.location.hash.indexOf('#'+plugin.settings.hashPage+':') != -1) {
                    page = parseInt(document.location.hash.replace('#'+plugin.settings.hashPage+':', ''));
                    if(page.length <= 0 || page < 1 || page > plugin.settings.pages) {
                        page = 1;
                    }
                    flag = true;
                }
                
                displayPage( (parseInt(plugin.settings.imgid)+1), 'default');
                // if(!flag){
                //     displayPage(page, 'default');
                // }
                // else{
                //     displayPage(plugin.settings.imgid, 'default');
                // }
            }
        });
    };
    })(jQuery);
    