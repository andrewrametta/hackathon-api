const express = require("express");
const xss = require("xss");
const WalletService = require("./wallet-service");
const { requireAuth } = require("../middleware/jwt-auth");

const walletRouter = express.Router();

const serializeWallet = (wallet) => ({
  id: wallet.id,
  user_id: wallet.user_id,
  total: xss(wallet.total),
});

walletRouter.route("/").get(requireAuth, (req, res, next) => {
  const knexInstance = req.app.get("db");

  const user_id = req.user.id;
  WalletService.getWalletByUserId(knexInstance, user_id)
    .then((wallet) => {
      res.json(wallet.map(serializeWallet));
    })
    .catch(next);
});
