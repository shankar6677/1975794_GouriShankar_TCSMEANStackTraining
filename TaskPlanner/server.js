let http = require("http");
let url = require("url");
let fs = require("fs");
let port = 7070;

let arrayStore = new Array()
let htmlPage = `
<h3>Task Planner</h3>
<div style="font-style:italic">
<u><b>Add Task</b></u>
        <form action="/store" method="get">
        <label>Employee Id: </label>
        <input type="text" name="empId" /><br/>
        <label>Task Id: </label>
        <input type="text" name="taskId" /><br/>
        <label>Task:
        <input type="text" name="task" /><br/>
        <label> Deadline: </label>
        <input type="date" id="deadline" name="deadline" /><br/>
        <input type="submit" value="Add Task" />
        <input type="reset" value="Reset" />
        </form>
        </div>

<div style="font-style:italic">
<u><b>Delete Task</b></u>
        <form action="/delete" method="get" >
        <label>Task Id: </label>
        <input type="text" name="taskId"/><br/>
        <input type="submit" value="Delete Task" />
        </form>
        </div>
 <div style="font-style:italic">
        <form action="/display" method= "get">
        <u><b>Show Tasks</b></u><br/>
        <input type="submit" value="Show All Tasks" /><br/>
        </form>
    </div>
`

class Task {
    constructor(empId, taskId, task, deadline) {
        this.empId = empId
        this.taskId = taskId
        this.task = task
        this.deadline = deadline
    }
}
let server = http.createServer((req, res) => {
    var pathInfo = url.parse(req.url, true).pathname;
    if (req.url != '/favicon.ico') {
        res.setHeader("content-type", "text/html"); 
        res.write(htmlPage);
        if (pathInfo == "/store") {
            var data = url.parse(req.url, true).query;
            let storeData = new Task(data.empId, data.taskId, data.task, data.deadline)
            arrayStore.push(storeData)
            let string = JSON.stringify(arrayStore)
            fs.writeFileSync("data.json", string)
            res.end()

        } else if (pathInfo == "/delete") {
            var data = url.parse(req.url, true).query;
            let read = fs.readFileSync("data.json");
            let string = read.toString()
            let obj = JSON.parse(string);
            var data1 = data.taskId;
            var i = obj.length
            while (i--) {
                if (data1.indexOf(obj[i].taskId) != -1) {
                    obj.splice(i, 1);
                }
            }
            let storeData = JSON.stringify(obj)
            fs.writeFileSync("data.json", storeData)
            console.log(storeData)
            res.end()

        } else if (pathInfo == "/display") {
            var data = url.parse(req.url, true).query;
            let read = fs.readFileSync("data.json");
            let string = read.toString()
            let obj = JSON.parse(string);
            let displayTable = `
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Employee Id</th>
                    <th>Task Id</th>
                    <th>Task</th>
                    <th>Deadline</th>
                    </tr>
                </thead>
            <tbody>
        `
            for (let i = 0; i < obj.length; i++) {
                displayTable += `
        <tr>
            <td>${obj[i].empId}</td>
            <td>${obj[i].taskId}</td>
            <td>${obj[i].task}</td>
            <td>${obj[i].deadline}</td>
        </tr>`
            }
            displayTable += `                         
                </table>
                </div>
            </div>
        </div>
         `
            res.write(displayTable)
            res.end()
        }
    }

});
server.listen(port, () => console.log(`Server is running on port number ${port}`));