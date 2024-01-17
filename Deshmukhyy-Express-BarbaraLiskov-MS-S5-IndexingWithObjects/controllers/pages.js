const pagesController = module.exports;

pagesController.getHomePage = async (req, res) => {
    res.render('index', { title: 'Dashboard' });
}

pagesController.login = async (req, res) => {
    res.render('login', { title: 'Login' });
}

pagesController.user = async (req, res) => {
    res.render('app/user/index', { title: 'User' });
}

pagesController.userdashboard = async (req, res) => {
    res.render('app/user/dashboard', { title: 'Dashboard' });
}

pagesController.organizer = async (req, res) => {
    res.render('app/organizer/index', { title: 'Organizer' });
}

pagesController.create = async (req, res) => {
    res.render('app/organizer/create', { title: 'Create' });
}


