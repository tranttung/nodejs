import CRUDService from "../services/CRUDService"
import db from '../models/index'
export const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage', {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body)

    return res.send('postcrud')
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    res.render('displayCRUD', {
        dataTable: data
    })
}
module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD
}
