/* DECLARACIONES */
let express = require( 'express' );
let path = require( 'path' );
let indexRouter = require( './rutas/index' );

/* LLAMADAS A FUNCIONES */
let app = express();

/* MOTOR DE PLANTILLAS */
app.set( 'view engine', 'ejs' );

/* VARIABLES */
app.set( 'port', 3000 );
app.set( 'views', path.join( __dirname, 'vistas' ) );

/* MIDDLEWARES */
app.use( '/', indexRouter );
app.use( '/static', express.static( path.join( __dirname, 'public' ) ) );

app.listen( app.get( 'port' ), () => {
    console.log( `Escuchando el puerto ${ app.get( 'port' ) }` );
});