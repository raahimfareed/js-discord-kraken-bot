module.exports = {
    name: 'say',
    description: 'Makes the bot say something',
    execute(message, args) {
        if (message.member.hasPermission(['ADMINISTRATOR'])) {
            if (message.deletable) {
                message.delete();
                message.channel.send(`${args.join(" ")}`);   
            }
        } else {
            message.channel.send(`${message.author.username} said: ${args.join(" ")}`);
        }
    }
}