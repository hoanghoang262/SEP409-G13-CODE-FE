interface TestCase {
    inputTypeInt:BigInteger,
    inputTypeString:string,
    expectedResultInt:BigInteger,
    expectedResultString:string,
    inputTypeBoolean:Boolean,
    expectedResultBoolean:Boolean,
    inputTypeArrayInt:string,
    inputTypeArrayString:string,

}

// export function initTestCase():TestCase{
//     return {
//         Inputs:["input"],
//         Result:"result"
//     }
// }

interface answerOption {
    optionsText:string,
    correctAnswer:boolean
}

export function initAnswer(correctAnswer:boolean):answerOption{
    return {
        optionsText:"Answer",
        correctAnswer
    }
}

interface Question {
    contentQuestion:string,
    time:Number,
    answerOptions: answerOption[]
}

export function initQuestion():Question{
    return {
        contentQuestion:"Question",
        time:3000,
        answerOptions:[initAnswer(false),initAnswer(false),initAnswer(false),initAnswer(true)]
    }
}

interface Lession{
    title:string,
    videoUrl:string,
    description:string,
    duration:Number,
    questions:Question[]
}

export function initLessions():Lession {
    return {
        title: "LessionsName",
        videoUrl: "url",
        description:"description",
        duration:60*10,
        questions: [initQuestion(),initQuestion()]
    }
}

interface codeQuestion {
    description:string,
    codeForm:string,
    testCases:TestCase[]
}

export function intitCodeQuestion():codeQuestion{
    return{
        description:"description",
        codeForm:"",
        testCases:[]
    }
}

export interface Chapter{
    Name:string,
    Description:string,
    Part:Number,
    codeQuestions:codeQuestion[]
    Lessions:Lession[]
}

export function initChapter():Chapter {
    return {
        Name: "ChapterName",
        Description:"Description",
        Part:1,
        Lessions:[initLessions()],
        codeQuestions:[intitCodeQuestion()]
    }
}

