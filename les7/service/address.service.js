const Address = require('../model/Address');

module.exports = {
    findAddresses: (query) => Address.find(query),

    createAddress: (address) => Address.create(address),

    findAddressById: (addressId) => Address.findById(addressId),

    deleteAddress: (addressId) => Address.findByIdAndRemove(addressId),
};
