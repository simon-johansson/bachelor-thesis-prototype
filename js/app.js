App = {
    books: DB.books,
    tags: DB.tags,
    filterTags: [],
    newView: function () {
        if(window.location.hash.length){
            App.ListView.hide();
            App.BookView.show(window.location.hash);
        } else {
            App.BookView.hide();
            App.ListView.show();
        }
    },
    fastClick: function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },
    bindEvents: function(){
        $(window).on('hashchange', this.newView);
    },
    init: function(){
        this.bindEvents();
        this.fastClick();

        Books.init();
        App.ListView.init();
        App.BookView.init();
    },
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
                if (book.hideTitle === false) {
                    book.$el.removeClass('hide-title');
                } else {
                    book.$el.addClass('hide-title');
                }
            }
        }, this);
        App.books.forEach(function(book){
            if (!book.show) {
                book.$el.removeClass('shown').addClass('hidden hide-title');
            }
        }, this);
    },
    highlighText: function (val) {
        if (val === '') {
            $('span.highlighted').removeClass('highlighted');
        }
        $('.book-item .title, .book-item .author').each(function(i, el){
            var text = $(el).text(),
                regX = new RegExp(val, "i");
            var search = text.match(regX);
            text = text.replace(search, ("<span class='highlighted'>"+search+"</span>"));
            $(el).html(text);
        });
    },
    newSearch: function () {
        var $this = $(this),
            val = $this.val();

        if(val.length > 0){
            $('.search-box input').removeClass('has-no-text');
            var booksToShow = [];
            _.find(App.books, function(book){
                if( book.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    book.author.toLowerCase().indexOf(val.toLowerCase()) > -1 ){
                    book.show = true;
                    book.hideTitle = false;
                    booksToShow.push(book);
                } else {
                    book.show = false;
                }
            });
            App.ListView.highlighText(val);
        } else {
            $('.search-box input').addClass('has-no-text');
            _(App.books).each(function(book) {
                book.show = true;
                book.hideTitle = true;
            });
            App.ListView.highlighText('');
        }
        App.ListView.updateShowHide();
    },
    newTagFilter: function () {
        var $this = $(this);
        console.log($this.text());
        App.ListView.$searchInput.val("");

        $this.toggleClass('selected');
        if($this.hasClass('selected')){
            App.filterTags.push($this.text());
        } else {
            var index = _.indexOf(App.filterTags, $this.text());
            App.filterTags.splice(index, 1);
        }

        console.log(App.filterTags.length);
        if(App.filterTags.length){
            var booksToShow = [];
            App.books.forEach(function(book){
                for(var i = 0; i <= book.tags.length; i += 1){
                    console.log(book.tags[i]);
                    var tag = book.tags[i];
                    if( App.filterTags.indexOf(tag) !== -1 ){
                        book.show = true;
                        booksToShow.push(book);
                        break
                    } else {
                        book.show = false;
                    }
                }
            });
        } else {
            _(App.books).each(function(book) {
                book.show = true;
            });
        }
        App.ListView.updateShowHide();
    },
    bindEvents: function(){
        this.$searchInput.on('input change', this.newSearch);
        $('.tag').on('click', this.newTagFilter);
    },
    renderTags: function () {
        App.tags.forEach(function(el){
            var span = $('<span>').addClass('tag').text(el);
            $('.tags').append(span);
        });
    },
    init: function(){
        // Cache elements
        this.$el = $('.list-view');
        this.$bookList =  $('.book-list');
        this.$searchInput = $("input[type='text']");

        this.template = _.template($('#book-list-item').html());

        this.renderBookList(App.books);
        this.renderTags();
        this.bindEvents();
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
            $(this).find('.tease').removeClass('tease');
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

        $(".js-add-to-cart").on('click', function(){
            $(".bk-list").addClass("on-top");

            $(".bk-book")
                .addClass('bk-viewside')
                .find('.bk-front')
                    .removeClass('tease');

            setTimeout(function(){
                $(".bk-book").addClass('bk-viewside added-to-cart')
                $('.no-more-book').removeClass('not-no-more-book');
            }, 500)
        });
    },
    init: function(){
        // Cache elements
        this.$el = $('.single-book-view');
        this.$bookContainer = this.$el.find('.main');

        this.template = _.template($('#book-template').html());
    }
};

App.init();





