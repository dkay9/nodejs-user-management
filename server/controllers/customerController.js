const Customer = require('../models/Customer')
const mongoose = require('mongoose')

// GET 
// Homepage 

exports.homepage = async (req, res) => {
    const locals = {
        title: "NodeJs",
        description: "Free NodeJs Management System"
    }

    res.render('index', locals)
}

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
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }

}