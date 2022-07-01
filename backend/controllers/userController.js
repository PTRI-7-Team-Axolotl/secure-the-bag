const db = require('../models/userModel.js');

const userController = {};

userController.signup = async (req, res, next) => {
    const { email, password } = req.body;
    const params = [email, password]
    const queryType = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING `
    try{
        const values = await db.query(queryType, params)
        res.status(200).send().next()
    } catch(err) {
        console.log(err)
        next(err)
    }
    
}

userController.login = async (req, res, next) => {
    const { email, password } = req.body;
    const params = [email, password]
    const queryType = `INSERT INTO users (email, password) VALUES ($1, $2)`
    try{
        const values = await db.query(queryType, params)
    } catch(err) {
        console.log(err)
        next(err)
    }
    
}
