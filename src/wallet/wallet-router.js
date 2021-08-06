const express = require("express");
const xss = require("xss");
const WalletService = require("./wallet-service");
const { requireAuth } = require("../middleware/jwt-auth");

const walletRouter = express.Router();

const serializeWallet = (wallet) => ({
  id: wallet.id,
  total: xss(wallet.total),
  user_id: wallet.user_id,
  username: wallet.username,
  userUrl: wallet.user_url,
});

walletRouter
  .route("/")
  .get((req, res, next) => {
    WalletService.getAllWallets(req.app.get("db"))
      .then((wallets) => {
        res.json(wallets.map(serializeWallet));
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
          .json(serializeWallet(wallet));
      })
      .catch(next);
  });

walletRouter.route("/:wallet_id").patch((req, res, next) => {
  const { total } = req.body;
  const walletToUpdate = { total };
  const numberOfValues = Object.values(walletToUpdate).filter(Boolean).length;
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message: `Request body must contain 'total'`,
      },
    });
  }
  const id = req.params.wallet_id;
  WalletService.updateWallet(req.app.get("db"), id, walletToUpdate)
    .then((rowsAffected) => {
      res.status(204).json({ ...walletToUpdate, id: req.params.id });
    })
    .catch(next);
});

module.exports = walletRouter;
