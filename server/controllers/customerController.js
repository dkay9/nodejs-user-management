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
// Homepage 
exports.addCustomer = async (req, res) => {
    const locals = {
        title: "NodeJs",
        description: "Free NodeJs Management System"
    }

    res.render('customer/add', locals)
}