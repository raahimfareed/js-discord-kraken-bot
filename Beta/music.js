const ytdl = require("ytdl-core");

module.exports = {
    name: 'music',
    description: 'Play music off of some source',
    async execute(message, args, queue) {
        const serverQueue = queue.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;

        function play(guild, song) {
            const serverQueue = queue.get(guild.id);

            if(!song) {
                serverQueue.voice.channel.leave();
                queue.delete(guild.id);
                return;
            }

            const dispatcher = connection.play(ytdl(song.url))
                .on('end', () => {
                    console.log("Song Ended");
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                });
            dispatcher.setVolumeLogarithmic(5 / 5);
        }

        switch (args[0]) {
            
            case 'play':
                if (!voiceChannel) return message.channel.send("I'm sorry but you need to be in a voice channel to play music");
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if(!permissions.has('CONNECT')) {
                    return message.channel.send("I cannot connect to your voice channel, make sure I have the proper permissions!");
                }
                if(!permissions.has('SPEAK')) {
                    return message.channel.send("I cannot speak in this voice channel, make sure I have the proper persmissions!");
                }

                const link = args[1].toString();

                const songInfo = await ytdl.getInfo(link);
                const song = {
                    title: songInfo.title,
                    url: songInfo.video_url
                }

                if (!serverQueue) {
                    const queueConstruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 5,
                        playing: true
                    };

                    queue.set(message.guild.id, queueConstruct);

                    queueConstruct.songs.push(song);

                    try {
                        var connection = await voiceChannel.join();
                        queueConstruct.connection = connection;
                        play(message.guild, queueConstruct.songs[0]);
                    } catch (error) {
                        console.error(`I could not join the voice channel: ${error}`);
                        queue.delete(message.guild.id)
                        return message.channel.send(`I could not join the voice channel`);
                    }
                } else {
                    serverQueue.songs.push(song);
                    message.channel.send(`**${song.title}** has been added to the queue!`);
                }

                return undefined;
                
                break;
            case 'stop':
                if (!voiceChannel) return message.channel.send("You are not in a voice channel!");
                voiceChannel.leave();
                return undefined;

                break;
            case 'skip':
                if (!serverQueue) message.channel.send("There's nothing in the queue to skip. (:");
                serverQueue.connection.dispatcher.end();
                break;
            default:
                break;
        }
    }
}