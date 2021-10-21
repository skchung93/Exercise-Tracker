const router = require("express").Router();
const Workout = require("../models/Workout.js");


router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });


router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findOneandUpdate(params.id, {$push: { exercises: body}}, {new: true})
        .then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });

router.get("/api/workouts/range", (req, res) => { 
    var d = new Date();
    d.setDate(d.getDate()-7);

    Workout.aggregate([
        { $match: { 'day' : {$gt: d}}},
        {
            $addFields:{
                totalDuration: { $sum: "$exercises.duration" },
                // totalWeight: { $sum: "weight" }
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
    Workout.find({})
    .limit(1)
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