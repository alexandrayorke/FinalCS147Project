var locked_scroll = false;
var last_pos = 0;

document.getElementById('searchBar').addEventListener('focus', function(event){
    console.log('set locked');
    locked_scroll = true;
    last_pos = document.getElementById('wrapper').scrollTop
});

document.getElementById('searchBar').addEventListener('blur', function(event){
    console.log('set unlocked');
    locked_scroll = false;
});

document.getElementById('wrapper').addEventListener("scroll", function(event){
    
    if(locked_scroll) {
        event.target.scrollTop = last_pos;
    }
    
}, true);