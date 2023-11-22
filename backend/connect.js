// const mongoose = require("mongoose");

// async function connectToMongoDB(url, options = {}) {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     ...options,
//   });
// }

// module.exports = {
//   connectToMongoDB,
// };




const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};
