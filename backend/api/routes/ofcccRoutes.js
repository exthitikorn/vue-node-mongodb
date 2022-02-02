const ofcccBilder = require('../controllers/ofcccController');

module.exports = app => {
    app
        .route('/ofcccs')
        .get(ofcccBilder.list_all_ofccc)
        .post(ofcccBilder.create_a_ofccc);
    app
        .route('/ofcccs/:ofcccId')
        .get(ofcccBilder.read_a_ofccc)
        .put(ofcccBilder.update_a_ofccc)
        .delete(ofcccBilder.delete_a_ofccc);
    app
        .route('/ofcccs/sdps/:ofcccId')
        .get(ofcccBilder.read_a_sdp);
}