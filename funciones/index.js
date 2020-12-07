let fs = require( 'fs' );

let leerDatos = () => {
    let data = [];
    try{
        data = require( '../proyectos.json' );
    }catch( err ){
        data = [];
    }
    return data;
}

let obtenerDatosFormulario = ( req ) => {
    let data = leerDatos();
    let id = data.length == 0 ? 1 : data[ data.length - 1 ].id + 1;
    let newData = {
        id: id,
        nombre: req.body.nombre,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        deleted: 0
    };
    return newData;
}

let guardarDatos = ( data, newData ) => {
    data.push( newData );
    data = JSON.stringify( data );
    fs.writeFile( 'proyectos.json', data, ( err ) => {
        if( err ) throw new Error( 'No se pudo grabar', err );
    });
}

let actualizarDatos = ( newData ) => {
    newData = JSON.stringify( newData );
    fs.writeFile( 'proyectos.json', newData, ( err ) => {
        if( err ) throw new Error( 'No se pudo grabar', err );
    });
}

let borrarDatos = ( id ) => {
    let data = leerDatos();
    let index = data.findIndex( ( el ) => {
        return el.id === id;
    });
    data[ index ].deleted = 1;
    actualizarDatos( data );
}

module.exports = {
    leerDatos: leerDatos,
    obtenerDatosFormulario: obtenerDatosFormulario,
    guardarDatos: guardarDatos,
    actualizarDatos: actualizarDatos,
    borrarDatos: borrarDatos
}
/*
module.exports.leerDatos = leerDatos;
module.exports.obtenerDatosFormulario = obtenerDatosFormulario;
*/