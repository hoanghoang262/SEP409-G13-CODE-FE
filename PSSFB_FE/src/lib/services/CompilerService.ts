import axios from 'axios';
import { checkExist } from '../../helpers/helpers';

export const CComplier = async (data: any) => {
	try {
		console.log(JSON.stringify(data));
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/C_Compiler/CompileCodeCCodeQuestion`,
			data
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const CPlusComplier = async (data: any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/CPlus_Compiler/CompileCodeCPlusCodeQuestion`,
			data
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const JavaComplier = async (data: any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/JavaCompile/CompileCodeJavaCodeQuestion`,
			data
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};


export const CEditor = async (data: any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/C_Compiler/CompileCodeCCodeEditor`,
			data
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const CPlusEditor = async (data: any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/CPlus_Compiler/CompileCodeCPlusCodeEditor`,
			data
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const JavaEditor = async (data: any) => {
	try {
		console.log(JSON.stringify(data));
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/JavaCompile/CompileCodeJavaCodeEditor`,
			data
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const CForm = (codeForm: string, testCase: string) => {
	const CForm = `#include <stdio.h>  
	#include <stdlib.h>  
	#include <stdbool.h> 
	#include <string.h> 
	
	#define TYPE_INT 1
	#define TYPE_FLOAT 2
	#define TYPE_DOUBLE 3
	#define TYPE_STRING 4
	#define TYPE_BOOL 5
	
	#define GET_TYPE(var) _Generic((var),   int: TYPE_INT,  float: TYPE_FLOAT, double: TYPE_DOUBLE, char*: TYPE_STRING, bool: TYPE_BOOL )
	
	#define PRINT_VALUE(var, type) switch(type) { case TYPE_INT: printf("%d", var); break;  case TYPE_FLOAT: printf("%0.2f", (double)var); break; case TYPE_DOUBLE: printf("%0.2lf", var); break; case TYPE_STRING: printf("%s", var); break; case TYPE_BOOL: printf("%d", var); break; }
	
	#define assertEqual(expected, actual, message) do { int type = GET_TYPE(expected); if (expected == actual) { } else {  printf("Test Failed At Input: %s; Expected: ", message);  PRINT_VALUE(expected, type); printf(", Actual: "); PRINT_VALUE(actual, GET_TYPE(actual));  exit(0); } } while (0) \n ${codeForm} \n ${testCase} \n 
		int main() {
			TestCase();
			return 0;
		}`
	return CForm;
};

export const JavaForm = (codeForm: string, testCase: string) => {
	const JavaForm = `
	import java.util.*;
    public class Solution  {
                   public static void main(String[] args) {
                        Solution s= new Solution();
                        s.TestCase();
                        
                    }
					public static void assertEqual(Object expected, Object actual, Object message) {
						if (expected == null && actual == null) {
								   return;
						}
						if (expected == actual ) {
							return;
				}
						if (expected == null || !expected.equals(actual)) {
										System.out.println("Test Failed At Input: "+ message+ " ,Expected: " + expected + ", but was: " + actual);
										System.exit(0);

						}
					} \n ${codeForm} \n ${testCase} \n}`;
	return JavaForm;
};

export const CPlusForm = (codeForm: string, testCase: string) => {
	const CPlusForm = `#include <iostream>
    #include <vector>
	#include <string> 
    using namespace std;
    
    template<typename T, typename U> 
void assertEqual(T expected, T actual, U message) {
    if (expected == actual) {
         
        return;
    } else {
        std::cout << "Test Failed at input: " << message << "; ";
        std::cout << "Expected: " << expected << ", Actual: " << actual << std::endl;
       exit(0);
    }
} \n ${codeForm} \n ${testCase} \n 

	int main() {
		TestCase();
		return 0;
	}`;
	return CPlusForm;
};


export const CComplieToCheck = async (codeForm:string, testCase:any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/C_Compiler/CompileCodeCToCheck`,
			{userCode: CForm(codeForm, testCase)}
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const CPlusComplieCodeToCheck = async (codeForm:string, testCase:any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/CPlus_Compiler/CompileCodeCPlusTest`,
			{userCode: CPlusForm(codeForm, testCase)}
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const JavaComplieCodeToCheck = async (codeForm:string, testCase:any) => {
	try {
		console.log(JSON.stringify({userCode: JavaForm(codeForm, testCase)}))
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/JavaCompile/CompileCodeJavaTest`,
			{userCode: JavaForm(codeForm, testCase)}
		);
		return result.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const ExecuteResult = (result: any) => {
	let resultList = [];

	try {
		const string = result.data;
		let lines = string.split('\n');
		console.log(lines);
		// Lặp qua từng dòng
		for (let i = 0; i < lines.length; i += 4) {
			if (checkExist(lines[i])) {
				const expected = parseInt(lines[i].split(': ')[1]);
				const actual = parseInt(lines[i + 1].split(': ')[1]);
				const result = lines[i + 2].split(': ')[1].trim();
				// Tạo đối tượng từ dữ liệu
				const test = {
					expected: expected,
					actual: actual,
					result: result
				};

				// Thêm đối tượng vào mảng
				resultList.push(test);
			}
		}
	} catch (error) {
		resultList = [{ result: result.data }];
	}
	console.log(resultList);
	return resultList;
};
