const users = [{
    name: 'matheus',
    mail: 'matheus@mail.com'
},
{
    name: 'marcos',
    mail: 'marcos@mail.com'
},
{
    name: 'lucas',
    mail: 'lucas@mail.com'
},
{
    name: 'joão',
    mail: 'joao@mail.com'
}
];


function getUsers() {
    return users;
}

function createUser(user) {
    validateUser(user);

    users.push(user);
}

function updateUser(oldUser, newUser) {
    validateUser(newUser);

    const index = findUser(oldUser);
    if (index > -1) {
        users[index] = newUser;
    }
}

function deleteUser(user) {
    const index = findUser(user);
    if (index > -1) {
        users.splice(index, 1);
    }
}

function deleteUsers() {
    users.length = 0;
}

findUser = (user) => users.findIndex(u => u.name === user.name && u.mail === user.mail);

validateUser = (user) => {
    if (user === undefined || user === null || !user.name) {
        throw new Error('Invalid user');
    }

    if (findUser(user) > -1) {
        throw new Error('User already exists');
    }

    return true;
}

module.exports = { getUsers, createUser, updateUser, deleteUser, deleteUsers };