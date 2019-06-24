export default class AudioPlayer {
    audioCtx: AudioContext;
    shotSample: AudioBuffer;
    explosionSmallSample: AudioBuffer;
    explosionLargeSample: AudioBuffer;
    rocketContinuous: AudioBuffer;
    rocketSource: AudioBufferSourceNode;

    constructor() {
        this.audioCtx = new AudioContext();
    }

    playShot() {
        this._playSample(this.shotSample);
    }

    playExplosionSmall() {
        this._playSample(this.explosionSmallSample);
    }

    playExplosionLarge() {
        this._playSample(this.explosionLargeSample);
    }

    playRocketContinuous() {
        if (this.rocketSource == null) {
            this.rocketSource = this._playLoop(this.rocketContinuous);
        }
    }

    stopRocketContinuous() {
        this.rocketSource && this.rocketSource.stop();
        this.rocketSource = null;
    }

    async loadSamples() : Promise<void> {
        this.shotSample = await this._getFile('/audio/shot.wav');
        this.explosionSmallSample = await this._getFile('/audio/explosion-small.wav');
        this.explosionLargeSample = await this._getFile('/audio/explosion-large.wav');
        this.rocketContinuous = await this._getFile('/audio/rocket-continuous.wav');
    }

    async _getFile(filePath: string): Promise<AudioBuffer> {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        return await this.audioCtx.decodeAudioData(arrayBuffer);
    }

    _playSample(audioBuffer: AudioBuffer): AudioBufferSourceNode {
        const source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioCtx.destination);
        source.start();
        return source;
    }

    _playLoop(audioBuffer: AudioBuffer) {
        const source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(this.audioCtx.destination);
        source.start(0);
        return source;
    }
}