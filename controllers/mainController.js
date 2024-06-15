// Define a route handler named 'home' for serving the home page
const home = (req, res) => {
  // Uses the Express response object 'res' to render the 'index' view
  // This will look for 'index.ejs' in the views folder if EJS is set as the view engine

  let data = {
    authenticated: req.oidc.isAuthenticated()
  }

  if (req.oidc.isAuthenticated()) {
    let user = req.oidc.user;
    data['user_name'] = user.name;
  }
  res.render('index', { data });

  
};

// Export the 'home' handler to make it available for import in other files,
// enabling its use in setting up routes, typically within an Express router.
module.exports = {
  home
};
