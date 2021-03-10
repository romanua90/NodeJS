const House = require('../model/House');
require('../model/Address');

module.exports = {
    findHouses: (query) => House.find(query),

    createHouse: (house) => House.create(house),

    findHouseById: (houseId) => House.findById(houseId),

    deleteHouse: (houseId) => House.findByIdAndRemove(houseId),
};
