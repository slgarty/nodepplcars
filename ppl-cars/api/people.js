const router = require('express').Router();
const peopleDb = require('../db/people');

router.get('/getall', async (req, res) => {
    console.log("See Me")
    peopleDb.getAll();

    const people = await peopleDb.getAll();
    res.json(people);
})

router.post('/addperson', async (req, res) => {
    await peopleDb.addPerson(req.body);
    res.json({ status: 'ok' });
})

router.get('/getperson', async (req, res) => {
    const person = await peopleDb.getPerson(req.query.id);
    res.json(person);
})

router.post('/addcar', async (req, res) => {
    await peopleDb.addCar(req.body);
    res.json({ status: 'ok' });
})

router.get('/getcars', async (req, res) => {
    const cars = await peopleDb.getCars(req.query.personId);
    res.json(cars);
})

router.post('/deletecars', async (req, res) => {
    await peopleDb.deleteCars(req.body);
    res.json({ status: 'ok' });
});


module.exports = router;