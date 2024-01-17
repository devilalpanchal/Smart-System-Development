const database = require("../../database");
const { collections } = require("../../database");
const utilities = require("../../utilities")

const read = module.exports;

read.logic = async (req) => {
    
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 0;
    const offset = page*limit;
    const key = {}

    const [count, requests] = await Promise.all([
        database.client.collection(collections.MOVIEJJ).countDocuments(key),
        database.client.collection(collections.MOVIEJJ).find(key).skip(offset).limit(limit).toArray()
    ]);

    const collection = await Promise.all(requests.map(async item => {
        const {uid} = item;
        const user = await database.client.collection(collections.USERS).findOne({userId: uid});
        item.user = utilities.filterObjectByKeys(user, ['username', 'email'])
        return item;
    }));

    return utilities.paginate(`/api/app${req.url}`, collection, count, limit, page);
};