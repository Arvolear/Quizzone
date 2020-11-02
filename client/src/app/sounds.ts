export class Sounds
{
    private static sounds: Sounds

    private musicEntities: Array<Entity> = []
    private idleSource: AudioSource
    private joinSource: AudioSource
    private awaitingSource: AudioSource

    private passiveSoundsEntity: Entity
    private openWindowSource: AudioSource
    private closeWindowSource: AudioSource
    private errorSource: AudioSource
    private alertSource: AudioSource
    private moreBoosterSource: AudioSource
    private lessBoosterSource: AudioSource
    private joinQuizSource: AudioSource
    private leaveQuizSource: AudioSource
    private useBoosterSource: AudioSource    
    private tileSource: AudioSource

    private neutralSoundsEntity: Entity
    private buyBoosterSource: AudioSource

    private activeSoundsEntity: Entity    
    private nextQuestionSource: AudioSource
    private correctSource: AudioSource
    private wrongSource: AudioSource
    private completeQuizSource: AudioSource
    private sound321Source: AudioSource
    private focusSource: AudioSource
    private soundPrestartSource: AudioSource
    private applaudsSource: AudioSource

    private constructor()
    {
        this.configMusic()
        this.configPassiveSounds()
        this.configNeutralSounds()
        this.configActiveSounds()
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

        let joinClip = new AudioClip("sounds/music/join.mp3")
        this.joinSource = new AudioSource(joinClip)
        this.joinSource.loop = true
        this.joinSource.volume = 1.0       
        
        let awaitingClip = new AudioClip("sounds/music/awaiting.mp3")
        this.awaitingSource = new AudioSource(awaitingClip)
        this.awaitingSource.loop = true
        this.awaitingSource.volume = 1.0   

        for (var i = 0; i < 3; i++)
        {
            for (var j = 0; j < 3; j++)
            {
                let musicEntity = new Entity()                            

                let transform = new Transform(
                    {
                        position: new Vector3(6 + 10 * j, ((j == 0 || j == 2) && (i == 0 || i == 2)) ? 10 : 8, 12 + 8 * i)
                    })

                musicEntity.addComponent(transform)

                this.musicEntities.push(musicEntity)

                engine.addEntity(musicEntity)
            }
        }

        for (var j = 0; j < 3; j++)
        {
            let musicEntity = new Entity()                

            let transform = new Transform(
                {
                    position: new Vector3(5 + 11 * j, 13, 3)
                })

            musicEntity.addComponent(transform)

            this.musicEntities.push(musicEntity)

            engine.addEntity(musicEntity)
        }
    }

    private configPassiveSounds(): void
    {
        let openWindowClip = new AudioClip("sounds/sounds/passive_sounds/open_window.mp3")
        this.openWindowSource = new AudioSource(openWindowClip)        
        this.openWindowSource.volume = 0.5
        this.openWindowSource.playing = false

        let closeWindowClip = new AudioClip("sounds/sounds/passive_sounds/close_window.mp3")
        this.closeWindowSource = new AudioSource(closeWindowClip)
        this.closeWindowSource.volume = 0.5
        this.closeWindowSource.playing = false

        let errorClip = new AudioClip("sounds/sounds/passive_sounds/error.mp3")
        this.errorSource = new AudioSource(errorClip)
        this.errorSource.volume = 0.6
        this.errorSource.playing = false

        let alertClip = new AudioClip("sounds/sounds/passive_sounds/alert.mp3")
        this.alertSource = new AudioSource(alertClip)
        this.alertSource.volume = 0.6
        this.alertSource.playing = false

        let moreBoosterClip = new AudioClip("sounds/sounds/passive_sounds/more_booster.mp3")
        this.moreBoosterSource = new AudioSource(moreBoosterClip)
        this.moreBoosterSource.volume = 0.5
        this.moreBoosterSource.playing = false

        let lessBoosterClip = new AudioClip("sounds/sounds/passive_sounds/less_booster.mp3")
        this.lessBoosterSource = new AudioSource(lessBoosterClip)
        this.lessBoosterSource.volume = 0.5
        this.lessBoosterSource.playing = false

        let joinQuizClip = new AudioClip("sounds/sounds/passive_sounds/join_quiz.mp3")
        this.joinQuizSource = new AudioSource(joinQuizClip)
        this.joinQuizSource.volume = 0.1
        this.lessBoosterSource.playing = false

        let leaveQuizClip = new AudioClip("sounds/sounds/passive_sounds/leave_quiz.mp3")
        this.leaveQuizSource = new AudioSource(leaveQuizClip)
        this.leaveQuizSource.volume = 0.1
        this.lessBoosterSource.playing = false

        let useBoosterClip = new AudioClip("sounds/sounds/passive_sounds/use_booster.mp3")
        this.useBoosterSource = new AudioSource(useBoosterClip)
        this.useBoosterSource.volume = 0.5
        this.useBoosterSource.playing = false       

        let tileClip = new AudioClip("sounds/sounds/active_sounds/tile.mp3")
        this.tileSource = new AudioSource(tileClip)
        this.tileSource.volume = 0.6
        this.tileSource.playing = false

        this.passiveSoundsEntity = new Entity()

        engine.addEntity(this.passiveSoundsEntity)
    }   

    private configNeutralSounds(): void
    {
        let buyBoosterClip = new AudioClip("sounds/sounds/neutral_sounds/buy_booster.mp3")
        this.buyBoosterSource = new AudioSource(buyBoosterClip)
        this.buyBoosterSource.volume = 0.5
        this.buyBoosterSource.playing = false

        let applaudsClip = new AudioClip("sounds/sounds/neutral_sounds/applauds.mp3")
        this.applaudsSource = new AudioSource(applaudsClip)
        this.applaudsSource.volume = 0.5
        this.applaudsSource.playing = false  


        this.neutralSoundsEntity = new Entity()

        engine.addEntity(this.neutralSoundsEntity)
    }

    private configActiveSounds(): void
    {
        let nextQuestionClip = new AudioClip("sounds/sounds/active_sounds/next_question.mp3")
        this.nextQuestionSource = new AudioSource(nextQuestionClip)
        this.nextQuestionSource.volume = 0.5
        this.nextQuestionSource.playing = false     
        
        let correctClip = new AudioClip("sounds/sounds/active_sounds/correct.mp3")
        this.correctSource = new AudioSource(correctClip)
        this.correctSource.volume = 0.5
        this.correctSource.playing = false  

        let wrongClip = new AudioClip("sounds/sounds/active_sounds/wrong.mp3")
        this.wrongSource = new AudioSource(wrongClip)
        this.wrongSource.volume = 0.5
        this.wrongSource.playing = false  

        let completeQuizClip = new AudioClip("sounds/sounds/active_sounds/complete_quiz.mp3")
        this.completeQuizSource = new AudioSource(completeQuizClip)
        this.completeQuizSource.volume = 0.5
        this.completeQuizSource.playing = false  

        let sound321Clip = new AudioClip("sounds/sounds/active_sounds/321.mp3")
        this.sound321Source = new AudioSource(sound321Clip)
        this.sound321Source.volume = 0.5
        this.sound321Source.playing = false  

        let focusClip = new AudioClip("sounds/sounds/active_sounds/focus.mp3")
        this.focusSource = new AudioSource(focusClip)
        this.focusSource.volume = 0.6
        this.focusSource.playing = false  

        let soundPrestartClip = new AudioClip("sounds/sounds/active_sounds/prestart.mp3")
        this.soundPrestartSource = new AudioSource(soundPrestartClip)
        this.soundPrestartSource.volume = 0.5
        this.soundPrestartSource.playing = false  

        this.activeSoundsEntity = new Entity()

        engine.addEntity(this.activeSoundsEntity)
    }   

    public playIdleMusic(): void
    {
        this.awaitingSource.playing = false
        this.joinSource.playing = false

        for (var i = 0; i < this.musicEntities.length; i++)
        {
            this.musicEntities[i].addComponentOrReplace(this.idleSource)
        }

        this.idleSource.playing = true
    }

    public playJoinMusic(): void
    {
        this.awaitingSource.playing = false
        this.idleSource.playing = false

        for (var i = 0; i < this.musicEntities.length; i++)
        {
            this.musicEntities[i].addComponentOrReplace(this.joinSource)
        }

        this.joinSource.playing = true
    }

    public playAwaitingMusic(): void
    {
        this.idleSource.playing = false

        for (var i = 0; i < this.musicEntities.length; i++)
        {
            this.musicEntities[i].addComponentOrReplace(this.awaitingSource)
        }

        this.awaitingSource.playing = true
    }

    public muteMusic(): void
    {
        this.joinSource.playing = false
        this.idleSource.playing = false
    }

    public playOpenWindow(): void
    {
        this.closeWindowSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.openWindowSource)
        this.openWindowSource.playOnce()
    }

    public playCloseWindow(): void
    {
        this.openWindowSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.closeWindowSource)
        this.closeWindowSource.playOnce()
    }

    public playError(): void
    {
        this.openWindowSource.playing = false
        this.closeWindowSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.errorSource)
        this.errorSource.playOnce()
    }

    public playAlert(): void
    {
        this.openWindowSource.playing = false
        this.closeWindowSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.alertSource)
        this.alertSource.playOnce()
    }

    public playMoreBooster(): void
    {
        this.lessBoosterSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.moreBoosterSource)
        this.moreBoosterSource.playOnce()
    }

    public playLessBooster(): void
    {
        this.moreBoosterSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.lessBoosterSource)
        this.lessBoosterSource.playOnce()
    }

    public playJoinQuiz(): void
    {
        this.openWindowSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.joinQuizSource)
        this.joinQuizSource.playOnce()
    }

    public playLeaveQuiz(): void
    {
        this.openWindowSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.leaveQuizSource)
        this.leaveQuizSource.playOnce()
    }

    public playUseBooster(): void
    {
        this.openWindowSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.useBoosterSource)
        this.useBoosterSource.playOnce()
    }

    public playTile(): void
    {
        this.tileSource.playing = false
        this.passiveSoundsEntity.addComponentOrReplace(this.tileSource)
        this.tileSource.playOnce()
    }

    public playBuyBooster(): void
    {
        this.neutralSoundsEntity.addComponentOrReplace(this.buyBoosterSource)
        this.buyBoosterSource.playOnce()
    }

    public playApplauds(): void
    {
        this.neutralSoundsEntity.addComponentOrReplace(this.applaudsSource)
        this.applaudsSource.playOnce()
    }

    public playNextQuestion(): void
    {
        this.soundPrestartSource.playing = false
        this.sound321Source.playing = false
        this.activeSoundsEntity.addComponentOrReplace(this.nextQuestionSource)
        this.nextQuestionSource.playOnce()
    }

    public playCorrect(): void
    {
        this.sound321Source.playing = false
        this.activeSoundsEntity.addComponentOrReplace(this.correctSource)
        this.correctSource.playOnce()
    }

    public playWrong(): void
    {
        this.sound321Source.playing = false
        this.activeSoundsEntity.addComponentOrReplace(this.wrongSource)
        this.wrongSource.playOnce()
    }

    public playCompleteQuiz(): void
    {
        this.sound321Source.playing = false
        this.activeSoundsEntity.addComponentOrReplace(this.completeQuizSource)
        this.completeQuizSource.playOnce()
    }

    public playSound321(): void
    {
        this.sound321Source.playing = false
        this.activeSoundsEntity.addComponentOrReplace(this.sound321Source)
        this.sound321Source.playOnce()
    }

    public playFocus(): void
    {
        this.sound321Source.playing = false
        this.activeSoundsEntity.addComponentOrReplace(this.focusSource)
        this.focusSource.playOnce()
    }

    public playSoundPrestart(): void
    {
        this.soundPrestartSource.playing = false
        this.activeSoundsEntity.addComponentOrReplace(this.soundPrestartSource)
        this.soundPrestartSource.playOnce()
    }    

    public getPassiveSoundsEntity(): Entity
    {
        return this.passiveSoundsEntity
    }

    public getNeutralSoundsEntity(): Entity
    {
        return this.neutralSoundsEntity
    }

    public getActiveSoundsEntity(): Entity
    {
        return this.activeSoundsEntity
    }
}