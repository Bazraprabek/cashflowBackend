class Template {
  static renderSuccessPage(app, path, message) {
    app.get(path, (req, res) => {
      res.status(200).send(`<h1>${message}</h1>`);
    });
  }
}

module.exports = Template;
