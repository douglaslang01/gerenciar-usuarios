const userManager = require('../src/userManager'); // Adjust the path as necessary
const { expect } = require('chai');

describe('User Manager', function () {
    it('should get initial users', function () {
        const users = userManager.getUsers();

        expect(users).to.have.lengthOf(4);
        expect(users.map(u => u.name)).to.deep.equal([
            'matheus',
            'marcos',
            'lucas',
            'joão'
        ]);
    });

    it('should create a valid user', function () {
        const user = { name: 'ana', mail: 'ana@mail.com' };

        userManager.createUser(user);
        const users = userManager.getUsers();

        expect(users.map((u => u.name))).to.include(user.name);
        expect(users).to.have.lengthOf(5);
    });

    it('should throw an error when creating an invalid user', function () {
        const invalidUsers = ['', null, undefined, {}];

        invalidUsers.forEach(invalidUser => {
            expect(() => userManager.createUser(invalidUser)).to.throw('Invalid user');
        });
    });

    it('should throw an error when creating a duplicate user', function () {
        const user = { name: 'matheus', mail: 'matheus@mail.com' };

        expect(() => userManager.createUser(user)).to.throw('User already exists');
    });

    it('should update an existing user', function () {
        const olduser = { name: 'ana', mail: 'ana@mail.com' };
        const newuser = { name: 'ana maria', mail: 'ana.maria@mail.com' };

        userManager.updateUser(olduser, newuser);
        const users = userManager.getUsers();

        expect(users.map(u => u.name)).to.include(newuser.name);
        expect(users).to.deep.include({ name: newuser.name, mail: newuser.mail }); //Similar to above code line, but more strict

        expect(users.map(u => u.name)).to.not.include(olduser.name);
        expect(users).to.not.deep.include({ name: olduser.name, mail: olduser.mail }); //Similar to above code line, but more strict
    });

    it('should not update a non-existing user', function () {
        const usersBefore = userManager.getUsers();
        const olduser = { name: 'nonexistent', mail: 'nonexistent@mail.com' };
        const newuser = { name: 'newname', mail: 'newname@mail.com' };

        userManager.updateUser(olduser, newuser);
        const usersAfter = userManager.getUsers();
        expect(usersAfter).to.deep.equal(usersBefore);
    });

    it('should throw an error when updating to a duplicate user', function () {
        const olduser = { name: 'ana maria', mail: 'ana.maria@mail.com' };
        const newuser = { name: 'matheus', mail: 'matheus@mail.com' };

        expect(() => userManager.updateUser(olduser, newuser)).to.throw('User already exists');
    });

    it('should delete an user', function () {
        const user = { name: 'ana maria', mail: 'ana.maria@mail.com' };

        userManager.deleteUser(user);
        const users = userManager.getUsers();

        expect(users.map(u => u.name)).to.not.include(user.name);
    });

    it('should not delete a non-existing user', function () {
        const usersBefore = userManager.getUsers();
        const nonExistentUser = { name: 'nonexistent', mail: 'nonexistent@mail.com' };

        userManager.deleteUser(nonExistentUser);
        const usersAfter = userManager.getUsers();

        expect(usersAfter).to.deep.equal(usersBefore);
    });

    it('should delete all users', function () {
        userManager.deleteUsers();
        const users = userManager.getUsers();

        expect(users).to.have.empty;
    });
});
