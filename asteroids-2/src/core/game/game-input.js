const KeyStates = {
    Pressed: 0,
    Down: 1,
    Released: 2
};

export class GameInput {
    constructor() {
        this.keyStates = {};
        this.listen();
    }

    isKeyDown(code) {
        const state = this.keyStates[code];
        return state === KeyStates.Pressed || state === KeyStates.Down;
    }

    isKeyUp(code) {
        const state = this.keyStates[code];
        return state === KeyStates.Released || state === undefined;
    }

    wasKeyPressed(code) {
        const state = this.keyStates[code];
        return state === KeyStates.Pressed;
    }

    wasKeyReleased(code) {
        const state = this.keyStates[code];
        return state === KeyStates.Released;
    }

    update() {
        for (const code in this.keyStates) {
            if (this.keyStates.hasOwnProperty(code)) {
                const state = this.keyStates[code];
                if (state === KeyStates.Pressed) {
                    // If a key was 'Pressed', make it now 'Down'
                    this.keyStates[code] = KeyStates.Down;
                } else if (state === KeyStates.Released) {
                    // If a key was 'Released' make it become 'Up' (delete it from state)
                    delete this.keyStates[code];
                }
            }
        }
    }

    listen() {
        document.addEventListener('keydown', (evt) => {
            const code = evt.code;
            if (this.isKeyUp(code)) {
                this.keyStates[code] = KeyStates.Pressed;
            } else {
                this.keyStates[code] = KeyStates.Down;
            }
        });

        document.addEventListener('keyup', (evt) => {
            const code = evt.code;
            if (this.isKeyDown(code)) {
                this.keyStates[code] = KeyStates.Released;
            } else {
                delete this.keyStates[code]
            }
        });
    }
}