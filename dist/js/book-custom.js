
    
    var bookList = document.getElementById('bk-list');

    var dragDistance = 0,
        states = {
            front: 'front',
            back: 'back',
            inside: 'inside',
            none: 'none'
        },
        state = states.front,
        toState = undefined;

    Hammer(bookList).on('dragstart', function(e) {
        dragDistance = 0;
        $('.bk-book').removeClass('rotate-in-animation');
        $('.bk-book').addClass('is-dragging');
        var $book = $('.bk-book');
        if ($book.hasClass('bk-viewback')) {
            state = states.back;
        } else if ($book.hasClass('bk-viewinside')) {
            state = states.inside;
        } else {
            state = states.front;
        };
        toState = states.none;
    });

    Hammer(bookList).on('dragend', function(e) {
        if (toState) {
            openBook($('.bk-book'));
        }
    });

    Hammer(bookList).on('dragleft', function(e) {
        e.gesture.preventDefault();
        dragDistance = e.gesture.deltaX;
        if (toState === states.none) {
            toState = (state === states.back) ? states.front : states.inside;
        }

        if (toState === states.front) {
            if (dragDistance < -180) {
                openBook($('.bk-book'));
            } else {
                $('.bk-book').css('-webkit-transform', 'translate3d(0,0,0px) rotate3d(0,1,0,'+(180+dragDistance)+'deg)');
            }
        }
        if (toState === states.inside) {
            if (dragDistance < -240) {
                openBook($('.bk-book'));
            } else {
                $('.bk-bookdefault .bk-front').css('-webkit-transform', 'translate3d(0,0,20px) rotate3d(0,1,0,'+(dragDistance/3)+'deg)');
            }
        }
    });

    Hammer(bookList).on('dragright', function(e) {
        e.gesture.preventDefault();
        dragDistance = e.gesture.deltaX;
        if (toState === states.none) {
            toState = (state === states.front) ? states.back : states.front;
        }

        if (toState === states.back) {
            if (dragDistance > 120) {
                openBook($('.bk-book'));
            } else {
                $('.bk-book').css('-webkit-transform', 'translate3d(0,0,0px) rotate3d(0,1,0,'+dragDistance+'deg)');
            }
        }

        if (toState === states.front) {
            if (dragDistance > 180) {
                openBook($('.bk-viewinside'));
            } else {
                $('.bk-viewinside .bk-front').css('-webkit-transform', 'translate3d(0,0,20px) rotate3d(0,1,0,'+(-160+dragDistance/3)+'deg)');
            }
        }
    });

    function openBook($book) {
        $book.removeClass('is-dragging');
        setTimeout(function() {
            $book.find('.bk-front').css('-webkit-transform', '');
            $book.css('-webkit-transform', '');
            // bestäm riktning att öppna
            if (dragDistance > 100 || (dragDistance > -100 && dragDistance < 2)) {
                // vi ska åt höger
                if (toState === states.back) {
                    $('.bk-bookdefault').removeClass('bk-bookdefault').addClass('bk-viewback');
                } else {
                    $('.bk-viewinside').removeClass('bk-viewinside').addClass('bk-bookdefault');
                }
            } else {
                // vi ska åt vänster
                if (toState === states.inside) {
                    $('.bk-bookdefault').removeClass('bk-bookdefault').addClass('bk-viewinside');
                } else {
                    $('.bk-viewback').removeClass('bk-viewback').addClass('bk-bookdefault');
                }
            }
            toState = undefined;
        }, 0);
    }
