
/*
"Barnböcker"
"Biografier & Memoarer"
"Datorer & IT"
"Deckare"
"Djur & Natur"
"Ekonomi & Juridik"
"Familj & Hälsa"
"Filosofi & Religion"
"Geografiska områden"
"Hem & Trädgård"
"Historia & Arkeologi"
"Humor & Presentböcker"
"Kokböcker"
"Konst & Musik"
"Litteraturvetenskap"
"Medicin"
"Naturvetenskap & Teknik"
"Ordböcker & Språk"
"Psykologi & Pedagogik"
"Resor & Geografi"
"Samhälle & Politik"
"Serier & Grafiska romaner"
"Skönlitteratur"
"Sport & Fritid"
"Student"
"Tonår & Unga vuxna"
"Uppslagsverk"
*/


DB = {};
var tags = [];
var books =[
    {
        imageURL: "img/omslag/odla-i-pallkrage.jpg",
        title: "Odla i pallkrage",
        author: "Eva Robild",
        description: "Pallkragen passar lika bra i täppan på landet som i villakvarteret och på bakgården i stan. Den kan bli ett permanent inslag i trädgården eller fungera som en tillfällig odlingsyta. Inte att undra på att den i dag är den vanligaste formen för grönsaksodling i mindre skala att odla i pallkrage har blivit en folkrörelse.",
        price: "567",
        color: "#472",
        tags: ["Hem & Trädgård"],
    },
    {
        imageURL: "img/omslag/med-kansla-for-barns-sjalvkansla.jpg",
        title: "Med känsla för barns självkänsla",
        author: "Petra Krantz Lindgren",
        description: "Så löd rubriken på ett inlägg som jag skrev på min blogg vid ett tillfälle. I inlägget beskrev jag ett samtal som jag hade haft med min sjuåriga dotter, där jag frågade henne om hon älskade sig själv. Hon svarade att hon oftast gjorde det, men att hon kände sig dum när jag pratade med arg röst till henne och ?när jag känner mig dum är det svårt för mig att älska mig själv?.",
        price: "299",
        color: "#a5d0d9",
        tags: ["Familj & Hälsa", "Psykologi & Pedagogik"],
    },
    {
        imageURL: "img/omslag/jakten-pa-kapten-klanning.jpg",
        title: "Jakten på Kapten klänning",
        author: "Jonas Trolle",
        description: "I juli 2009 knuffas en man ut från sjätte våningen i ett hus i Stockholmsförorten Bredäng. Polisens mordutredning avslöjar att den döde mannen hade en böjelse för våldsamt gruppsex. I förhör säger ett av hans unga kvinnliga offer att en av förövarna är polis. Hon visar fram en tidningsbild. Polisen Jonas Trolle får en chock. Mannen på fotografiet är Göran Lindberg, Kapten Klänning, rektor på Polishögskolan, en förkämpe för jämställdhet som arbetat mot kränkningar och sexism.",
        price: "188",
        color: "#921",
        tags: ["Psykologi & Pedagogik"],
    },
    {
        imageURL: "img/omslag/traning-for-nyblivna-mammor.jpg",
        title: "Träning för nyblivna mammor",
        author: "Olga Rönnberg",
        description: "Träning för nyblivna mammor innehåller ett tydligt träningsprogram som visar hur du steg för steg kommer tillbaka till din gamla kropp - eller kanske till en ännu starkare och snyggare version av dig själv! Övningarna är lättillgänglig hemmaträning.",
        price: "186",
        color: "#445",
        tags: ["Familj & Hälsa"],
    },
    {
        imageURL: "img/omslag/jag-heter-inte-miriam.jpg",
        title: "Jag heter inte Miriam",
        author: "Majgull Axelsson",
        description: "Majgull Axelsson är tillbaka med en ny gripande roman. Jag heter inte Miriam är en stark roman om identitet, utanförskap och mörka hemligheter av en av Sveriges största författare.",
        price: "169",
        color: "#da0",
        tags: ["Skönlitteratur"],
    },
    {
        imageURL: "img/omslag/viktiga-kartor-for-aventyrare-och-dagdrommare.jpg",
        title: "Viktiga kartor: för äventyrare och dagdrömmare",
        author: "Sarah Sheppard",
        description: "Sarah Sheppard är expert på fantasifulla, humoristiska, inspirerande faktaböcker för barn. Hennes dinosaurieböcker är levande legender. Nu är hon tillbaka med en riktig drömbok för nyfikna kartresenärer som vill uppleva spänning och faror utan att på riktigt riskera liv och lem. Var hittar man giftiga djur, mystiska platser, ädelstenar, skatter, vulkaner, jordbävningar, de högsta bergen och de djupaste delarna av haven? Efter att ha läst denna äventyrsatlas vet man precis vart man ska åka om man vill uppleva äventyr på riktigt eller få nytt bränsle till sina dagdrömmar. En unik kartbok som ger läsaren hjärtklappning över allt fantastiskt, spännande och mystiskt som finns på vår planet!",
        price: "117",
        color: "#A4C4EC",
        tags: ["Barnböcker", "Resor & Geografi"],
    },
    {
        imageURL: "img/omslag/skymningens-barfotabarn.jpg",
        title: "Skymningens barfotabarn",
        author: "Anna Jansson",
        description: "Den 90-årige Heinz Meyer hittas skjuten i Ronehamn. Vem vill mörda en 90-åring? Och varför? Heinz Meyer var en av de tyska soldater som kom till Gotland efter andra världskriget, skadad i strider vid Baltikum. Vid samma tid kom 500 koncentrationslägerfångar till ön, för att få vård på Lärbro krigssjukhus. Det var en spökbrigad av utmärglade, svårt psykiskt och fysiskt skadade fångar som placerades på samma sjukhus som de tyska soldaterna. Sköter­skorna fick stränga order att inte tala med patienterna från koncentrationslägren och hade ingen aning om vad de hade varit med om.",
        price: "129",
        color: "#E1D1B4",
        tags: ["Skönlitteratur", "Deckare"],
    },
    {
        imageURL: "img/omslag/in-i-labyrinten.jpg",
        title: "In i labyrinten",
        author: "Sigge Eklund",
        description: "En majkväll försvinner elvaåriga Magda Horn från sitt hem medan föräldrarna äter middag på en restaurang i närheten. Trots att hon är föremål för så många gräl, så många sorger och omsorger, har hon egentligen varit osynlig länge. Hennes pappa, den uppburne förläggaren, och hennes mamma, den engagerade psykologen, är mästare på att spegla sig själva och att spegla sig i varandra. Men ingen ser Magda. Och en dag är hon borta.",
        price: "177",
        color: "#D82858",
        tags: ["Skönlitteratur"],
    },
    {
        imageURL: "img/omslag/den-sanna-historien-om-pinocchios-nasa-en-roman-om-ett-brott.jpg",
        title: "Den sanna historien om Pinocchios näsa: en roman om ett brott",
        author: "Leif G. W. Persson",
        description: 'Leif GW Persson, kriminolog och författare, är tillbaka med sin elfte bok. Han har sedan sjuttiotalet varit en av våra ledande brottsexperter, inte minst som professor i polisforskning vid Rikspolisstyrelsen. Nu kommer Den sanna historien om Pinocchios näsa. "Den här romanen är en ond saga för vuxna barn och om det inte hade varit för den siste tsaren av Ryssland, Nikolaj II, Englands premiärminister Sir Winston Churchill, Rysslands president Vladimir Putin och kriminalkommissarie Evert Bäckström vid Västerortspolisen i Stockholm, skulle det som den handlar om aldrig ha hänt. I den meningen är det en berättelse om det samlade och slutliga resultatet av de handlingar som fyra män genomför över en period på mer än hundra år. Fyra män som aldrig träffade varandra, som förvisso levde sina liv i skilda världar, och där den äldste av dem blev mördad fyrtio år innan den yngste av dem ens var född. Och som så ofta förr, oavsett i vilket sällskap eller sammanhang som han nu har hamnat, är det också Evert Bäckström som kommer att sätta punkt för historien."',
        price: "198",
        color: "#18100B",
        tags: ["Skönlitteratur", "Deckare"],
    },
    {
        imageURL: "img/omslag/green-kitchen-stories-lackra-vegetariska-vardagsrecept.jpg",
        title: "Green kitchen stories: läckra vegetariska vardagsrecept",
        author: "David Frenkiel & Luise Vindahl",
        description: 'David Frenkiel och Luise Vindahl står för nydanande och spännande vegetarisk mat. Deras succéblogg Green Kitchen Stories inspirerar folk över hela världen att laga god och nyttig vege­tarisk mat med naturliga ingredienser. I kokboken Green Kitchen Stories finns över 100 av deras läckraste favoritrecept. Genom att kombinera vanliga skafferivaror och färska råvaror i säsong visar David och Luise hur lätt det är att laga närings­rika och välbalanserade rätter varje dag.',
        price: "208",
        color: "#C8AE91",
        tags: ["Kokböcker"],
    },
    {
        imageURL: "img/omslag/rally-och-lyra.jpg",
        title: "Rally och Lyra",
        author: "Marie Norin",
        description: 'Rally och Lyra är kompisar. De leker alla dagar. Först på förskolan. Sen hemma. Ibland hos Rally. Ibland hos Lyra. Idag har Rally med sig sin nalle Nalla hem till Lyra. De leker och leker. När Rally går hem glömmer hon Nalla. Hon ligger där på golvet och är så fin och mjuk och luktar gott. Hon får sova hos Lyra. I alla fall i natt Rally och Lyra är en både poetisk och vardaglig berättelse om djup vänskap, avundsjuka, kärlek och ägande, och hur det kan bli när saker bara - blir! (3-6 år)',
        price: "94",
        color: "#CDCBB9",
        tags: ["Barnböcker"],
    },
    {
        imageURL: "img/omslag/till-traden.jpg",
        title: "Till träden",
        author: "Åsa Ottosson, Mats Ottosson & Roine Magnusson",
        description: 'Man ser inte skogen för bara träd, heter det i det gamla ordstävet. Men det kan vara tvärtom också: att man inte ser träden för bara skog. Man missar individerna. Det vore synd, träden är ju personligheter samtidigt som de är en del av ett vackert kollektiv; något större. På det viset, och många fler, påminner de om människor. Till träden är en bok i samma anda som Roine Magnussons och Mats och Åsa Ottossons förra samarbete Kor en kärlekshistoria; en hyllning till några som står oss närmare än de flesta inser.',
        price: "261",
        color: "#989C9D",
        tags: ["Resor & Geografi"],
    },
    {
        imageURL: "img/omslag/underbara-dagar-framfor-oss-en-biografi-over-olof-palme.jpg",
        title: "Underbara dagar framför oss : en biografi över Olof Palme",
        author: "Henrik Berggren",
        description: 'Detta är den stora, definitiva och internationellt gångbara boken om Olof Palme och hans tid. Den rör sig från tysta lägenheter på Östermalm i Stockholm till kokande metropoler i Sydostasien, från privata internatskolor till socialdemokratiska kursgårdar, från lantligt herrgårdsliv i Sörmland till sjaskiga drugstores i den amerikanska södern. ',
        price: "89",
        color: "#040404",
        tags: ["Biografier & Memoarer"],
    },
    {
        imageURL: "img/omslag/html-och-css-boken.jpg",
        title: "HTML och CSS-boken",
        author: "Rolf Staflin",
        description: 'Boken börjar från grunden och innehåller allt du behöver veta för att skriva webbsidor. Författaren beskriver systematiskt, med hundratals exempel, hur du lägger in rätt taggar så att dina webbsidor får det utseende och den funktion du vill. Du kan ha stor glädje av att kunna HTML även om du använder andra program som skapar HTML-kod, eller översätter färdiga dokument till HTML.',
        price: "195",
        color: "#0C0410",
        tags: ["Datorer & IT"],
    },
    {
        imageURL: "img/omslag/livet.jpg",
        title: "Livet",
        author: "Keith Richards",
        description: 'Som gitarrist och låtskrivare i Rolling Stones skapade Keith Richards låtarna som skakade världen, och han levde - och lever fortfarande - den ursprungliga rock n’ roll-livsstilen. Nu berättar äntligen huvudpersonen själv om sitt stormiga liv. Hur han var besatt av att lyssna på skivor med Chuck Berry och Muddy Waters, lärde sig att spela gitarr och bildade band tillsammans med Mick Jagger och Brian Jones. Om när Rolling Stones blev berömda och om de ökända knarktillslagen som förtjänade honom bilden som fredlös folkhjälte. Hur han skrev odödliga riff, som de i Jumping Jack Flash och Honky Tonk Women. Om kärleken till Anita Pallenberg och om Brian Jones död. Om skatteflykten till Frankrike, ihärdiga turnéer över USA, isolering och missbruk. Om kärleken till Patti Hansen. Om det bittra uppbrottet med Mick Jagger och hur de så småningom blev sams igen. Om äktenskap, familj, soloalbum och Xpensive Winos, och ”the road that goes on forever”. ',
        price: "29",
        color: "#444539",
        tags: ["Biografier & Memoarer"],
    }

];

books = _.shuffle(books);
books.forEach(function(book, index){
    var descriptionLen = 150;
    var titleLen = 50;
    book.index = index;
    book.show = true;
    book.hideTitle = true;
    if(book.description.length > descriptionLen){
        book.shortDescription =  book.description.slice(0, descriptionLen);
        book.shortDescription += "...";
    }
    book.shortTitle = book.title;
    if(book.shortTitle.length > titleLen){
        book.shortTitle =  book.title.slice(0, titleLen);
    }

    tags = _.union(book.tags, tags);
});

DB.books = books;
DB.tags = tags;
