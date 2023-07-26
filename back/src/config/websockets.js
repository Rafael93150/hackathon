import { Server } from 'socket.io'

export const connectToWebsocket = async function (httpServer) {
	const client = new Server(httpServer, {})

	client.on('connection', async function (socket) {
        console.log('Client connected')

        socket.on("newMessage", (message) => {
            console.log(`Un nouveau message a été envoyé: ${message}`);
        });

		socket.on('disconnect', function () {
            console.log('Client disconnected')
        })
	})
}