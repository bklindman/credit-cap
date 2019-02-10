var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

module.exports= {
  mongoose
};
