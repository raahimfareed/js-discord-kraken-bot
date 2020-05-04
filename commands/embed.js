module.exports = {
    name: "embed",
    description: "Embeds a message",
    execute(client, MessageEmbed, message, args) {
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("Nothing to say?").then(m => m.delete(5000));
        
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#FFFFFF" : message.guild.me.displayHexColor;

        const embed = new MessageEmbed()
            .setColor(roleColor)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(args.join(" "))
            .setFooter(client.user.username + "\nI'm still under development ;D", client.user.displayAvatarURL())
            .setTimestamp();

        message.channel.send(embed);
    }
}