const Hapi = require('hapi');
const admin = require('firebase-admin');

var serviceAccount = require('./firebaseKey/time-keeper-69c3e-3c2ec2b8556d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore()

const server = new Hapi.Server({
  host:'localhost',
  port: 3000
});

//launch the server
const launch = async () => {
  try {
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${server.info.uri}`);
}

launch()

//building a basic route
server.route ({
  method: 'GET',
  path:'/',
  handler: (request, h) => {
    db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        return "check console"
      });
    })
    .catch((err) => {
      console.error("Something went wrong ", err)
    })

    return "Loading Users"
  }
})
