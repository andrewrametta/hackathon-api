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

walletRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get("db");

    const user_id = req.user.id;
    WalletService.getWalletByUserId(knexInstance, user_id)
      .then((wallet) => {
        res.json(wallet.map(serializeWallet));
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    const { total } = req.body;
    const newWallet = { total };

    for (const [key, value] of Object.entries(newWallet))
      if (value == null)
        return res.status(400).json({
          error: { message: `'${key}' is required` },
        });
    newWallet.user_id = req.user.id;
    WalletService.insertWallet(req.app.get("db"), newWallet)
      .then((wallet) => {
        res
          .status(201)
          .location(`/wallet/${wallet.id}`)
          .json(serializeItem(wallet));
      })
      .catch(next);
  });
