import { RightScreenComponent } from "../components/right_screen_component"
import { TimedQuizScreenComponent } from "../components/timed_quiz_screen_component"

export class TimerSystem implements ISystem
{
    private rightScreenMain: IEntity
    private timedQuizScreenMain: IEntity

    constructor()
    {        
        this.rightScreenMain = engine.getComponentGroup(RightScreenComponent).entities[0]
        this.timedQuizScreenMain = engine.getComponentGroup(TimedQuizScreenComponent).entities[0]
    }

    update(dt: number)
    {
        this.updateQuestionsTimer()
        this.updateTimedQuizTimer()
    }

    updateQuestionsTimer(): void
    {
        let rightComp = this.rightScreenMain.getComponent(RightScreenComponent)

        var text = this.rightScreenMain.getComponent(TextShape)

        text.value = rightComp.timeLeft
        text.fontSize = 3
    }

    updateTimedQuizTimer(): void
    {
        let timedComp = this.timedQuizScreenMain.getComponent(TimedQuizScreenComponent)

        var text = this.timedQuizScreenMain.getComponent(TextShape)

        text.value = timedComp.timeLeft
        text.fontSize = 2
    }
}