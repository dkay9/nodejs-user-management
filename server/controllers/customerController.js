// GET 
// Homepage 

exports.homepage = async (req, res) => {
    const locals = {
        title: "NodeJs",
        description: "Free NodeJs Management System"
    }

    res.render('index', locals)
}