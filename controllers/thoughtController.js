const { Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findById(req.params.thoughtId, function (err, event) {
      if (!err) {
        if (!event) {
          res.sendStatus(404).send('No thought with that ID').end();
        }
        else {
          event.reactions.push(req.params.body);
          event.markModified('reactions');
          event.save(function (error, saveevent) {
            if (!error) {
              res.status(200).send(saveevent);
            } else {
              res.status(400).send(error.message);
            }
          });
        }
      } else {
        res.status(400).send(err.message);
      }
    });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true }, function (err) {
      if (err) return res.send(500, { error: err });
      return res.send('Saved changes');
    })
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID' })
          : Thought.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .catch((err) => res.status(500).json(err));
  },
};
