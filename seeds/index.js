const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedhelpers');
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser : true,
    // useCreateIndex: true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

// for(let i = 0; i < 50; i++)
// {
//     console.log(cities[i].city, cities[i].state);
// }

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 12; i++)
    {
        const price = Math.floor(Math.random() * 20) + 1000+i;

        const camp = new Campground({
            title: `${cities[i].place}`,
            author : '6295ad3e1a03cc81ee914161',
            location : `${cities[i].loc}`, 
            description : `${cities[i].des}`,
            price,
            geometry : {
                "type" : "Point", 
                "coordinates" : [
                    cities[i].longitude,
                    cities[i].latitude,
                ]
            },
            images : [
                {
                    url: `${cities[i].image}`,
                    filename: 'YelpCamp',
                }             
              ]
        })

        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});

