DB = {};
var books =[
    {
        imageURL: "https://www.adlibris.com/images/1241532/odla-i-pallkrage.jpg",
        title: "Odla i pallkrage",
        author: "Eva Robild",
        description: "Pallkragen passar lika bra i täppan på landet som i villakvarteret och på bakgården i stan. Den kan bli ett permanent inslag i trädgården eller fungera som en tillfällig odlingsyta. Inte att undra på att den i dag är den vanligaste formen för grönsaksodling i mindre skala att odla i pallkrage har blivit en folkrörelse.",
        price: "567",
        color: "#472"
    },
    {
        imageURL: "https://www.adlibris.com/images/2845108/med-kansla-for-barns-sjalvkansla.jpg",
        title: "Med känsla för barns självkänsla",
        author: "Petra Krantz Lindgren",
        description: "Så löd rubriken på ett inlägg som jag skrev på min blogg vid ett tillfälle. I inlägget beskrev jag ett samtal som jag hade haft med min sjuåriga dotter, där jag frågade henne om hon älskade sig själv. Hon svarade att hon oftast gjorde det, men att hon kände sig dum när jag pratade med arg röst till henne och ?när jag känner mig dum är det svårt för mig att älska mig själv?.",
        price: "299",
        color: "#a5d0d9"
    },
    {
        imageURL: "https://www.adlibris.com/images/2735283/jakten-pa-kapten-klanning.jpg",
        title: "Jakten på Kapten klänning",
        author: "Jonas Trolle",
        description: "I juli 2009 knuffas en man ut från sjätte våningen i ett hus i Stockholmsförorten Bredäng. Polisens mordutredning avslöjar att den döde mannen hade en böjelse för våldsamt gruppsex. I förhör säger ett av hans unga kvinnliga offer att en av förövarna är polis. Hon visar fram en tidningsbild. Polisen Jonas Trolle får en chock. Mannen på fotografiet är Göran Lindberg, Kapten Klänning, rektor på Polishögskolan, en förkämpe för jämställdhet som arbetat mot kränkningar och sexism.",
        price: "188",
        color: "#921"
    },
    {
        imageURL: "https://www.adlibris.com/images/41118/traning-for-nyblivna-mammor.jpg",
        title: "Träning för nyblivna mammor",
        author: "Olga Rönnberg",
        description: "Träning för nyblivna mammor innehåller ett tydligt träningsprogram som visar hur du steg för steg kommer tillbaka till din gamla kropp - eller kanske till en ännu starkare och snyggare version av dig själv! Övningarna är lättillgänglig hemmaträning.",
        price: "186",
        color: "#445"
    },
    {
        imageURL: "https://www.adlibris.com/images/5830132/jag-heter-inte-miriam.jpg",
        title: "Jag heter inte Miriam",
        author: "Majgull Axelsson",
        description: "Majgull Axelsson är tillbaka med en ny gripande roman. Jag heter inte Miriam är en stark roman om identitet, utanförskap och mörka hemligheter av en av Sveriges största författare.",
        price: "169",
        color: "#da0"
    }
];

books.forEach(function(book, index){
    var MAX_LEN = 150;
    book.index = index;
    if(book.description.length > MAX_LEN){
        book.shortDescription =  book.description.slice(0, MAX_LEN);
        book.shortDescription += "...";
    }
});

DB.books = books;