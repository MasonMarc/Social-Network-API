const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  updateReaction,
  deleteThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

router.route('/:thoughtId').put(updateThought);

router.route('/:thoughtId').delete(deleteThought);

module.exports = router;
