const database = require("../../database");
const { collections } = require("../../database");
const utilities = require("../../utilities")

const create = module.exports;

//Create API to create a Request coming from the user
create.logic = async (req) => {

    /*
        Step-1: Get the user ID from the person who is using the application.
        Tech World: Extracting the logged-in user information from the incoming request.
    */
    const { userId } = req.user;

    /* 
        Step-2: Taking details like category, requirement, time, and fare from the user's request
        Tech World: Extracting the variable's data from the incoming request body 
    */
    const { moviename, category, time, duration, fare ,streetaddress} = req.body;

    /* 
        Step-4: Making a note of the current time.
        Tech World: Generating a timestamp using utility function for future reference.
   */
    const timestamp = utilities.getISOTimestamp();

    /*
        Step-3: Making a package with the user's ID, current time, and an initial 'approved' status.
        Tech World: Creating a payload object to store information for database insertion. 
    */

    const movie = {
        uid: userId,
        moviename: moviename,
        category: category,
        time: time,
        duration: duration,
        fare: fare,
        streetaddress:streetaddress,
        createdAt: timestamp,
        updatedAt: timestamp,
        status: 'waiting'
    };

    /* 
    Step 5: Saving the movie details.
    Tech World: Using MongoDB to insert the payload (movie information) into a collection named 'MOVIES.'
    Additional Info 1: 'database.client.collection' refers to a MongoDB collection and 'collections.MOVIES' holds the collection name
    Additional Info 2: The 'insertOne' method is used to add a single document to the MongoDB collection.
    */

    return await database.client.collection(collections.MOVIEJJ).insertOne(movie);
};