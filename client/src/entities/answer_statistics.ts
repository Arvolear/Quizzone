export class AnswerStatistics
{
    headMessage: string
    answers: Array<string>
    tailMessage: string

    constructor(headMessage: string, answers: Array<string>, tailMessage: string)
    {
        this.headMessage = headMessage
        this.answers = answers
        this.tailMessage = tailMessage
    }
}