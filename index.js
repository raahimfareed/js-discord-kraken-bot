const { Client, MessageEmbed } = require('discord.js');
const { prefix, token, giphyToken, presenceGame, presenceType } = require('./config.json');

const client = new Client({
    disableEveryone: false
});

client.on('ready', () => {
    console.log(`I'm online now! My name is ${client.user.username}`);

    client.user.setPresence({
        game: {
            name: presenceGame,
            type: presenceType
        }
    })
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix));

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        const msg = await message.channel.send(`🏓 Pinging...`);
        msg.edit(`🏓 Pong\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}\nAPI Latency is ${Math.round(client.ws.ping)}ms`)
    }

    if (cmd === "embed") {
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

    if (cmd === "say") {
        if (message.member.hasPermission(['ADMINISTRATOR'])) {
            if (message.deletable) {
                message.delete();
                message.channel.send(`${args.join(" ")}`);   
            }
        } else {
            message.channel.send(`${message.author.username} said: ${args.join(" ")}`);
        }
            
    }
});

client.login(token);    