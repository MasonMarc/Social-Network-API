const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction',
    },
  ],

},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return Object.keys(this.reactions).length;
  })


const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);

const handleError = (err) => console.error(err);

const init = async () => {
  await Reaction.deleteMany({});
  await Reaction.create(
    {
      reactionBody: 'this is such a good reaction',
      username: 'useroftheworld',
    },
    (err) => (err ? handleError(err) : console.log('Created new reaction'))
  );
  await Thought.deleteMany({});
  await Thought.create(
    {
      thoughtText: 'i have these thoughts',
      username: 'useroftheworld',
    },
    (err) => (err ? handleError(err) : console.log('Created new thought'))
  );

};

init();

module.exports = Thought, Reaction;
