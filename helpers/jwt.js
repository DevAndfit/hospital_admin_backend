const jwt = require('jsonwebtoken');


const generateJWT = async ( uid ) => {

    const payload = { uid };

    return jwt.sign( payload, process.env.JWT_SEED, { expiresIn:"12h"});
};

module.exports = {
    generateJWT
}