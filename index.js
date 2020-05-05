// Constants
const { Client, MessageEmbed, Collection } = require('discord.js');
const { prefix, token, giphyToken, activityName, presenceType, helpRoleColor, botStatus } = require('./config.json');
const translate = require('@vitalets/google-translate-api');
const client = new Client({
    disableEveryone: false
});
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);

    client.user.setPresence({
        activity: {
            name: activityName,
            type: presenceType
        },
        status: botStatus
    }).then(console.log).catch(console.error);
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix));

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        client.commands.get('ping').execute(client, message);
    }

    if (cmd === "embed") {
        client.commands.get('embed').execute(client, MessageEmbed, message, args);
    }

    if (cmd === "say") {
        client.commands.get('say').execute(message, args);    
    }

    if (cmd === "translate") {
        client.commands.get('translate').execute(MessageEmbed, message, helpRoleColor, args, translate);
    }

    if (cmd === "help") {
        client.commands.get('help').execute(MessageEmbed, message, helpRoleColor);
    }
});

client.login(token);