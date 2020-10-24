export class Question
{
    actualQuestion: string
    answers: Array<string>

    constructor(actualQuestion: string, answers: Array<string>)
    {
        this.actualQuestion = actualQuestion
        this.answers = answers
    }
}