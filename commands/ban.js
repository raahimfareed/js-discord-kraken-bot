module.exports = {
    name: 'ban',
    description: 'Bans a user if the message author has rights',
    execute(message, giphy, args) {
        if (message.member.hasPermission(['BAN_MEMBERS'])) {
            if (message.deletable)
                message.delete();
            if (args.length < 1) {
                message.channel.send("Please specify a user to ban\nExample: `$ban @bot#0001`");
            } else {
                let member = message.mentions.members.first();
                member.ban({days: 1, reason: 'Poo Poo User'}).then((member) => {
                    giphy.search('gifs', {'q': 'ban'})
                        .then((response) => {
                            let totalResponses = response.data.length;
                            let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                            let responseFinal = response.data[responseIndex];

                            message.channel.send(`${member.displayName} has been banned`, {
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