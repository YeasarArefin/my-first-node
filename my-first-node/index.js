const exprees = require('express');
const app = exprees();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(exprees.json());

const users = [
    { id: 0, name: "yeasar" },
    { id: 1, name: "arefin" },
    { id: 2, name: "adnan" },
    { id: 3, name: "ibtekhar" },
    { id: 4, name: "ahfaz" },
    { id: 5, name: "ayaz" },
];


app.get('/users', (req, res) => {

    const search = req.query.search;

    if (search) {
        const searchResult = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(searchResult);
    }
    else {
        res.send(users);
    }

});

app.get('/users/:id', (req, res) => {

    const id = req.params.id;
    const user = users[id];
    res.send(user);

});

app.post('/users', (req, res) => {

    console.log('heating the post', req.body);
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    res.json(newUser);


});

app.listen(port, (req) => {
    // console.log('i am form port');
});