document.addEventListener('DOMContentLoaded', function(){ 
   var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var getHeader = document.querySelector('.header');
    var navbarHeight = getHeader.offsetHeight;

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
   
   function getScrollTop(){
       if(typeof pageYOffset!= 'undefined'){
           //most browsers except IE before #9
           return pageYOffset;
       }
       else{
           var B= document.body; //IE 'quirks'
           var D= document.documentElement; //IE with doctype
           D= (D.clientHeight)? D: B;
           return D.scrollTop;
       }
   }

   scrollTop = getScrollTop();
   console.log(scrollTop);

    function hasScrolled() {
        var st = window.scrollTop;

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta) {
           return;
        }

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            getHeader.classList.remove('nav-down').classList.add('nav-up');
        } else {
            // Scroll Up
            if(st + window.offsetHeight < document.offsetHeight) {
               getHeader.classList.remove('nav-up').classList.add('nav-down');
            }
        }

        lastScrollTop = st;
    }

    function bindEventListeners() {
        window.addEventListener('scroll', function(){
            didScroll = true;
            getScrollTop();
        })
    }

    function init() {
        bindEventListeners();
    }

    init();

}, false);
