const {
  renderBankPages,
  renderMainHomePage,
  renderWalletPages,
  renderPageNotFound,
} = require("../utils/FrontEndPage");

class ServerStarter {
  renderPages(app) {
    renderBankPages(app);
    renderMainHomePage(app);
    renderWalletPages(app);
    renderPageNotFound(app);
  }

  static async startServer(app, db) {
    const port = process.env.PORT || 3333;

    new ServerStarter().renderPages(app);
    try {
      await db.authenticate();
      console.log(
        "Connection to the database has been established successfully."
      );
      await db.sync({ alter: true });
      console.log("Database synced successfully.");

      app.listen(port, () => {
        console.log(`Server is running on ${port}`);
      });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = ServerStarter;
