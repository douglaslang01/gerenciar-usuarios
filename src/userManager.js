const users = ['mathues', 'marcos', 'lucas', 'joão'];

function getUsers() {
    return users;
}

function createUser(user) {
    users.push(user);
}

function updateUser(oldUser, newUser) {
    const index = users.indexOf(oldUser);
    if (index > -1) {
        users[index] = newUser;
    }
}

function deleteUser(user) {
    const index = users.indexOf(user);
    if (index > -1) {
        users.splice(index, 1);
    }
}

function deleteUsers() {
    users.length = 0;
}


module.exports = { getUsers, createUser, updateUser, deleteUser, deleteUsers };