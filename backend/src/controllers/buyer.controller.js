const { getBuyersWithPagination } = require("../models/buyer.model");

exports.getBuyers = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, search = "" } = req.query;

        const offset = (page - 1) * limit;

        const buyers = await getBuyersWithPagination(
            userId,
            search,
            +limit,
            +offset
        );

        res.json(buyers);
    } catch (err) {
        next(err);
    }
};
