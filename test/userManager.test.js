const userManager = require('../src/userManager'); // Adjust the path as necessary
const { expect } = require('chai');

describe('User Manager', function () {
    it('should get initial users', function () {
        const users = userManager.getUsers();

        expect(users).to.have.lengthOf(4);
        expect(users).to.includes('mathues', 'marcos', 'lucas', 'joão');
    });

    it('should create a new user', function () {
        userManager.createUser('ana');
        const users = userManager.getUsers();

        expect(users).to.include('ana');
        expect(users).to.have.lengthOf(5);
    });

    it('should update an existing user', function () {
        userManager.updateUser('ana', 'ana maria');
        const users = userManager.getUsers();

        expect(users).to.include('ana maria');
        expect(users).to.not.include('ana');
    });

    it('should delete an user', function () {
        userManager.deleteUser('ana maria');
        const users = userManager.getUsers();

        expect(users).to.not.include('ana maria');
    });

    it('should delete all users', function () {
        userManager.deleteUsers();
        const users = userManager.getUsers();

        expect(users).to.be.an('array').that.is.empty;
    });
});
