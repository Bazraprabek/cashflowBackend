class FrontEndPage {
  static renderMainHomePage(app) {
    app.get("/", (req, res) => {
      res.status(200).send("<h1>Welcome to CashFlow server!</h1>");
    });
    // app.get("/*", (req, res) => {
    //   res.status(200).send("<h1>Page was not found!</h1>");
    // });
  }

  static renderBankPages(app) {
    app.get("/api/bank", (req, res) => {
      res.status(200).send("<h1>Welcome to Bank Home Page</h1>");
    });

    app.get("/api/bank/getAllBank/*", (req, res) => {
      res.status(200).send("<h1>Sorry the page was not found</h1>");
    });
  }

  static renderWalletPages(app) {
    app.get("/api/wallet", (req, res) => {
      res.status(200).send("<h1>Welcome to Wallet Home Page</h1>");
    });

    app.get("/api/wallet/getAllWallet/*", (req, res) => {
      res.status(200).send("<h1>Sorry the page was not found</h1>");
    });
  }
}

module.exports = FrontEndPage;
