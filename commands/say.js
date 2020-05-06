module.exports = {
    name: 'say',
    description: 'Makes the bot say something',
    execute(message, args) {
        if (args.length < 1)
            return message.reply("Nothing to say?").then(m => m.delete({ timeout: 5000 }));
            
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