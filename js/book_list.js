App = {
    books: [
        {
            imageURL: "http://",
            title: "Lord of the Rings",
            author: "Tolkien",
            description: "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorem eum id neque nobis nulla perferendis qui soluta vero voluptates."
        },
        {
            imageURL: "http://",
            title: "Hobbit",
            author: "Tolkien",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorem eum id neque nobis nulla perferendis qui soluta vero voluptates."
        }
    ],
    listTemplate: _.template($('#book-template').html()),
    renderBookList: function(data){
        var $listView =  $('.list-view');
        $listView.html("");
        data.forEach(function(el){
            $listView.append(this.listTemplate(el));
        }, this);
    },
    newSearch: function () {
        var $this = $(this),
            val = $this.val().toLowerCase();

        if(val.length > 0){
            var booksToShow = [];
            _.find(App.books, function(book){
                if(book.title.toLowerCase().indexOf(val) > -1){
                    booksToShow.push(book);
                }
            });
            App.renderBookList(booksToShow);
        } else {
            App.renderBookList(App.books);
        }
    },
    bindEvents: function(){
        $("input[type='text']").on('input change', App.newSearch);
    },
    init: function(){
        this.bindEvents();
        this.renderBookList(this.books);
    }
};

App.init();
