module.exports = function(app){
    var user = require('./controllers/users');
    app.get('/users/:id', users.find);
    app.post('/users', users.add);
    app.put('/users/:id', users.update);
    app.delete('/users/:id', users.delete);
}