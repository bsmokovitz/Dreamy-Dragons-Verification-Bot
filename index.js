const {
  Client,
  Intents,
  MessageActionRow,
  MessageButton,
  Modal,
  TextInputComponent,
} = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('message', (message) => {
    if (message.content === '-panel') {
        if (message.author.bot) return;

        let button = new MessageActionRow();
        button.addComponents(
          new MessageButton()
            .setCustomId('verification-button')
            .setStyle('PRIMARY')
            .setLabel('Enter The Clouds'),
        );
        message.channel.send({
          components: [button],
        });
        }
    }
);

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'verification-button') {
      const modal = new Modal()
        .setCustomId('verification-modal')
        .setTitle('What is the best project on solana?')
        .addComponents([
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('verification-input')
              .setLabel('Answer')
              .setStyle('SHORT')
              .setPlaceholder('ABCD')
              .setRequired(true),
          ),
        ]);

      await interaction.showModal(modal);
    }
  }

    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'verification-modal') {
            const response = interaction.fields.getTextInputValue('verification-input');
            if (response === 'Dreamy Dragons' || response === 'DreamyDragons' || response === 'Dreamy-Dragons' || response === 'Dreamy_Dragons') {
                interaction.reply('You are Dreamy Dragons');
                interaction.member.roles.add(process.env.ROLE_ID);
            }
        }
    }
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'verification-modal') {
            const response = interaction.fields.getTextInputValue('verification-input');
            if (response === "Okey Bears" || responce === "OkeyBears" || responce === "Okey-Bears" || responce === "Okey_Bears") {
                interaction.reply( "Do they even have a roadmap?");
            }
        }
    }
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'verification-modal') {
            const response = interaction.fields.getTextInputValue('verification-input');
            if (response === "DeGods"|| response === "De-Gods" || response === "De_Gods") {
                interaction.reply("Are you that rich?");
            }
        }
    }

}
);

client.once('ready', () => {
    console.log(`${client.user.tag} is ready!`);
});

client.login(process.env.TOKEN);