const router = require("express").Router();
const db = require("../models");
// const Workout = require("../models/Workout.js");


router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });


router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(params.id, {$push: { exercises: body}}, {new: true})
        .then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });

router.get("/api/workouts/range", ({params}, res) => { 
    var d = new Date();
    d.setDate(d.getDate()-10);
    db.Workout.aggregate([
        { 
            $match: { 'day' : {$gte: d}},
        },    
        {
            $addFields:{
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
    res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => { 
    db.Workout.find({})
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