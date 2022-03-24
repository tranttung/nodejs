import bcrypt from 'bcryptjs'
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
                positionId: data.positionId
            })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }


    })
}
let getAllUser = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll()
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser,
    getAllUser
}