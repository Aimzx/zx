import { Message } from "discord.js";
import { ReplyFunction, Command } from "../../types";
import Const from "../const";


export default class InfoCommand extends Command {

  public constructor() {
    super({
      name: 'info',
      desc: 'Who? What? How?',
      trigger: [ 'info', 'information', 'about' ]
    });
  }

  public handle(mes: Message, args: string[], repl: ReplyFunction): boolean {
    repl(
'FreeStuff Bot',
`Bot made by [Maanex](https://maanex.tk/?utm_source=freestuffbot&utm_medium=about&utm_campaign=project) with help\nfrom [some amazing people](https://freestuffbot.xyz/about#more)

[About / Website](${Const.websiteLink})

[Click here to add it to your server](${Const.inviteLink})

[Report a bug or get in contact](${Const.discordInvite})`,
'Copyright © 2020 Tude',
0x00b0f4
    ); // Haha yes, multi-line string
    return true;
  }

}