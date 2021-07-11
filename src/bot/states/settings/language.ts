import { GenericInteraction } from '../../../cordo/types/ibase'
import { ButtonStyle, ComponentType } from '../../../cordo/types/iconst'
import { InteractionApplicationCommandCallbackData } from '../../../cordo/types/custom'
import Emojis from '../../emojis'
import LanguageManager from '../../language-manager'


function buildDescriptionForLanguage(lang: { id: string, nameEn: string }): string {
  const name = lang.nameEn[0].toUpperCase() + lang.nameEn.substr(1).toLowerCase()
  if (lang.id.startsWith('en')) {
    if (lang.id.endsWith('US')) return 'English with football fields per pizza slice'
    else return 'English with the metric system'
  }
  const out = `${name} by ${LanguageManager.getRaw(lang.id, 'translators', false)}`
  return (out.length > 50)
    ? out.substr(0, 47) + '...'
    : out
}

export default function (i: GenericInteraction): InteractionApplicationCommandCallbackData {
  if (!i.guildData)
    return { title: 'An error occured' }

  const options = LanguageManager
    .getAllLanguages()
    .sort((a, b) => (b.ranking - a.ranking))
    .slice(0, 25)
    .sort((a, b) => (a.id < b.id ? -1 : (a.id > b.id ? 1 : 0)))
    .map(l => ({
      label: l.name,
      value: l.id,
      default: i.guildData.language === l.id,
      description: buildDescriptionForLanguage(l),
      emoji: { name: Emojis.fromFlagName(l.flag).string }
    }))

  return {
    title: 'language',
    components: [
      {
        type: ComponentType.SELECT,
        custom_id: 'settings_language_change',
        options,
        placeholder: 'Pick a channel to send games to'
      },
      {
        type: ComponentType.BUTTON,
        style: ButtonStyle.SECONDARY,
        custom_id: 'settings_main',
        label: 'Back',
        emoji: { id: Emojis.caretLeft.id }
      }
    ]
  }
}