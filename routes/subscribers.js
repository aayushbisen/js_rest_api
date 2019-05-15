const express = require('express')
const router = express.Router()
const subSchema = require('../models/subscriber')

// Get all subs
router.get('/',async (req, res) => {
    try {
        const subscribers = await subSchema.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// get one sub
router.get('/:id',  getSub ,(req, res) => {
    res.json(res.subscriber)
})

// create one sub
router.post('/', async (req, res) => {
    const subscriber = new subSchema({
        name: req.body.name,
        subTo: req.body.subTo
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// update one sub
router.patch('/:id', getSub, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name,
        res.subscriber.subTo = req.body.subTo
    }
    try {
        const updatedSub = await res.subscriber.save()
        res.json(updatedSub)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// delete one
router.delete('/:id', getSub, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted subscriber.' })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


async function getSub(req, res, next) {
    let subscriber;
    try {
        subscriber = await subSchema.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({
                message: 'Cannot find subscriber.'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.subscriber = subscriber
    next()
}



module.exports = router




