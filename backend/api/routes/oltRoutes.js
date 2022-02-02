const oltBuilder = require('../controllers/oltController');

module.exports = app => {
    app
        .route('/olts')
        .get(oltBuilder.list_all_olt)
        .post(oltBuilder.create_a_olt);
    app
        .route('/olts/:oltId')
        .get(oltBuilder.read_a_olt)
        .put(oltBuilder.update_a_olt)
        .delete(oltBuilder.delete_a_olt);
    app
        .route('/olts/pons/:oltId')
        .get(oltBuilder.read_a_pon);
}