const getUsers = require('./getUsers');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const currentUser = require('./currentUser');

module.exports = {
    getUsers,
    createUser,
    currentUser,
    updateUser,
    deleteUser,
}