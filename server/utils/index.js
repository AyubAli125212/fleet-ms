const loadRoutes = (app, routes) => {
  routes.forEach(({ path, route }) => app.use(path, route));
};

module.exports = {
  loadRoutes,
};
