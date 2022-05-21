const asyncHandler = require('express-async-handler');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description Get all goals
 */
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get goals" })
});

/**
 * @param {*} req 
 * @param {*} res 
 * @desciption Set a new goal
 */
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field !");
    }
    res.status(200).json({ message: `Set a new goal` })
});

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update a goal with an id of ${req.params.id}` })
});

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete a goal with an id of ${req.params.id}` })
});

module.exports = {
    getGoals,
    deleteGoal,
    updateGoal,
    setGoal
};

