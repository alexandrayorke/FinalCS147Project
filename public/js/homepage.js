'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
    $('.searchButton').click(searchListener);
    $(document).on('focus', 'input', function(e) {
        console.log("homepage.js in searchInput focus function");
        var topbarPosition = $("#topbar").offset();
        console.log("homepage.js topbarPosition = " + topbarPosition);
        
       // $('#topbar').removeClass('topbarOriginal');
       // $('#topbar').addClass('topbarTrial');


        //$('#topbar').css(position, topbarPosition);
        //$('#topbar').css('topbarOriginal');

        //$('body').animate({ scrollTop: topbarPosition.top });

    })
    .on('blur', 'input', function(e) {
        console.log("homepage.js in searchInput blur function");
        $('#topbar').removeClass('fixfixed');
    });
    //$('#searchInput').on('blur', searchInputOnBlur);
}

function searchInputOnFocus(e) {
    console.log("homepage.js in searchInput focus function");
    $(document).getElementsByTagName(body).classList.add(fixfixed);
 //    document.getElementById('topbar').classList.add('trialSearch');
 //    header.css({position: 'absolute'});
 //    $(window).scrollTop(0);
}

function searchInputOnBlur() {
    console.log("homepage.js in searchInput blur function");
    // document.getElementById('topbar').classList.add('trialSearch');
 //   header.css({position: 'absolute'});
}

function searchListener() {
    console.log("homepage.js in searchListener");
    var searchHTML = '<div class="form-group searchBar col-xs-offset-2 col-xs-8 "><form class="navbar-right " role="search" id="searchForm" action="/search"><input type="search" class="form-control col-xs-10 " placeholder="search" id="searchInput" name="search"></input></form></div>';
    console.log(searchHTML);
    $(" .balanceAndSearch").html(searchHTML);
}


var debug_el = $("#debug");
function debug(text) {
    debug_el.text(text);
}


    /**
     * requestAnimationFrame and cancel polyfill
     */
     (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }());


    /**
    * super simple carousel
    * animation between panes happens with css transitions
    */
    function Carousel(element)
    {
        var self = this;
        element = $(element);

        var container = $(">ul", element);
        var panes = $(">ul>li", element);

        var pane_width = 0;
        var pane_count = panes.length;

        var current_pane = 0;


        /**
         * initial
         */
         this.init = function() {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function() {
                setPaneDimensions();
                //updateOffset();
            })
        };


        /**
         * set the pane dimensions and scale the container
         */
         function setPaneDimensions() {
            pane_width = element.width();
            panes.each(function() {
                $(this).width(pane_width);
            });
            container.width(pane_width*pane_count);
        };


        /**
         * show pane by index
         */
         this.showPane = function(index, animate) {
            // between the bounds
            index = Math.max(0, Math.min(index, pane_count-1));
            current_pane = index;

            var offset = -((100/pane_count)*current_pane);
            setContainerOffset(offset, animate);
        };


        function setContainerOffset(percent, animate) {
            container.removeClass("animate");

            if(animate) {
                container.addClass("animate");
            }

            if(Modernizr.csstransforms3d) {
                container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
            }
            else if(Modernizr.csstransforms) {
                container.css("transform", "translate("+ percent +"%,0)");
            }
            else {
                var px = ((pane_width*pane_count) / 100) * percent;
                container.css("left", px+"px");
            }
        }

        this.next = function() { return this.showPane(current_pane+1, true); };
        this.prev = function() { return this.showPane(current_pane-1, true); };



        function handleHammer(ev) {
            console.log(ev);
            // disable browser scrolling

            switch(ev.type) {
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var pane_offset = -(100/pane_count)*current_pane;
                    var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                    // slow down at the first and last pane
                    if((current_pane == 0 && ev.gesture.direction == "right") ||
                        (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                        drag_offset *= .4;
                }

                setContainerOffset(drag_offset + pane_offset);
                break;

                case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                ev.gesture.preventDefault();
                break;

                case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                ev.gesture.preventDefault();
                break;

                case 'release':
                    // more then 50% moved, navigate
                    if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
                        if(ev.gesture.direction == 'right') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    }
                    else {
                        self.showPane(current_pane, true);
                    }
                    break;
                }
            }

            var hammertime = new Hammer(element[0], { drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
        }


        var carousel = new Carousel("#carousel");
        carousel.init();