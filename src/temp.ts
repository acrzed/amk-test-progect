// const MongoClient = require("mongodb").MongoClient;
//
// const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
//
// mongoClient.connect(function(err, client){
//
//     const db = client.db(dbn);
//     const collection = db.collection("users");
//     let user = {name: "Tom", age: 23};
//
//     collection.insertOne(user, function(err, result){
//
//         if(err){
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//     });
// })

// mongoose.connect('mongodb://localhost/' + dbn,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log(`MongoDB подключён к базе ${dbn}`)
//         //addDB
//     })
//     .catch(e => console.log(e))


// const MongoClient = require("mongodb").MongoClient;
//
// const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
//
// mongoClient.connect(function(err, client){
//
//     const db = client.db("usersdb");
//     const collection = db.collection("users");
//     let user = {name: "Tom", age: 23};
//     collection.insertOne(user, function(err, result){
//
//         if(err){
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//     });
// });



