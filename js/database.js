DB = {};
var books =[
    {
        imageURL: "https://www.adlibris.com/images/1241532/odla-i-pallkrage.jpg",
        title: "Odla i pallkrage",
        author: "Eva Robild",
        description: "Pallkragen passar lika bra i täppan på landet som i villakvarteret och på bakgården i stan. Den kan bli ett permanent inslag i trädgården eller fungera som en tillfällig odlingsyta. Inte att undra på att den i dag är den vanligaste formen för grönsaksodling i mindre skala att odla i pallkrage har blivit en folkrörelse."
    },
    {
        imageURL: "https://www.adlibris.com/images/2845108/med-kansla-for-barns-sjalvkansla.jpg",
        title: "Med känsla för barns självkänsla",
        author: "Petra Krantz Lindgren",
        description: "Så löd rubriken på ett inlägg som jag skrev på min blogg vid ett tillfälle. I inlägget beskrev jag ett samtal som jag hade haft med min sjuåriga dotter, där jag frågade henne om hon älskade sig själv. Hon svarade att hon oftast gjorde det, men att hon kände sig dum när jag pratade med arg röst till henne och ?när jag känner mig dum är det svårt för mig att älska mig själv?."
    }
];

books.forEach(function(book){
    var MAX_LEN = 200;
    if(book.description.length > MAX_LEN){
        book.description =  book.description.slice(0, MAX_LEN);
        book.description += "...";
    }
});

DB.books = books;