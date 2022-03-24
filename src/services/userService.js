import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

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


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let exist = await checkUserEmail(email)
            if (exist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: {
                        email: email
                    },
                    raw: true
                })
                if (user) {

                    let check = bcrypt.compareSync(password, user.password); // true
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'ok'
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User is not found`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your'email is not exist in system`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ""
            if (userId === "ALL") {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let cteateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: "your email is exist in system, please try another email"
                })
            } else {
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
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: {
                id: userId
            }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: "User is not exist"
            })
        }
        await db.User.destroy({
            where: {
                id: userId
            }
        })
        resolve({
            errCode: 0,
            errMessage: "ok"
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        if (!data.id || !data.roleId || !data.positionId || !data.gender) {
            resolve({
                errCode: 2,
                errMessage: "missing parameter"
            })
        }
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                }
            })
            if (user) {
                const checkdataImg = () => {
                    if (data.avatar) {
                        return data.avatar
                    }
                }
                await db.User.update({
                    lastName: data.lastName,
                    address: data.address,
                    firstName: data.firstName,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    gender: data.gender,
                    phonenumber: data.phonenumber,
                    image: checkdataImg()
                }, {
                    where: {
                        id: data.id
                    }
                });
                resolve({
                    errCode: 0,
                    errMessage: "ok"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "user not found"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin,
    getAllUsers,
    cteateNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService
}

