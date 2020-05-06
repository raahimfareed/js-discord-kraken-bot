const randomPuppy = require("random-puppy");

module.exports = {
    name: 'porn',
    description: "Sends lewds U-U",
    async execute(message, MessageEmbed) {
        if (message.channel.nsfw) {
            const subReddits = [
                "gonewild",
                "gwcouples", 
                "gonewild30plus", 
                "coffeegonewild", 
                'gonewildcurvy', 
                'bdsmgw', 
                'porn'
            ];
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];

            const img = await randomPuppy(random);
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`( ͡° ͜ʖ ͡°)`)
                .setURL(`http://www.reddit.com/r/${random}`)
                .setFooter(`From /r/${random}`);

            message.channel.send(embed);
        } else {
            message.channel.send("Send it in a *NSFW* channel you dumb ass");
        }
        
    }
}