interface TestCase {
	inputTypeInt: number | null;
	inputTypeString: string | null;
	expectedResultInt: number | null;
	expectedResultString: string | null;
	inputTypeBoolean: Boolean | null;
	expectedResultBoolean: Boolean | null;
	inputTypeArrayInt: number[] | null;
	inputTypeArrayString: string[] | null;
}

export function initTestCase(type: string): TestCase {
	switch (type) {
		case 'int':
			return {
				inputTypeInt: 0,
				inputTypeString: null,
				expectedResultInt: 0,
				expectedResultString: null,
				inputTypeBoolean: null,
				expectedResultBoolean: null,
				inputTypeArrayInt: null,
				inputTypeArrayString: null
			};
		case 'String':
			return {
				inputTypeInt: null,
				inputTypeString: "string",
				expectedResultInt: null,
				expectedResultString: "string",
				inputTypeBoolean: null,
				expectedResultBoolean: null,
				inputTypeArrayInt: null,
				inputTypeArrayString: null
			};
		case 'boolean':
			return {
				inputTypeInt: null,
				inputTypeString: null,
				expectedResultInt: null,
				expectedResultString: null,
				inputTypeBoolean: true,
				expectedResultBoolean: true,
				inputTypeArrayInt: null,
				inputTypeArrayString: null
			};
		case 'int[]':
			return {
				inputTypeInt: null,
				inputTypeString: null,
				expectedResultInt: null,
				expectedResultString: null,
				inputTypeBoolean: null,
				expectedResultBoolean: null,
				inputTypeArrayInt: [0],
				inputTypeArrayString: null
			};
		case 'String[]':
			return {
				inputTypeInt: null,
				inputTypeString: null,
				expectedResultInt: null,
				expectedResultString: null,
				inputTypeBoolean: null,
				expectedResultBoolean: null,
				inputTypeArrayInt: null,
				inputTypeArrayString: [""]
			};
	}

    return {
        inputTypeInt: 0,
        inputTypeString: null,
        expectedResultInt: 0,
        expectedResultString: null,
        inputTypeBoolean: null,
        expectedResultBoolean: null,
        inputTypeArrayInt: null,
        inputTypeArrayString: null
    };
}

interface answerOption {
	optionsText: string;
	correctAnswer: boolean;
}

export function initAnswer(correctAnswer: boolean): answerOption {
	return {
		optionsText: 'Answer',
		correctAnswer
	};
}

interface Question {
	contentQuestion: string;
	time: Number;
	answerOptions: answerOption[];
}

export function initQuestion(): Question {
	return {
		contentQuestion: 'Question',
		time: 3000,
		answerOptions: [initAnswer(false), initAnswer(false), initAnswer(false), initAnswer(true)]
	};
}

interface Lession {
	title: string;
	videoUrl: string;
	description: string;
	duration: Number;
	questions: Question[];
}

export function initLessions(): Lession {
	return {
		title: 'LessionsName',
		videoUrl: 'url',
		description: 'description',
		duration: 60 * 10,
		questions: [initQuestion(), initQuestion()]
	};
}

interface codeQuestion {
	description: string;
	codeForm: string;
	testCases: TestCase[];
}

export function intitCodeQuestion(): codeQuestion {
	return {
		description: 'description',
		codeForm: '',
		testCases: []
	};
}

export interface Chapter {
	Name: string;
	Description: string;
	Part: Number;
	codeQuestions: codeQuestion[];
	lessons: Lession[];
}

export function initChapter(): Chapter {
	return {
		Name: 'ChapterName',
		Description: 'Description',
		Part: 1,
		lessons: [initLessions()],
		codeQuestions: [intitCodeQuestion()]
	};
}
