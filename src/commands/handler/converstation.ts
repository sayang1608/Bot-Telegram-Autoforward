import { Context } from "grammy";

interface Conversation {
    mycode: string;
}

interface Conversations {
    [chatId: number]: Conversation;
}
const conversations: Conversations = {};

class Converstation {
    private chatId = 0
    private ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
        this.init(this.ctx)
    }

    private async init(ctx: Context) {
        if (ctx.chat == undefined) return
        this.chatId = ctx.chat.id
        
        if (!conversations[this.chatId]) {
            // Jika belum dimulai, mulai percakapan baru
            conversations[this.chatId] = {
                mycode: "",
            };
    
            // Kirim pesan selamat datang
            console.log("Converstation Open!.."); 
        }
    }

    async start() {
        const conversation = conversations[this.chatId];
        const message = this.ctx.message?.text

        if (message != undefined && message.includes("mycode", 0)) {
            console.log("Ini adalah langkah pertama.");
            conversation.mycode = message;
            console.log(conversations);
            return conversation
        }

        return undefined
    }

    async end() {
        console.log("Percakapan selesai.");
        delete conversations[this.chatId];
        return true
    }
}

export default Converstation