const users = ['mathues', 'marcos', 'lucas', 'joão'];

function getUsers() {
    return users;
}

function createUser(user) {
    validateUser(user);

    users.push(user);
}

function updateUser(oldUser, newUser) {
    validateUser(newUser);

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

validateUser = (user) => {
    if (user === undefined || user === null || user.trim() === '') {
        throw new Error('Invalid user');
    }

    if (users.includes(user)) {
        throw new Error('User already exists');
    }

    return true;
}

module.exports = { getUsers, createUser, updateUser, deleteUser, deleteUsers };