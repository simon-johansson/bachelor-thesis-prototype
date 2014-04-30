App = {
    books: DB.books,
    newView: function () {
        if(window.location.hash.length){
            App.ListView.hide();
            App.BookView.show(window.location.hash);
        } else {
            App.BookView.hide();
            App.ListView.show();
        }
    },
    bindEvents: function(){
        $(window).on('hashchange', this.newView);
    },
    init: function(){
        this.bindEvents();

        Books.init();
        App.ListView.init();
        App.BookView.init();
    }
};

App.ListView = {
    hide: function(){
       this.$el.addClass('off-screen');
    },
    show: function(){
        this.$el.removeClass('off-screen');
    },
    renderBookList: function(data){
        this.$bookList.html("");
        App.books.forEach(function(book){
            if (book.show) {
                var $el = $(this.template(book));
                book.$el = $el;
                this.$bookList.append(book.$el);
            }
        }, this);
        App.books.forEach(function(book){
            if (!book.show) {
                var $el = $(this.template(book));
                book.$el = $el;
                this.$bookList.append(book.$el);
            }
        }, this);
    },
    updateShowHide: function(){
        App.books.forEach(function(book){
            if (book.show) {
                book.$el.removeClass('hidden').addClass('shown');
            }
        }, this);
        App.books.forEach(function(book){
            if (!book.show) {
                book.$el.removeClass('shown').addClass('hidden');
            }
        }, this);
    },
    highlighText: function (val) {
        if (val === '') {
            $('span.hightlighted').removeClass('highlighted');
        }
        $('.book-item .title, .book-item .author').each(function(i, el){
            var text = $(el).text();
            text = text.toLowerCase().replace(val, ("<span class='hightlighted'>"+val+"</span>"));
            $(el).html(text);
        });
    },
    newSearch: function () {
        var $this = $(this),
            val = $this.val().toLowerCase();

        if(val.length > 0){
            var booksToShow = [];
            _.find(App.books, function(book){
                if( book.title.toLowerCase().indexOf(val) > -1 ||
                    book.author.toLowerCase().indexOf(val) > -1 ){
                    book.show = true;
                    booksToShow.push(book);
                } else {
                    book.show = false;
                }
            });
            App.ListView.updateShowHide();
            App.ListView.highlighText(val);
        } else {
            _(App.books).each(function(book) {
                book.show = true;
            });
            App.ListView.updateShowHide();
            App.ListView.highlighText('');
        }
    },
    bindEvents: function(){
        this.$searchInput.on('input change', this.newSearch);
    },
    init: function(){
        // Cache elements
        this.$el = $('.list-view');
        this.$bookList =  $('.book-list');
        this.$searchInput = $("input[type='text']");

        this.template = _.template($('#book-list-item').html());

        this.bindEvents();
        this.renderBookList(App.books);
    }
};


App.BookView = {
    hide: function(){
        this.$el.addClass('off-screen');
    },
    show: function(hash){
        var bookIndex = parseInt(hash.slice(1, hash.length));
        this.renderNewBook(bookIndex);
        $('.tooltip').removeClass('hidden');
        this.bindEvents();
        this.$el.removeClass('off-screen');
    },
    renderNewBook: function(index){
        var bookData = App.books[index];
        this.$bookContainer.html("");
        this.$bookContainer.append(this.template(bookData));
    },
    bindEvents: function(){
        var bookList = document.getElementById('bk-list'),
            dragDistance = 0,
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
            var perpendicularDistance = 0; // gör som en cappad ratio av x och y, från -1 till +1
            if (toState === states.none) {
                toState = (state === states.front) ? states.back : states.front;
            }

            if (toState === states.back) {
                if (dragDistance > 120) {
                    openBook($('.bk-book'));
                } else {
                    $('.bk-book').css('-webkit-transform', 'translate3d(0,0,0px) rotate3d('+perpendicularDistance+',1,0,'+dragDistance+'deg)');
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
            $('.tooltip').addClass('hidden');
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
    },
    init: function(){
        // Cache elements
        this.$el = $('.single-book-view');
        this.$bookContainer = this.$el.find('.main');

        this.template = _.template($('#book-template').html());
    }
};

App.init();




















