const Customer = require('../models/Customer')
const mongoose = require('mongoose')

// GET 
// Homepage 

exports.homepage = async (req, res) => {
        const messages = await req.flash('info')
        const locals = {
            title: "NodeJs",
            description: "Free NodeJs Management System"
        }

        let perPage = 12
        let page =  req.query.page || 1
    
        try {
            const customers = await Customer.aggregate([ { $sort: { updatedAt: 1 } } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

            const count = await Customer.countDocuments({})
            res.render("index", {
                locals, 
                customers,
                current: page,
                pages: Math.ceil(count / perPage),
                messages
            }) 

        } catch (error) {
            console.log(error)
        }
    
    }

// exports.homepage = async (req, res) => {
//     const messages = await req.flash('info')
//     const locals = {
//         title: "NodeJs",
//         description: "Free NodeJs Management System"
//     }

//     try {
//         const customers = await Customer.find({}).limit(22)
//         res.render('index', { locals, messages, customers })
//     } catch (error) {
//         console.log(error)
//     }

// }

// GET 
// New customer form 
exports.addCustomer = async (req, res) => {
    const locals = {
        title: "NodeJs",
        description: "Free NodeJs Management System"
    }

    res.render('customer/add', locals)
}

// POST
// Create New customer
exports.postCustomer = async (req, res) => {

    console.log(req.body)
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        details: req.body.details,
        email: req.body.email,
    })

    try {
        await Customer.create(newCustomer)
        await req.flash('info', 'New customer has been added.')

        res.redirect('/')
    } catch (error) {
        console.log(error)
    }

}

// GET
// Customer Data
exports.view = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id })

        const locals = {
            title: "View Customer Data",
            description: "Free NodeJs User Management System"
        }

        res.render('customer/view', {
            locals,
            customer
        })
    } catch (error) {
        console.log(error)
    }
}