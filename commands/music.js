const ytdl = require("ytdl-core");


module.exports = {
    name: 'music',
    description: 'Plays music from Youtube',
    execute(MessageEmbed, message, helpRoleColor, args) {
        let servers = {};

        if (!args[0]) {
            let serverMsg = `Sent you a message with music commands`;
            let errMsg = `Could not send you a message`
            let musicDesc = "**Command Format**\n`$music [play/skip/stop]`\n\n`play (youtube link)` - Plays a song from link provided\n`stop` - Stops the current song\n`skip` - Skips the current song";
            const music = new MessageEmbed()
                .setColor(helpRoleColor)
                .setTitle("Music Commands")
                .setDescription(musicDesc);

            if (message.author.send(music)) {
                message.channel.send(serverMsg);
            } else {
                message.channel.send(errMsg);
            }
        } else {
            switch (args[0]) {
                case 'play':
                    function play(connection, message) {
                        let server = servers[message.guild.id];

                        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

                        server.queue.shift();

                        server.dispatcher.on('end', function() {
                            if(server.queue[0]) {
                                play(connection, message);
                            } else {
                                connection.disconnect();
                            }
                        })
                    }

                    if (!args[1]) {
                        message.channel.send("Please provide a link after `play`");
                        return;
                    }

                    if (!ytdl.validateURL(args[1])) message.channel.send("Please send a url!");

                    if (!message.member.voice.channel) {
                        message.channel.send("You must be in a voice channel to play the music!");
                        return;
                    }

                    if(!servers[message.guild.id]) servers[message.guild.id] = {
                        queue: []
                    }

                    var server = servers[message.guild.id];

                    server.queue.push(args[1].toString());
                    if(!message.guild.voiceChannel) message.member.voice.channel.join().then(function(connection) {
                        play(connection, message);
                    })

                    break;
                case 'skip':
                    var server = servers[message.guild.id];
                    if (server.dispatcher) server.dispatcher.end();
                    break;
                case 'stop':
                    if (message.guild.voice.channel) {
                        for (var i = server.queue.length - 1; i >= 0; i--) {
                            server.queue.splice()
                        }
                    }
                    break;
                default:
                    message.channel.send("Invalid Command!\nType `$music` for list of commands");
                    break;
            }
        }
    }
}