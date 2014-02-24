// with help from http://tympanus.net/codrops/2013/04/17/slide-and-push-menus/

var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
        body = document.body;
 
showLeft.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( body, 'cbp-spmenu-push-toright' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    disableOther( 'showLeft' );
};

function disableOther( button ) {
    if( button !== 'showLeft' ) {
        classie.toggle( showLeft, 'disabled' );
    }
}

var classie = {
    toggle: toggleClass
}

function toggleClass(elem, c) {
    var hasClass = null;
    if (elem.classList.contains(c)) {
        hasClass = true;
    } else {
        hasClass = false;
    }

    if (hasClass) {
        elem.classList.remove(c);
    } else {
        elem.classList.add(c);
    }

}