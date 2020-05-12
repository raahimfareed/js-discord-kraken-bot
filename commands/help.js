module.exports = {
    name: 'help',
    description: 'Returns a list of available commands',
    execute(MessageEmbed, message, helpRoleColor) {
        let serverMsg = `Sent you a message with detailed help`;
        let errMsg = `Could not send you a message`
        let helpDesc = "Make sure to use the *$help* to get access to the commands\nEvery command starts with **$**\n\n`help` - Displays help\n`ping` - Ping's Client Latency and API Latency\n`embed (message)` - Embeds a message\n`say (message)` - Makes the bot say a message\n`translate` - Displays translate help\n`meme` - Sends a random meme\n`dance` - Default Dance";
        const help = new MessageEmbed()
            .setColor(helpRoleColor)
            .setAuthor("Command List")
            .setDescription(helpDesc)


        if (message.author.send(help)) {
            message.channel.send(serverMsg);
        } else {
            message.channel.send(errMsg);
        }
    }
}