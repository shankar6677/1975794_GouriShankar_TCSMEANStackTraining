var blogObj = []
var i = 0;

function addBlog() {
    var title = document.getElementById("title").value;
    var desp = document.getElementById("desp").value;
    var imag = document.getElementById("imgID").files[0].name;
    blogObj.push(title);
    blogObj.push(desp);
    blogObj.push(imag);
    localStorage.setItem("Blogs" + i, JSON.stringify(blogObj));
    blogObj = [];
    i++;
    Refresh();
    printblogs();
}

function Refresh() {
    document.getElementById('title').value = "";
    document.getElementById("desp").value = "";
    document.getElementById("imgID").value = "";
}

function printblogs() {

    if (localStorage.length != 0) {

        var table = document.getElementById('Trow');
        var newdiv = table.cloneNode(true);
        var tname = document.getElementById("table");

        for (var a = 0; a < localStorage.length; a++) {
            var Binfo = [];
            Binfo = JSON.parse(localStorage.getItem('Blogs' + a));
            document.getElementById("Btitle").innerHTML = Binfo[0];
            document.getElementById("Btext").innerHTML = Binfo[1];
            document.getElementById("Bimg").src = Binfo[2];
            document.getElementById('table').appendChild(newdiv);

        }
    }
}

function startpage() {

    if (localStorage.length != 0) {

        var table = document.getElementById('Trow');
        for (var a = 0; a < localStorage.length; a++) {
            var newdiv = table.cloneNode(true);
            var Binfo = [];
            Binfo = JSON.parse(localStorage.getItem('Blogs' + a));
            document.getElementById("Btitle").innerHTML = Binfo[0];
            document.getElementById("Btext").innerHTML = Binfo[1];
            document.getElementById("Bimg").src = Binfo[2];
            document.getElementById('table').appendChild(newdiv);

        }
    }
}

function DeleteBlog() {
    localStorage.clear();
    location.reload();
}
