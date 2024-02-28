let getHomepage = (req, res) => {
    //logic connect to database
    return res.render('index.ejs');
}

module.exports = {
    getHomepage
}