const express =require('express');
const app = express(); // экземпляр express сервера
const http = require('http');
const server = http.createServer(app); // http сервер
const {Server} = require('socket.io');
const io = new Server(server, {
    cors:{
    //    origin: 'http://127.0.0.1:5500',
        origin: 'http://truruky.ru',
        methods: ['GET', 'POST'],
        credentials: true,
        allowEIO3: true,
    }
})

app.get('/', (req, res, next) => {
    res.send('Express Server');
})

io.on('connection', (socket) => {
    console.log('A new client connect!');
//************************код из проекта h4********************************************** */
    console.log('socket ID', socket.id) // можем посмотреть id сокета

    socket.on('chat message', (data)=>{
        io.emit('chat message', {
            message: data.message,
            name: data.name
        })
})
//******************************************************************* */
})

// вызываем метод прослушки listen у http-сервера (которому ранее передали экземпляр express)
server.listen(3000, () => {
    console.log('Сервер стартанул')
})