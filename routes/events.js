/*
    Event Routes
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEventos, eliminarEventos } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear un evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de finalización es obligatorio').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// Actualizar eventos
router.put('/:id', actualizarEventos);

// Obtener eventos
router.delete('/:id', eliminarEventos);


module.exports = router;