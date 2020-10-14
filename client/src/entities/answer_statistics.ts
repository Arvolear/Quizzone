export class AnswerStatistics
{
    message: string
    answers: Array<string>

    constructor(message: string, answers: Array<string>)
    {
        this.message = message
        this.answers = answers
    }
}