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
    $.fn.easyPaginate1 = function (options) {
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
            plugin.el.addClass('easyPaginateList1');
    
            plugin.settings1 = {
                pages1: 0,
                objElements: Object,
                currentPage: 1
            }
            
            var getNbOfPages = function() {
                return Math.ceil(plugin.settings1.objElements.length / plugin.settings1.elementsPerPage1);         
            };
            
            var displayNav = function() {
                htmlNav = '<div class="easyPaginateNav1">';
                
                if(plugin.settings1.firstButton) {
                    htmlNav += '<li><a href="#'+plugin.settings1.hashPage+':1" title="First page" rel="1" class="first">'+plugin.settings1.firstButtonText+'</a></li>';
                }
                
                if(plugin.settings1.prevButton) {
                    htmlNav += '<li><a href="" title="Previous" rel="" class="prev">'+plugin.settings1.prevButtonText+'</a></li>';
                }
                
                htmlNav += '<li><p>Page : <span id="updatedPage1"> 1 </span> of </span> <span class="pages">'+plugin.settings1.pages+'</span></br><span id="sizee">0</span> (Image)s Selected</p></li>';
               /* for(i = 1;i <= plugin.settings1.pages;i++) {
                    htmlNav += '<li><a href="#'+plugin.settings1.hashPage+':'+i+'" title="Page '+i+'" rel="'+i+'" class="page">'+i+'</a>';
                };*/
                
                if(plugin.settings1.nextButton) {
                    htmlNav += '<li><a href="" title="Next" rel="" class="next">'+plugin.settings1.nextButtonText+'</a></li>';
                }
                
                if(plugin.settings1.lastButton) {
                    htmlNav += '<li><a href="#'+plugin.settings1.hashPage+':'+plugin.settings1.pages+'" title="Last page" rel="'+plugin.settings1.pages+'" class="last">'+plugin.settings1.lastButtonText+'</a></li>';
                }
                
                htmlNav += '</div>';
                plugin.nav = $(htmlNav);
                plugin.nav.css({
                    'width': plugin.el.width()
                });
                //plugin.el.after(plugin.nav);
                $(".rightside_menu_middlepanel1 ul").append(plugin.nav);
    
                //var elSelector = '#' + plugin.el.get(0).id + ' + ';
                $('.easyPaginateNav a.page,.easyPaginateNav a.first').on('click', function(e) {
                    e.preventDefault();
                    $("#updatedPage1").text(1);
                    displayPage($(this).attr('rel'));                
                });
    
                $('.easyPaginateNav a.last').on('click', function(e) {
                    e.preventDefault();
                    $("#updatedPage1").text(plugin.settings1.pages);
                    displayPage($(this).attr('rel'));                
                });
               // rightside_menu_middlepanel2
                $('.rightside_menu_middlepanel1 a.prev').on('click', function(e) {
                    e.preventDefault();
                    page = plugin.settings1.currentPage > 1?parseInt(plugin.settings1.currentPage) - 1:1;
                    $("#updatedPage1").text(page);
                    displayPage(page);
                    

                });
                //$("#updatedPage").text(page);
                $('.rightside_menu_middlepanel1 a.next').on('click', function(e) {
                    e.preventDefault();
                    page = plugin.settings1.currentPage < plugin.settings1.pages?parseInt(plugin.settings1.currentPage) + 1:plugin.settings1.pages;
                    $("#updatedPage1").text(page);
                    displayPage(page);
                    
                });
            };

            var displayPage = function(page, forceEffect) {
                if(plugin.settings1.currentPage != page) {
                    plugin.settings1.currentPage = parseInt(page);
                    offsetStart = (page - 1) * plugin.settings1.elementsPerPage1;
                    offsetEnd = page * plugin.settings1.elementsPerPage1;
                    if(typeof(forceEffect) != 'undefined') {
                        eval("transition_"+forceEffect+"("+offsetStart+", "+offsetEnd+")");
                    }else {
                        eval("transition_"+plugin.settings1.effect+"("+offsetStart+", "+offsetEnd+")");
                    }
                    
                    plugin.nav.find('.current').removeClass('current');
                    plugin.nav.find('a.page:eq('+(page - 1)+')').addClass('current');
                    
                    switch(plugin.settings1.currentPage) {
                        case 1:
                            $('.easyPaginateNav a', plugin).removeClass('disabled');
                            $('.easyPaginateNav a.first, .easyPaginateNav a.prev', plugin).addClass('disabled');
                            break;
                        case plugin.settings1.pages:
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
                plugin.currentElements = plugin.settings1.objElements.slice(offsetStart, offsetEnd).clone();
                plugin.el.html(plugin.currentElements);
                plugin.currentElements.show();
            };
            
            var transition_fade = function(offsetStart, offsetEnd) {
                plugin.currentElements.fadeOut();
                plugin.currentElements = plugin.settings1.objElements.slice(offsetStart, offsetEnd).clone();
                plugin.el.html(plugin.currentElements);
                plugin.currentElements.fadeIn();
            };
            
            var transition_slide = function(offsetStart, offsetEnd) {
                plugin.currentElements.animate({
                    
                }, function() {
                    $(this).remove();
                });
                
                plugin.currentElements = plugin.settings1.objElements.slice(offsetStart, offsetEnd).clone();
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
                
                plugin.currentElements = plugin.settings1.objElements.slice(offsetStart, offsetEnd).clone();
                plugin.currentElements.css({
                  
                });
                plugin.el.html(plugin.currentElements);
                plugin.currentElements.each(function(i) {
                    var $objThis = $(this);
                    setTimeout(function() {
                        
                    }, );
                });
            };
                    
            plugin.settings1 = $.extend({}, defaults, options);
            
            plugin.currentElements = $([]);
            plugin.settings1.objElements = plugin.el.find(plugin.settings1.paginateElement1);
            plugin.settings1.pages = getNbOfPages();
            if(plugin.settings1.pages > 1) {
                plugin.el.html();
        
                // Here we go
                displayNav();
                
                page = 1;
                if(document.location.hash.indexOf('#'+plugin.settings1.hashPage+':') != -1) {
                    page = parseInt(document.location.hash.replace('#'+plugin.settings1.hashPage+':', ''));
                    if(page.length <= 0 || page < 1 || page > plugin.settings1.pages) {
                        page = 1;
                    }
                }
                
                displayPage(page, 'default');
            }
        });
    };
    })(jQuery);
    