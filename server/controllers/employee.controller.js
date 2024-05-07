const express = require('express')
const router = express.Router()

const Accounts = require('../models/employee.model')
const { generateCrudMethods } = require('../services')
const accountsCrud = generateCrudMethods(Accounts)
const { validateDbId, raiseRecord404Error } = require('../middlewares');


router.get('/', (req, res, next) => {
    accountsCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.get('/:id', validateDbId, (req, res, next) => {
    accountsCrud.getById(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    const newRecord = {
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age,
    }
    accountsCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res) => {
    const udpatedRecord = {
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age,
    }
    accountsCrud.update(req.params.id, udpatedRecord)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/:id', validateDbId, (req, res) => {
    accountsCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})


module.exports = router