const router = require('express').Router();
const middleware = require('../middleware');
const controller = require('../controller');

router.get('/users', middleware);
router.post('/users', middleware);
router.put('/users', middleware);
router.delete('/users',middleware)

module.exports=router