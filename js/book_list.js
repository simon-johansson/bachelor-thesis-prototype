App = {
    books: DB.books,
    listTemplate: _.template($('#book-template').html()),
    renderBookList: function(data){
        var $listView =  $('.book-list');
        $listView.html("");
        data.forEach(function(el){
            $listView.append(this.listTemplate(el));
        }, this);
    },
    highlighText: function (val) {
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
                    booksToShow.push(book);
                }
            });
            App.renderBookList(booksToShow);
            App.highlighText(val);
        } else {
            App.renderBookList(App.books);
        }
    },
    newView: function (ev) {
        if(window.location.hash.length){
            $('.list-view').addClass('hide');
        } else {
            $('.list-view').removeClass('hide');
        }

    },
    bindEvents: function(){
        $("input[type='text']").on('input change', App.newSearch);
        $(window).on('hashchange', App.newView);
    },
    init: function(){
        this.bindEvents();
        this.renderBookList(this.books);
    }
};

App.init();
