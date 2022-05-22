const express = require('express');
const goalRouter = express.Router();
const { getGoals, updateGoal, setGoal, deleteGoal } = require('../controllers/goalsControllers');
const { protect } = require('../middleware/authMiddleware');

goalRouter.route('/').get(protect, getGoals).post(protect, setGoal);

goalRouter.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = goalRouter;