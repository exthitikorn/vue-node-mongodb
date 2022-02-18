const cusBilder = require('../controllers/customerController');

module.exports = app => {
    app
        .route('/customers')
        .get(cusBilder.list_all_cus)
        .post(cusBilder.create_a_cus);
    app
        .route('/customers/:cusId')
        .get(cusBilder.read_a_cus)
        .put(cusBilder.update_a_cus)
        .delete(cusBilder.delete_a_cus);
}