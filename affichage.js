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

    ajouterStyling( carrousel )

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
    // Accéder à la feuille CSS contenant les règles pour le carrousel
    const style_sheet = Array.from(document.styleSheets).filter((sheet) => sheet.href?.includes('carrousel.css'))[0];

    let idx;
    let regle;
    
    // Contenu des slides
    idx = 0;
    carrousel.slides.forEach(( slide ) => style_sheet.insertRule(`.${carrousel._id + idx++} {background: ${ slide.couleur }}\n`));

    // Ajout des rgèles pour les labels de navigation
    idx = 0;
    regle = "";
    carrousel.slides.forEach(() => {
        const id = carrousel._id +  idx;
        regle += `#${id}:checked ~ .navigation label[for="${id}"]${idx < carrousel.slides.length - 1 ? "," : " {\nbackground: rgba(0,0,0,.5);\n}"}\n`;
        idx++
    });
    style_sheet.insertRule(regle);

    // Ajout des règles pour les labels en flèche
    idx = 0;
    regle = "";
    carrousel.slides.forEach(() => {
        const id = carrousel._id +  idx;
        regle += `#${id}:checked ~ .fleche label[for="${
            carrousel._id + (idx - 1 >= 0 ? idx - 1 : carrousel.slides.length - 1)
        }"].prev,\n#${id}:checked ~ .fleche label[for="${
            carrousel._id + (idx + 1 < carrousel.slides.length ? idx + 1 : 0)
        }"].next${idx < carrousel.slides.length - 1 ? "," : " {\ndisplay: block;\n}"}\n`;
        idx++
    });
    style_sheet.insertRule(regle);
}