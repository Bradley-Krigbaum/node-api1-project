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
// POST
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
// GET
//=========================================================================================================================

server.get('/api/users', (request, response) => {
    // response.status(200).json(users);

    if (!response.status(200).json(users)) {
        response.status(404).json({message: 'users not found!'})
    } else {
        response.status(200).json(users);
    }
})

server.get('/api/users/:id', (request, response) => {
    // response.status(200).json(users);

    const { getUserId } = request.params;
    // console.log('server.delete: by id: ', id);

    const foundGetUserId = users.find((users) => users.getUserId === getUserId);

    if(foundGetUserId) {
        users = users.filter(user => user.getUserId !== getUserId)
        response.status(200).json(foundGetUserId)
    } else {
        response.status(404).json({message: 'user not found!'})
    }
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
// PATCH
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



//=========================================================================================================================
//=========================================================================================================================

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`bk: index.js: server.listen: listening on http://localhost:${PORT}`);
});

