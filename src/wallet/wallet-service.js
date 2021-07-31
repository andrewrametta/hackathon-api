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

  insertWallet(knex, newWallet) {
    return knex
      .insert(newWallet)
      .into("wallet")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = WalletService;
