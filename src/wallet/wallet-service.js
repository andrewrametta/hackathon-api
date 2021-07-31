const WalletService = {
  getAllWallets(knex) {
    return knex
      .select(knex.raw("wallet.*, users.username, users.user_url"))
      .join("users", { "users.id": "wallet.user_id" })
      .from("wallet");
  },

  getWalletByUserId(knex, user_id) {
    return knex.from("wallet").select("*").where("user_id", user_id).first();
  },
};

module.exports = WalletService;
