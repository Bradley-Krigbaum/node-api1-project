const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());


let users = [
    {
        id: "a_unique_id", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
];


server.get('/', (request, response) => {
    response.json({message: 'hello, world!'})
})

//=========================================================================================================================
// CREATE
//=========================================================================================================================

server.post('/api/users', (request, response) => {
    const userInfo = request.body;

    userInfo.id = shortid.generate();
    userInfo.name = '';
    userInfo.bio = '';
    users.push(userInfo);

    response.status(201).json(userInfo)
});


server.post('/api/users/:id', (request, response) => {

});



//=========================================================================================================================
// READ
//=========================================================================================================================

server.get('/api/users', (request, response) => {
    response.status(200).json(users);
})

server.get('/api/users/:id', (request, response) => {
    response.status(200).json(users);
});



//=========================================================================================================================
// DELETE
//=========================================================================================================================

server.delete('/api/users/:id', (request, response) => {
    const { id } = request.params;
    // console.log('server.delete: by id: ', id);

    const foundId = users.find((users) => users.id === id);

    if(foundId) {
        users = users.filter(user => user.id !== id)
        response.status(200).json(foundId)
    } else {
        response.status(404).json({message: 'user not found!'})
    }

});



//=========================================================================================================================
// PATCH & PUT
//=========================================================================================================================

server.patch('/api/users/:id', (request, response) => {
    const { id } = request.params;
    const changes = request.body;

    let foundId = users.find((users) => users.id === id);

    if(foundId) {
        Object.assign(foundId, changes);
        response.status(200).json(foundId);
    } else {
        response.status(404).json({message: 'user not found!'})
    }
})

server.put('/api/users/:id', (reuqest, response) => {
    const { id } = request.params;
    const changes = request.body;

    let index = users.findIndex((users) => users.id === id);

    if(index !== -1) {
        users[index] = changes;
        response.status(200).json(index);
    } else {
        response.status(404).json({message: 'user not found!'})
    }
})



//=========================================================================================================================
//=========================================================================================================================

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`bk: index.js: server.listen: listening on http://localhost:${PORT}`);
});

