const data = [
    {
        _id: "carrousel1",
        titre: "Carrousel 1",
        slides: [
            {
                _id: "test1",
                couleur: "blue"
            },
            {
                _id: "test2",
                couleur: "yellow"
            },
            {
                _id: "test3",
                couleur: "pink"
            }
        ]
        // slides: [ "test1", "test2", "test3" ]
    },
    {
        _id: "carrousel2",
        titre: "Carrousel 2",
        slides: [
            {
                _id: "test4",
                couleur: 'green'
            },
            {
                _id: "test5",
                couleur: 'red'
            },
            {
                _id: "test6",
                couleur: 'gold'
            }
        ]
        // slides: [ "test4", "test5", "test6" ]
    }
];

function initialisation() {
    const main = document.querySelector('main');
    console.log('main', main);
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
    carrousel.slides.forEach(( slide ) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = carrousel._id;
        radio.id = slide._id;
        radios.push( radio );
    });
    return radios;
}

function afficherSlides( carrousel ) {
    const div = document.createElement('div');
    div.classList.add('slides');
    carrousel.slides.forEach(( slide ) => {
        div.appendChild( afficherSlide( slide ));
    })
    return div;
}

function afficherSlide( slide ) {
    const div = document.createElement('div');
    div.classList.add(slide._id);
    return div;
}

function afficherFleches( carrousel ) {
    const div = document.createElement('div');
    div.classList.add( 'fleche' );
    carrousel.slides.forEach(( slide ) => {
        div.appendChild( creerFleche( slide, 'prev' ));
        div.appendChild( creerFleche( slide, 'next' ));
    })
    return div;
}

function creerFleche( slide, direction ) {
    const label = document.createElement( 'label' );
    label.htmlFor = slide._id;
    label.classList.add( direction );
    label.innerHTML = direction == 'prev' ? "&#x276E;" : "&#x276F;";
    return label;
}

function afficherNavigation( carrousel ) {
    const div = document.createElement( 'div' );
    div.classList.add( 'navigation' );
    carrousel.slides.forEach(( slide ) => {
        div.appendChild( creerLabelNavigation( slide ));
    })
    return div; 
}

function creerLabelNavigation( slide ) {
    const label = document.createElement( 'label' );
    label.htmlFor = slide._id;
    return label;
}

function ajouterStyling( carrousel ) {
    const style = document.createElement( 'style' );
    let contenu = "";
    carrousel.slides.forEach(( slide ) => contenu += `.${slide._id} {background: ${ slide.couleur }}\n`);
    console.log('contenu', contenu)
    style.innerHTML = contenu;
    return style;
}