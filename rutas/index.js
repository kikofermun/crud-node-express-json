let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let router = express.Router();
let funciones = require( '../funciones/index' );
let traducciones = require( '../lang/es/traducciones.json' );
let langs = [ "es", "en" ];
let lang = "es";

router.use( bodyParser.urlencoded({ extended: true } ) );

router.get( '/:lang?/nuevo', ( req, res ) => {
    if( req.params.lang ){
        traducciones = require( '../lang/' + req.params.lang + '/traducciones.json' );
        lang = req.params.lang;
    }
    res.render( 'nuevo', { traducciones: traducciones, lang: lang } );
});

router.post( '/:lang?/guardar', ( req, res ) => {
    if( req.params.lang ){
        traducciones = require( '../lang/' + req.params.lang + '/traducciones.json' );
        lang = req.params.lang;
        
    }
    let data = funciones.leerDatos();
    let newData = funciones.obtenerDatosFormulario( req );
    funciones.guardarDatos( data, newData );
    data = funciones.leerDatos();
    data = data.filter( ( el ) => {
        return el.deleted !== 1;
    });
    res.redirect( '/' + lang );
});

router.post( '/:lang?/actualizar/:id', ( req, res ) => {
    if( req.params.lang ){
        traducciones = require( '../lang/' + req.params.lang + '/traducciones.json' );
        lang = req.params.lang;
    }
    let id = parseInt( req.params.id );
    let data = funciones.leerDatos();
    let index = data.findIndex( ( el ) => {
        return el.id === id;
    });
    data[ index ].nombre = req.body.nombre;
    data[ index ].fecha_inicio = req.body.fecha_inicio;
    data[ index ].fecha_fin = req.body.fecha_fin;
    data[ index ].deleted = 0;
    funciones.actualizarDatos( data );
    data = data.filter( ( el ) => {
        return el.deleted !== 1;
    });
    res.render( 'tablaDatos', { datos: data, traducciones: traducciones, lang: lang } );
});

router.get( '/:lang?/borrar/:id', ( req, res ) => {
    if( req.params.lang ){
        traducciones = require( '../lang/' + req.params.lang + '/traducciones.json' );
        lang = req.params.lang;
    }
    let id = parseInt( req.params.id );
    funciones.borrarDatos( id );
    let data = funciones.leerDatos();
    data = data.filter( ( el ) => {
        return el.deleted !== 1;
    });
    res.render( 'tablaDatos', { datos: data, traducciones: traducciones, lang: lang } );
});

router.get( '/:lang?', ( req, res ) => {
    if( req.params.lang ){
        traducciones = require( '../lang/' + req.params.lang + '/traducciones.json' );
        lang = req.params.lang;
    }
    let data = funciones.leerDatos();
    data = data.filter( ( el ) => {
        return el.deleted !== 1;
    });
    res.render( 'tablaDatos', { datos: data, traducciones: traducciones, lang: lang } );
});

module.exports = router;