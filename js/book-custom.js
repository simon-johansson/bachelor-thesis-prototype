$(function() {
    Books.init();
    
    var bookTemplate = $('#book-template').text();
    
    bookTemplate = _(bookTemplate).template();
    
    var bookList = document.getElementById('bk-list'),
        dragDistance = 0;
        
    $(bookList).append(bookTemplate({
        color: _(['gray']).sample(),
        imageUrl: 'omslag2.jpg'
    }));
    
    Hammer(bookList).on('dragstart', function(e) {
        dragDistance = 0;
        $('.bk-book').addClass('is-dragging');
    });
    Hammer(bookList).on('dragend', function(e) {
        openBook($('.bk-book'));
    });
    
    Hammer(bookList).on('dragleft', function(e) {
        e.gesture.preventDefault();
        dragDistance = e.gesture.deltaX;
        if (dragDistance < -240) {
            openBook($('.bk-book'));
        } else {
            $('.bk-bookdefault .bk-front').css('-webkit-transform', 'translate3d(0,0,20px) rotate3d(0,1,0,'+(dragDistance/3)+'deg)');
        }
    });
    
    Hammer(bookList).on('dragright', function(e) {
        e.gesture.preventDefault();
        dragDistance = e.gesture.deltaX;
        if (dragDistance > 180) {
            openBook($('.bk-book'));
        } else {
            $('.bk-viewinside .bk-front').css('-webkit-transform', 'translate3d(0,0,20px) rotate3d(0,1,0,'+(-160+dragDistance/3)+'deg)');
        }
    });
    
    function openBook($book) {
        $book.removeClass('is-dragging');
        setTimeout(function() {
            $book.find('.bk-front').css('-webkit-transform', '');
            // bestäm riktning att öppna
            if (dragDistance > 100 || (dragDistance > -100 && dragDistance < 2)) {
                $book.removeClass('bk-viewinside').addClass('bk-bookdefault');
            } else {
                $book.removeClass('bk-bookdefault').addClass('bk-viewinside');
            }
        }, 0);
    }
});