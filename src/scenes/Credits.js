import { globals } from '../main.js';

export class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        this.add.text(
            globals.width / 2,
            globals.height / 2,
`Assets: All assets were created by me through means cropping, stiching, and mutating stock photos.\n\n
Sounds: 
Fluroscent buzz: JoelMcDaniel on FreeSound 
https://freesound.org/people/JoelMcDaniel/sounds/830440/,
-
Click: Universfield on Pixabay 
https://pixabay.com/sound-effects/film-special\n-effects-computer-mouse-click-351398/
-
Bootup: Windows Digitals 
https://www.windowsdigitals.com/windows-all-startup-sounds/\n\n
Shader: Lightly modified a great shader from TheMarco \n https://github.com/TheMarco/retrozone\n\n
The Rest: I am the creator of all mechanics, gameplay, text, and code snippets https://github.com/malamba-bot
\n(Press m for Menu)`,
            {
                fontSize: 36,
                align: 'center',
                wordWrap: {
                    width: globals.width * 0.7,
                }
            }
        ).setOrigin(0.5);

        var m_key = this.input.keyboard.addKey('m');
        m_key.once('down', () => this.scene.start('Menu'));
    }
}
