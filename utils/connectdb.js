const mongoose = require('mongoose');

// Connect to Mongodb 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Application has successfully connected to database"))
    .catch(err => console.log(`An error has occurred! ${err}`))
