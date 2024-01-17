const database = require("../../database");
const { collections } = require("../../database");
const { ObjectId } = require("mongodb");
const utilities = require("../../utilities")

const update = module.exports;
const validStatus = ['interested', 'waiting', 'notInterested']; //interested, waiting, notInterested

update.logic = async (req) => {
    const { userId } = req.user;
    const { status } = req.body;
    const id = req.params.id;

    const searchKeys = { uid:userId };
    const payload = {}
    if (!validStatus.includes(status)) throw new Error("Invalid status supplied!");
    if (!ObjectId.isValid(id)) throw new Error("Invalid request ID!")
    
    searchKeys._id = new ObjectId(id);
    payload.status = status;
    payload.updatedAt = utilities.getISOTimestamp();

    await database.client.collection(collections.MOVIEJJ).findOneAndUpdate(searchKeys, { $set:payload});
};