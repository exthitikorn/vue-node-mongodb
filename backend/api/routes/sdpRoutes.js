const sdpBilder = require('../controllers/sdpController');

module.exports = app => {
    app
        .route('/sdps')
        .get(sdpBilder.list_all_sdp)
        .post(sdpBilder.create_a_sdp);
    app
        .route('/sdps/:sdpId')
        .get(sdpBilder.read_a_sdp)
        .put(sdpBilder.update_a_sdp)
        .delete(sdpBilder.delete_a_sdp);
    app
        .route('/sdps/customers/:sdpId')
        .get(sdpBilder.read_a_customer);
    
}