const ponBilder = require('../controllers/ponController');

module.exports = app => {
    app
        .route('/pons')
        .get(ponBilder.list_all_pon)
        .post(ponBilder.create_a_pon);
    app
        .route('/pons/:ponId')
        .get(ponBilder.read_a_pon)
        .put(ponBilder.update_a_pon)
        .delete(ponBilder.delete_a_pon);
    app
        .route('/pons/ofcccs/:ponId')
        .get(ponBilder.read_a_ofccc);
}