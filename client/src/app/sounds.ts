export class Sounds
{
    private static sounds: Sounds

    private musicEntities: Array<Entity> = []
    private idleSource: AudioSource
    private joinSource: AudioSource

    private soundsEntity: Entity
    private openWindowSource: AudioSource
    private closeWindowSource: AudioSource
    private errorSource: AudioSource
    private moreBoosterSource: AudioSource
    private lessBoosterSource: AudioSource
    private useBoosterSource: AudioSource
    private buyBoosterSource: AudioSource

    private constructor()
    {
        this.configMusic()
        this.configSounds()
    }

    public static getInstance(): Sounds
    {
        if (Sounds.sounds == null)
        {
            Sounds.sounds = new Sounds()
        }

        return Sounds.sounds
    }

    private configMusic(): void
    {
        let idleClip = new AudioClip("sounds/music/idle.mp3")
        this.idleSource = new AudioSource(idleClip)
        this.idleSource.loop = true
        this.idleSource.volume = 1.0
        this.idleSource.playing = false

        let joinClip = new AudioClip("sounds/music/join.mp3")
        this.joinSource = new AudioSource(joinClip)
        this.joinSource.loop = true
        this.joinSource.volume = 1.0
        this.joinSource.playing = false

        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < 2; j++)
            {
                let musicEntity = new Entity()                

                let transform = new Transform(
                    {
                        position: new Vector3(8 + 16 * j, 8, 12 + 16 * i)
                    })

                musicEntity.addComponent(transform)

                this.musicEntities.push(musicEntity)

                engine.addEntity(musicEntity)
            }
        }

        for (var j = 0; j < 2; j++)
        {
            let musicEntity = new Entity()            

            let transform = new Transform(
                {
                    position: new Vector3(6 + 20 * j, 13, 3)
                })

            musicEntity.addComponent(transform)

            this.musicEntities.push(musicEntity)

            engine.addEntity(musicEntity)
        }
    }

    private configSounds(): void
    {
        let openWindowClip = new AudioClip("sounds/sounds/open_window.mp3")
        this.openWindowSource = new AudioSource(openWindowClip)        
        this.openWindowSource.volume = 0.5
        this.openWindowSource.playing = false

        let closeWindowClip = new AudioClip("sounds/sounds/close_window.mp3")
        this.closeWindowSource = new AudioSource(closeWindowClip)
        this.closeWindowSource.volume = 0.5
        this.closeWindowSource.playing = false

        let errorClip = new AudioClip("sounds/sounds/error.mp3")
        this.errorSource = new AudioSource(errorClip)
        this.errorSource.volume = 0.6
        this.errorSource.playing = false

        let moreBoosterClip = new AudioClip("sounds/sounds/more_booster.mp3")
        this.moreBoosterSource = new AudioSource(moreBoosterClip)
        this.moreBoosterSource.volume = 0.5
        this.moreBoosterSource.playing = false

        let lessBoosterClip = new AudioClip("sounds/sounds/less_booster.mp3")
        this.lessBoosterSource = new AudioSource(lessBoosterClip)
        this.lessBoosterSource.volume = 0.5
        this.lessBoosterSource.playing = false

        let useBoosterClip = new AudioClip("sounds/sounds/use_booster.mp3")
        this.useBoosterSource = new AudioSource(useBoosterClip)
        this.useBoosterSource.volume = 0.5
        this.useBoosterSource.playing = false

        let buyBoosterClip = new AudioClip("sounds/sounds/buy_booster.mp3")
        this.buyBoosterSource = new AudioSource(buyBoosterClip)
        this.buyBoosterSource.volume = 0.5
        this.buyBoosterSource.playing = false

        this.soundsEntity = new Entity()

        engine.addEntity(this.soundsEntity)
    }

    private adjustSoundsPosition(): void
    {
        let cameraPosition = Camera.instance.position

        let transform = new Transform(
            {
                position: new Vector3(cameraPosition.x, cameraPosition.y + 1, cameraPosition.z)
            })

        this.soundsEntity.addComponentOrReplace(transform)
    }

    public playIdleMusic(): void
    {
        this.joinSource.playing = false

        for (var i = 0; i < this.musicEntities.length; i++)
        {
            this.musicEntities[i].addComponentOrReplace(this.idleSource)
        }

        this.idleSource.playing = true
    }

    public playJoinMusic(): void
    {
        this.idleSource.playing = false

        for (var i = 0; i < this.musicEntities.length; i++)
        {
            this.musicEntities[i].addComponentOrReplace(this.joinSource)
        }

        this.joinSource.playing = true
    }

    public muteMusic(): void
    {
        this.joinSource.playing = false
        this.idleSource.playing = false
    }

    public playOpenWindow(): void
    {
        this.adjustSoundsPosition()
        
        this.closeWindowSource.playing = false
        this.soundsEntity.addComponentOrReplace(this.openWindowSource)
        this.openWindowSource.playOnce()
    }

    public playCloseWindow(): void
    {
        this.adjustSoundsPosition()

        this.openWindowSource.playing = false
        this.soundsEntity.addComponentOrReplace(this.closeWindowSource)
        this.closeWindowSource.playOnce()
    }

    public playError(): void
    {
        this.adjustSoundsPosition()

        this.openWindowSource.playing = false
        this.closeWindowSource.playing = false
        this.soundsEntity.addComponentOrReplace(this.errorSource)
        this.errorSource.playOnce()
    }

    public playMoreBooster(): void
    {
        this.adjustSoundsPosition()

        this.lessBoosterSource.playing = false
        this.soundsEntity.addComponentOrReplace(this.moreBoosterSource)
        this.moreBoosterSource.playOnce()
    }

    public playLessBooster(): void
    {
        this.adjustSoundsPosition()

        this.moreBoosterSource.playing = false
        this.soundsEntity.addComponentOrReplace(this.lessBoosterSource)
        this.lessBoosterSource.playOnce()
    }

    public playUseBooster(): void
    {
        this.adjustSoundsPosition()

        this.openWindowSource.playing = false
        this.soundsEntity.addComponentOrReplace(this.useBoosterSource)
        this.useBoosterSource.playOnce()
    }

    public playBuyBooster(): void
    {
        this.adjustSoundsPosition()

        this.openWindowSource.playing = false
        this.soundsEntity.addComponentOrReplace(this.buyBoosterSource)
        this.buyBoosterSource.playOnce()
    }
}