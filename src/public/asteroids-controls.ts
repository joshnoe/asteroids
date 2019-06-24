import KeyboardDirection from "./keyboard-direction";

export default class AsteroidsControls {
    keyboardDirection: KeyboardDirection;
    tryShoot: boolean;

    constructor () {
        this.keyboardDirection = new KeyboardDirection();
    }

    bind() {
        window.addEventListener('keydown', e => this._handleKeyDown(e));
        window.addEventListener('keyup', e => this._handleKeyUp(e));
    }

    _handleKeyDown(event: KeyboardEvent): void {
        if (event.key == " ") {
            this.tryShoot = true;
        }

        this._setKeyboardDirection(event.key, true);
    }

    _handleKeyUp(event: KeyboardEvent): void {
        this._setKeyboardDirection(event.key, false);
    }

    _setKeyboardDirection(key: string, isPressed: boolean) {
        switch (key) {
            case "ArrowLeft":
                this.keyboardDirection.left = isPressed;
                break;
            case "ArrowRight":
                this.keyboardDirection.right = isPressed;
                break;
            case "ArrowUp":
                this.keyboardDirection.up = isPressed;
                break;
            case "ArrowDown":
                this.keyboardDirection.down = isPressed;
                break;
        }
    }
}