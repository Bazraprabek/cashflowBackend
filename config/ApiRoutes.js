class ApiRoutes {
  constructor(fs, path, app) {
    fs.readdir(path.join(__dirname, "../routes"), (err, files) => {
      files.forEach((f, i) => {
        if (f.includes(".route.js")) {
          let name = f.replace(".route.js", "");
          let url = "/api/" + name;
          app.use(url, require("../routes/" + f));
        }
      });
    });
  }
}

module.exports = ApiRoutes;
