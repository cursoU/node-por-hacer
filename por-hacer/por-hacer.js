const fs = require('fs');
const colors = require('colors');


let listadoPorHacer = [];

const guardarDB = () => {

    /*  if (!listadoPorHacer) { */
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {

        if (err) throw new Error('No se pudo grabar', err);
        /*  reject(err)
        else
            resolve(`data guarda`); */

    });
    /* } */


}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);


    guardarDB();

    return listadoPorHacer;
}

const getlistado = () => {
    cargarDB();
    let textofull = "";
    let estado = "Pendiente";
    for (const items of listadoPorHacer) {

        if (items.completado) {
            estado = "Completado";
        }
        textofull += colors.green('=======Por Hacer============\n');
        textofull += colors.white(`Tarea: ${items.descripcion}\n`);
        textofull += colors.white(`Estado: ${estado}\n`);
        textofull += colors.green(`============================\n`);
    }

    return textofull;

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        console.log(listadoPorHacer[index].completado);
        guardarDB();
        return true;
    } else {
        return false;
    }

}


const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {

        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }

}




module.exports = {
    crear,
    getlistado,
    actualizar,
    borrar
}