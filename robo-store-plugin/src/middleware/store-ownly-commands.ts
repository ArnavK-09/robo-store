import { CommandInteraction } from 'discord.js';
import { MiddlewareData, MiddlewareResult } from 'robo.js';
import { options } from '../events/_start';

export default (data: MiddlewareData): MiddlewareResult | void => {
	const interaction = data.payload[0] as CommandInteraction;
	if (data.record.key.startsWith('store/admin') && !(interaction.user.id == options.owner_id)) {
		interaction.reply({
			content: 'You are not authorized to use this command.',
			ephemeral: true
		});
		return { abort: true };
	}
};
