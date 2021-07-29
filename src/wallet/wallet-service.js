const WalletService = {
  getWalletByUserId(knex, user_id) {
    return knex.from("wallet").select("*").where("user_id", user_id).first();
  },
};

module.exports = WalletService;
