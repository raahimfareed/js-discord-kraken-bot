module.exports = {
    name: 'kick',
    description: 'Kicks a user if the message author has rights',
    execute(message, giphy, args) {
        if (message.member.hasPermission(['KICK_MEMBERS'])) {
            if (args.length < 1) {
                message.channel.send("Please specify a user to kick\nExample: `$kick @bot#0001`");
            } else {
                let member = message.mentions.members.first();
                member.kick().then((member) => {
                    giphy.search('gifs', {'q': 'kick'})
                        .then((response) => {
                            let totalResponses = response.data.length;
                            let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                            let responseFinal = response.data[responseIndex];

                            message.channel.send(`${member.displayName} has been yeeted out by ${message.author.username}`, {
                                files: [responseFinal.images.fixed_height.url]
                            })
                        }).catch(() => {
                            message.channel.send('Error ugh!');
                        });
                });
            }
        } else {
            message.channel.send("N O");
        }
    }
}