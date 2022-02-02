const userBilder = require('../controllers/userController');

module.exports = app => {
    app
        .route('/users')
        .get(userBilder.list_all_user)
        .post(userBilder.create_a_user);
    app
        .route('/users/:userId')
        .get(userBilder.read_a_user)
        .put(userBilder.update_a_user)
        .delete(userBilder.delete_a_user);
}