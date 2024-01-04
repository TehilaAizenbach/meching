const mongoose = require("mongoose");
let userDb="t0584161009"
let passDb="jNWfeGbjSUGrRbgK"

main().catch((err) => console.log(err));


async function main() {
    await mongoose.connect(
      'mongodb+srv://t0584161009:jNWfeGbjSUGrRbgK@cluster0.c7amasq.mongodb.net/meching'
    );
    console.log("mongo connect to db");
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }