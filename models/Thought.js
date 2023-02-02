const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
  // reactionId: { type: ObjectId},
  // TODO: ADD DEFAULT OBJECT ID
  reactionBody: { type: String, required: true },
  username: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: reactionSchema,

});



const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

const init = async () => {
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

module.exports = Thought;
