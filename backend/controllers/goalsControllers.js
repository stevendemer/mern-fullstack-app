const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

/**
 * 
 * @description Get all goals
 */
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    console.log(JSON.stringify(req.headers));
    return res.status(200).json(goals);
});

/**
 * @desciption Set a new goal
 */
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field !");
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });

    return res.status(201).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found !");
    }

    // check for user
    if (!req.user) {
        return res.status(400).json({ message: "Goal not found !" });
    }

    // make sure the logged in user matches the goal
    if (goal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "User not authorized" });
    }

    // search for a goal and create a new one if it does not exist
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found !");
    }

    // check for user
    if (!req.user) {
        return res.status(401).json({ message: "User not found !" });
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401).json({ message: "User not authorized" });
    }

    await goal.remove();
    // id will be used in the front end
    return res.status(200).json({ message: "Deleted successfully", id: req.params.id });
});

module.exports = {
    getGoals,
    deleteGoal,
    updateGoal,
    setGoal
};

