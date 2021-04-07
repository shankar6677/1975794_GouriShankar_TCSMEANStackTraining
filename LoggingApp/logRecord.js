function Log() {
    var obj = require('readline-sync');
    var fs = require('fs');

    let totalRecords = obj.question("How many records do you need to store? : ");
    let records = parseInt(totalRecords);

    var readRecords = fs.readFileSync('logData.json');
    records1 = JSON.parse(readRecords.toString());
    debugger

    for (var i = 0; i<records; i++) {
        var user = new Object();
        user.fname = obj.question('Enter First Name: ');
        user.lname = obj.question('Enter  Last Name: ');
        user.gender = obj.question('Enter Gender: ');
        user.email = obj.question("Enter valid Email: ")
        var date = new Date();
        user.date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        user.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        records1.push(user);
        debugger
    }
    obj2 = JSON.stringify(records1);
    fs.writeFileSync('logData.json', obj2);
}
exports.Log = Log();