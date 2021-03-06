const House = require('../dataBase/model/House');
require('../dataBase/model/Address');

module.exports = {
    findHouses: (query) => House.find(query),

    createHouse: (house) => House.create(house),

    findHouseById: (houseId) => House.findById(houseId),

    deleteHouse: (houseId) => House.findByIdAndRemove(houseId),
};
