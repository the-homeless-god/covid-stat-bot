console.log('Bot has been started')

import dotenv from 'dotenv'
import ICQBot from './bots/icq.bot'
dotenv.config()

const initBots = () => {
  new ICQBot(process.env.ICQ_BOT_TOKEN!)
}

initBots()
