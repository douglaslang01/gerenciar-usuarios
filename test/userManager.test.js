const userManager = require('../src/userManager'); // Adjust the path as necessary
const { expect } = require('chai');

describe('User Manager', function () {
    it('should get initial users', function () {
        const users = userManager.getUsers();

        expect(users).to.have.lengthOf(4);
        expect(users).to.includes('mathues', 'marcos', 'lucas', 'joão');
    });

    it('should create a valid user', function () {
        userManager.createUser('ana');
        const users = userManager.getUsers();

        expect(users).to.include('ana');
        expect(users).to.have.lengthOf(5);
    });

    it('should throw an error when creating an invalid user', function () {
        const invalidUsers = ['', null, undefined, '   '];

        invalidUsers.forEach(invalidUser => {
            expect(() => userManager.createUser(invalidUser)).to.throw('Invalid user');
        });
    });

    it('should throw an error when creating a duplicate user', function () {
        expect(() => userManager.createUser('mathues')).to.throw('User already exists');
    });

    it('should update an existing user', function () {
        userManager.updateUser('ana', 'ana maria');
        const users = userManager.getUsers();

        expect(users).to.include('ana maria');
        expect(users).to.not.include('ana');
    });

    it('should not update a non-existing user', function () {
        const usersBefore = userManager.getUsers();
        userManager.updateUser('nonexistent', 'newname');
        const usersAfter = userManager.getUsers();

        expect(usersAfter).to.deep.equal(usersBefore);
    });

    it('should throw an error when updating to a duplicate user', function () {
        expect(() => userManager.updateUser('ana maria', 'mathues')).to.throw('User already exists');
    });

    it('should delete an user', function () {
        userManager.deleteUser('ana maria');
        const users = userManager.getUsers();

        expect(users).to.not.include('ana maria');
    });

    it('should not delete a non-existing user', function () {
        const usersBefore = userManager.getUsers();
        userManager.deleteUser('nonexistent');
        const usersAfter = userManager.getUsers();

        expect(usersAfter).to.deep.equal(usersBefore);
    });

    it('should delete all users', function () {
        userManager.deleteUsers();
        const users = userManager.getUsers();

        expect(users).to.be.an('array').that.is.empty;
    });
});
