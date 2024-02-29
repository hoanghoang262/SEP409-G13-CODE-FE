interface TestCase {
    Inputs:string[];
    Result:string
}

export function initTestCase():TestCase{
    return {
        Inputs:["input"],
        Result:"result"
    }
}

interface Answer {
    Content:string,
    Correct:boolean
}

export function initAnswer(Correct:boolean):Answer{
    return {
        Content:"Answer",
        Correct
    }
}

interface Question {
    Question:string,
    Answers: Answer[]
}

export function initQuestion():Question{
    return {
        Question:"Question",
        Answers:[initAnswer(false),initAnswer(false),initAnswer(false),initAnswer(true)]
    }
}

interface Lession{
    Name:string,
    Content:string,
    Type:string,
    Code:string,
    TestCases:TestCase[],
    Questions:Question[]
}

export function initLessions(Type:string):Lession {
    return {
        Name: "LessionsName",
        Content: "Content",
        Type,
        Code:"code",
        TestCases: [initTestCase(),initTestCase()],
        Questions: [initQuestion(),initQuestion()]
    }
}

export interface Chapter{
    Name:string,
    Description:string,
    Lessions:Lession[]
}

export function initChapter():Chapter {
    return {
        Name: "ChapterName",
        Description:"Description",
        Lessions:[initLessions("code")]
    }
}

