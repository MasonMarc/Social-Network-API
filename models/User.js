const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: Date, default: Date.now },
  thoughts: { type: Array },
  friends: { type: Array },
  // TODO: add references to thoughts and friends

});


const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

const init = async () => {
  await User.deleteMany({});

  await User.create(
    {
      username: 'useroftheworld',
      email: 'useroftheworld@yahoo.com',
      thoughts: [1, 2, 3],
      friends: [2, 4, 6],
    },
    (err) => (err ? handleError(err) : console.log('Created new user'))
  );
};

init();

module.exports = User;
