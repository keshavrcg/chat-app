// [{
//   id: 'fdbhdghd4e5g',
//   name: 'Keshav',
//   room: 'The Office Fans'
// }]

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);
    
    if(user){
      this.users = this.users.filter((user)=> user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user)=> user.id === id)[0];
  }

  getUserList(room) {
    var users = this.users.filter((user)=> user.room === room); //Next we convert all users object to String using map
    var namesArray = users.map((user)=> user.name);  //In map, the user will have all 3 properties but we need to return only name

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//     constructor (name, age) {
//       this.name = name;
//       this.age = age;
//     }
//
//     getUserDescription() {
//       return `${this.name} is ${this.age} year(s) old. `
//     }
// }
//
// var me = new Person('Keshav', 27);
// var description = me.getUserDescription();
// console.log(description);
