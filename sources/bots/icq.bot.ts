//@ts-nocheck

import ICQ from 'icq-bot'
import { Bot } from 'icq-bot/dist/class/Bot'
import IButton from '../interfaces/button.interface'
import ButtonEnum from '../enums/button.enum'
import { getSocialButtons } from '../helpers/button.helper'
import SocialEnum from '../enums/social.enum'
import {
  getCountries,
  calcByProp,
  getTopTenByProp,
} from '../helpers/api.helper'
import IssueEnum from '../enums/issue.enum'

export default class ICQBot {
  token: string
  bot: Bot
  buttons: IButton[]

  constructor(token: string) {
    this.token = token
    this.bot = new ICQ.Bot(this.token)
    this.buttons = getSocialButtons(SocialEnum.ICQ)
    this.showMenuHanlder()
    this.bot.getDispatcher().addHandler(this.helpCommand)
    this.bot.getDispatcher().addHandler(this.handlerButton)
    this.bot.getDispatcher().addHandler(this.handlerNewMessage)
    this.bot.startPolling()
  }

  getButtonPreview = () => {
    return [
      [this.buttons[0], this.buttons[1], this.buttons[2]],
      [this.buttons[3], this.buttons[4]],
      [this.buttons[5]],
    ]
  }

  showMenuHanlder = () => {
    let commandList = ['menu', 'start', 'update']

    commandList.forEach((command) => {
      this.bot.getDispatcher().addHandler(
        new ICQ.Handler.Command(command, null, (bot, event) => {
          bot.sendText(
            event.fromChatId,
            'Выберите пункт меню',
            null,
            null,
            null,
            this.getButtonPreview(),
          )
        }),
      )
    })
  }

  handlerNewMessage = new ICQ.Handler.Message(null, (bot, event) => {
    if (event.text !== '/menu') {
      bot.sendText(
        event.fromChatId,
        [
          'Статистика по короновирусу с сайта https://corona.notify.wtf',
          '/menu - доступ к меню',
        ].join('\n'),
      )
    }
  })

  helpCommand = new ICQ.Handler.HelpCommand(null, (bot, event) => {
    bot.sendText(
      event.fromChatId,
      'Воспользуйтесь одной из доступных кнопок',
      null,
      null,
      null,
      this.getButtonPreview(),
    )
  })

  handlerButton = new ICQ.Handler.BotButtonCommand(null, async (bot, event) => {
    try {
      const command = JSON.parse(event.data.callbackData)
      let countries = []
      let response = null
      let output = ''

      switch (command.operation) {
        case ButtonEnum.caseCount:
        case ButtonEnum.deathCount:
        case ButtonEnum.recoveryCount:
          countries = await getCountries()
          response = calcByProp(countries, command.property)
          output = `Всего ${command.prefix} в мире: ${response}`

          bot.answerCallbackQuery(event.data.queryId, output, false)

          break
        case ButtonEnum.topTenByCase:
        case ButtonEnum.topTenByDeath:
        case ButtonEnum.topTenByRecovery:
          countries = await getCountries()
          response = getTopTenByProp(countries, command.property)
          output = response.join(', ')

          bot.answerCallbackQuery(event.data.queryId, output, false)

          break
        default:
          bot.answerCallbackQuery(
            event.data.queryId,
            IssueEnum.buttonNotAssigned,
            true,
          )
      }
    } catch (ex) {
      console.log(ex)
      bot.answerCallbackQuery(
        event.data.queryId,
        IssueEnum.commandNotExist,
        true,
      )
    }
  })
}
