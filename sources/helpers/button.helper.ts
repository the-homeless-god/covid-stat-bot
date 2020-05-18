import SocialEnum from '../enums/social.enum'
import ButtonEnum from '../enums/button.enum'
import { ICQButton } from 'icq-bot/dist/class/ICQButton'
import CountryPropertyEnum from '../enums/country.property.enum'

export const getSocialButtons = (social: SocialEnum) => {
  switch (social) {
    case SocialEnum.ICQ:
      return [
        new ICQButton(
          'Всего случаев',
          JSON.stringify({
            operation: ButtonEnum.caseCount,
            property: CountryPropertyEnum.case,
            prefix: 'случаев',
          }),
        ),
        new ICQButton(
          'Всего смертей',
          JSON.stringify({
            operation: ButtonEnum.deathCount,
            property: CountryPropertyEnum.death,
            prefix: 'смертей',
          }),
        ),
        new ICQButton(
          'Всего выздоровлений',
          JSON.stringify({
            operation: ButtonEnum.recoveryCount,
            property: CountryPropertyEnum.recovery,
            prefix: 'выздоровлений',
          }),
        ),
        new ICQButton(
          'Топ-10 стран по случаям',
          JSON.stringify({
            operation: ButtonEnum.topTenByCase,
            property: CountryPropertyEnum.case,
            prefix: 'случаев',
          }),
        ),
        new ICQButton(
          'Топ-10 стран по смертности',
          JSON.stringify({
            operation: ButtonEnum.topTenByDeath,
            property: CountryPropertyEnum.death,
          }),
        ),
        new ICQButton(
          'Топ-10 стран по выздоровлениям',
          JSON.stringify({
            operation: ButtonEnum.topTenByRecovery,
            property: CountryPropertyEnum.recovery,
          }),
        ),
      ]

    default:
      return []
  }
}
