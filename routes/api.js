const router = require("express").Router();
const Workout = require("../models/Workout.js");


router.post("/api/workout", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });


router.put("/api/workout/:id", ({ body, params }, res) => {
    Workout.findOneandUpdate(params.id, {$push: { exercises: body}}, {new: true})
        .then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });

router.get("/api/stats", ({ body }, res) => { 
    Workout.find({})
    .limit(7)
    .sort({ date: 1})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
    res.status(400).json(err);
    });
});


// router.get("/api/stats", ({ body }, res) => { 
    
// });

module.exports = router;