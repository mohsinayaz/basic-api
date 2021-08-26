const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/notes-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect(
//   "mongodb+srv://mohsin-ayaz:<password>@cluster0.sfx99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("db is now connected");
});
