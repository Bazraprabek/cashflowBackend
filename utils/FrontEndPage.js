const { renderSuccessPage } = require("./Template");

class FrontEndPage {
  static renderMainHomePage(app) {
    renderSuccessPage(app, "/", "Welcome to CashFlow server!!");
  }

  static renderBankPages(app) {
    renderSuccessPage(app, "/api/bank", "Welcome to Bank Home Page !!!");

    renderSuccessPage(app, "/api/getAllBank", "ALl Bank Page !!!");
  }

  static renderWalletPages(app) {
    renderSuccessPage(app, "/api/wallet", "Welcome to Wallet Home Page !!!");
    renderSuccessPage(app, "/api/wallet/getAllWallet", "ALl Wallet Page !!!");
  }

  static renderPageNotFound(app) {
    renderSuccessPage(
      app,
      "*",
      "Given path's page is missing. Try Something Different !!!"
    );
  }
}

module.exports = FrontEndPage;
