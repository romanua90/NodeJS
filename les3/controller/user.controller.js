const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum.js');

module.exports = {
    getAllUsers: async (req, res) => {
        try{
            
        const {body: {prefLang = 'de'}} = req;
            
        const users = await userService.findUsers(prefLang);
            
        res.json(users);
        }
        catch (err){
            
        res.status(errorCodes.BAD_REQUEST).json(err.message);
            
        }
    },

    getSingleUser: async (req, res) => {
        try{
            
        const {params: {userId}, body: {prefLang = 'de'}} = req;
                      
        const user = await userService.findUserById(userId, prefLang);

        res.json(user);
        }
        catch (err) {
            
         res.status(errorCodes.BAD_REQUEST).json(err.message);
            
        }
    },
    createUser: async (req, res) => {
        try {
            
        const user = req.body;

        await userService.createUser(user);

        res.status(201).json('USER IS CREATED!');
        }
        catch (err){
         res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
        const {userId} = req.params;
        
        const user = await userService.deleteUser(userId);

        res.json(user);
        }
        catch (err){
          res.status(errorCodes.BAD_REQUEST).json(err.message);   
        }
    }
}
