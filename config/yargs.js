const descripcion = {
    demand: true,
    alias: 'd'
}

const opts1 = {
    descripcion
}

const opts2 = {
    descripcion,
    completado: {
        alias: 'c',
        default: true
    }
}



const argv = require('yargs')
    .command('crear', 'crear tarea', opts1)
    .command('actualizar', 'actualizar tarea', opts2)
    .command('borrar', 'borrar tarea', opts1)
    .help()
    .argv;


module.exports = {
    argv
}