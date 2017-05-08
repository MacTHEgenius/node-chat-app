const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: 1, name: 'Legolas', room: 'The Fellowship' },
            { id: 2, name: 'Sauron', room: 'The Bad Guys' },
            { id: 3, name: 'Gimli', room: 'The Fellowship' },
        ];
    });
    
    it('should add new user', () => {
        var users = new Users();
        var user = { id: '123', name: 'hello', room: 'A room' };
        
        var result = users.addUsers(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });
    
    it('should remove a user by id and return it', () => {
        var userId = 1;
        var initialUsersCount = users.users.length;
        
        var result = users.removeUser(userId);
        
        expect(users.users.length).toBe(initialUsersCount - 1);
        expect(result.id).toBe(userId);
    });
    
    it('should not remove a user with invalid id', () => {
        var userId = 123;
        var initialUsersCount = users.users.length;
        
        var result = users.removeUser(userId);
        
        expect(users.users.length).toBe(initialUsersCount);
        expect(result).toNotExist();
    });
    
    it('should get a user by id', () => {
        var userId = 1;
        
        var result = users.getUser(userId);
        
        expect(result.id).toBe(userId);
    });
    
    it('should not get a user with invalid id', () => {
        var userId = 123;
        
        var result = users.getUser(userId);
        
        expect(result).toNotExist();
    });
    
    it('should get user list by room name', () => {
        var roomName = 'The Fellowship';
        
        var result = users.getUserListByRoom(roomName);
        
        expect(result).toEqual(['Legolas', 'Gimli']);
        expect(result.length).toBe(2);
    });
    
});
