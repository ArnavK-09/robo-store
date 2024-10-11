import { logger, portal } from 'robo.js'
import { initPlugin } from '../server'

export const pluginLogger = logger.fork('robopreview')

export default async () => {
	pluginLogger.event('Initializing processes...')
	await initPlugin().catch((err) => {
		pluginLogger.error(err)
	})
}