document.addEventListener( 'DOMContentLoaded', () => {
    document.querySelectorAll( '.editar, .cancelar' ).forEach( ( el ) => {
        el.addEventListener( 'click', () => {
            let id = parseInt( el.className.split( " " )[ 1 ].substr( 3 ) );
            document.querySelector( '.datos' + id ).classList.toggle( 'd-none' );
            document.querySelector( '.form' + id ).classList.toggle( 'd-none' );
        });
    });
});