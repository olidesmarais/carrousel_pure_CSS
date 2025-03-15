const data = [
    {
        _id: "premierCarrousel",
        titre: "Carrousel 1",
        slides: [
            {
                couleur: "blue"
            },
            {
                couleur: "yellow"
            },
            {
                couleur: "pink"
            }
        ]
    },
    {
        _id: "deuxiemeCarrousel",
        titre: "Carrousel 2",
        slides: [
            {
                couleur: 'green'
            },
            {
                couleur: 'red'
            },
            {
                couleur: 'gold'
            }
        ]
    }
];

function initialisation() {
    const main = document.querySelector('main');
    data.forEach(( carrousel ) => {
        main.appendChild( afficherSegment(carrousel) );
    })
}

function afficherSegment( carrousel ) {
    const div = document.createElement('div');
    div.id = carrousel._id;
    div.appendChild( afficherTitre( carrousel.titre ) );
    div.appendChild( afficherCarrousel( carrousel ) );
    div.appendChild( ajouterStyling( carrousel ));
    return div;
}

function afficherTitre( titre ) {
    const h2 = document.createElement('h2');
    h2.textContent = titre;
    return h2;
}

function afficherCarrousel( carrousel ) {
    let div = document.createElement('div');
    div.classList.add('carrousel');

    // Ajouter des input radios
    const radios = creerRadios( carrousel );
    radios[0].checked = true;
    radios.forEach(( radio ) => {
        div.appendChild(radio);
    })
    
    // Afficher les slides
    div.append( afficherSlides( carrousel ));

    // Afficher les flèches
    div.appendChild( afficherFleches( carrousel ));

    // Afficher les labels de navigation
    div.appendChild( afficherNavigation( carrousel ));

    return div;
}

function creerRadios( carrousel ) {
    const radios = [];
    let idx = 0;
    carrousel.slides.forEach(( slide ) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = carrousel._id;
        radio.id = carrousel._id + idx++;
        radios.push( radio );
    });
    return radios;
}

function afficherSlides( carrousel ) {
    const div = document.createElement('div');
    div.classList.add('slides');
    let idx = 0;
    carrousel.slides.forEach(( slide ) => {
        div.appendChild( afficherSlide( carrousel._id + idx++ ));
    })
    return div;
}

function afficherSlide( id ) {
    const div = document.createElement('div');
    div.classList.add( id );
    return div;
}

function afficherFleches( carrousel ) {
    const div = document.createElement('div');
    let idx = 0;
    div.classList.add( 'fleche' );
    carrousel.slides.forEach(( slide ) => {
        div.appendChild( creerFleche( carrousel._id + idx , 'prev' ));
        div.appendChild( creerFleche( carrousel._id + idx++, 'next' ));
    })
    return div;
}

function creerFleche( id, direction ) {
    const label = document.createElement( 'label' );
    label.htmlFor = id;
    label.classList.add( direction );
    label.innerHTML = direction == 'prev' ? "&#x276E;" : "&#x276F;";
    return label;
}

function afficherNavigation( carrousel ) {
    const div = document.createElement( 'div' );
    let idx = 0;

    div.classList.add( 'navigation' );

    carrousel.slides.forEach(( ) => {
        div.appendChild( creerLabelNavigation( carrousel._id + idx++ ));
    })
    return div; 
}

function creerLabelNavigation( id ) {
    const label = document.createElement( 'label' );
    label.htmlFor = id;
    return label;
}

function ajouterStyling( carrousel ) {
    const style_sheets = Array.from(document.styleSheets)
    const style_sheet = style_sheets.filter((sheet) => sheet.href?.includes('carrousel.css'))[0];
    // const style_sheet = new CSSStyleSheet();
    // style_sheet.replaceSync("* { color: red!important}");
    
    
    const style = document.createElement( 'style' );
    let idx;
    let regle;
    let contenu = "";
    
    // Contenu des slides
    idx = 0;
    regle = "";
    contenu = "";
    // carrousel.slides.forEach(( slide ) => {
    //     console.log(`.${carrousel._id + idx++} {background: ${ slide.couleur }}\n`)
    //     // style_sheet.replaceSync(`.${carrousel._id + idx++} {background: ${ slide.couleur }}\n`)
    // });
    carrousel.slides.forEach(( slide ) => style_sheet.insertRule(`.${carrousel._id + idx++} {background: ${ slide.couleur }}\n`));
    // carrousel.slides.forEach(( slide ) => regle += `.${carrousel._id + idx++} {background: ${ slide.couleur }}\n`);
    // console.log( 'regle', regle)
    // style_sheet.replaceSync(regle);
    // carrousel.slides.forEach(( slide ) => contenu += `.${carrousel._id + idx++} {background: ${ slide.couleur }}\n`);

    // Navigation
    idx = 0;
    carrousel.slides.forEach(() => {
        const id = carrousel._id +  idx;
        contenu += `#${id}:checked ~ .navigation label[for="${id}"]${idx < carrousel.slides.length - 1 ? "," : " {\nbackground: rgba(0,0,0,.5);\n}"}\n`;
        idx++
    });

    // Flèches
    idx = 0;
    carrousel.slides.forEach(() => {
        const id = carrousel._id +  idx;
        contenu += `#${id}:checked ~ .fleche label[for="${
            carrousel._id + (idx - 1 >= 0 ? idx - 1 : carrousel.slides.length - 1)
        }"].prev,\n#${id}:checked ~ .fleche label[for="${
            carrousel._id + (idx + 1 < carrousel.slides.length ? idx + 1 : 0)
        }"].next${idx < carrousel.slides.length - 1 ? "," : " {\ndisplay: block;\n}"}\n`;
        idx++
    });
    
    style.innerHTML = contenu;

    // document.adoptedStyleSheets = [style_sheet];

    // NE SERA PLUS NÉCESSAIRE
    return style;
}