module.exports = {
    name: 'ping',
    description: 'Returns Latency',
    async execute(client, message) {
        const msg = await message.channel.send(`🏓 Pinging...`);
        msg.edit(`🏓 Pong\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
    }
}