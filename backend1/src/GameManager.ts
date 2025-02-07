import WebSocket from "ws";

export class GameManager {
    private games: Game[];
    private pendingUsers : WebSocket;
    private users: WebSocket[];

    constructor() {
        this.games = []
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket)
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket)
    }

    private addHandler(socket: WebSocket){
        socket.on("message", (data)=>{
            const message = JSON.parse(data.toString())
            if(message.type === "create"){
                // create a new game
                this.pendingUsers = socket;
                this.createGame()
            }
            if(message.type === "join"){
                // join an existing game
                this.joinGame(socket)
            }

        })
    }

}   