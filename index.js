// Constants
const { Client, MessageEmbed, Collection } = require('discord.js');
const { prefix, token, giphyToken, activityName, presenceType, helpRoleColor, botStatus } = require('./config.json');
const translate = require('@vitalets/google-translate-api');
const GphApiClient = require('giphy-js-sdk-core');
const client = new Client({
    disableEveryone: false
});
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

client.commands = new Collection();
giphy = GphApiClient(giphyToken);

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

    // User Available Commands
    switch (cmd) {
        case 'ping':
            client.commands.get('ping').execute(client, message);
            break;
        case 'say':
            client.commands.get('say').execute(message, args);    
            break;
        case 'embed':
            client.commands.get('embed').execute(client, MessageEmbed, message, args); 
            break;
        case 'translate':
            client.commands.get('translate').execute(MessageEmbed, message, helpRoleColor, args, translate);
            break;
        case 'help':
            client.commands.get('help').execute(MessageEmbed, message, helpRoleColor);
            break;
        case 'kick':
            client.commands.get('kick').execute(message, giphy, args);
            break;
        case 'ban':
            client.commands.get('ban').execute(message, giphy, args);
            break;
        default:
            break;
    }
});

client.login(token);