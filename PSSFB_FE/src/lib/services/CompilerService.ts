import axios from 'axios';
import { checkExist } from '../../helpers/helpers';

export const CComplier = async (data: any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/C_Compiler/CompileCodeCCodeQuestion`,
			data
		);
		return result;
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
		return result;
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

export const CForm = (codeForm: string, testCase: string) => {
	const CForm = `#include <stdio.h> \n ${codeForm} \n ${testCase} \n int main() { \n TestCase(); \nreturn 0; \n}`;
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
					public static void assertEqual(Object expected, Object actual) {
						if (expected == null && actual == null) {
								   return;
						}
						if (expected == actual ) {
							return;
				}
						if (expected == null || !expected.equals(actual)) {
										System.out.println("Test Failed:Expected: " + expected + ", but was: " + actual);
						}
					} \n ${codeForm} \n ${testCase} \n}`;
	return JavaForm;
};

export const CPlusForm = (codeForm: string, testCase: string) => {
	const CPlusForm = `#include <iostream>
    #include <vector>
    using namespace std;
    
    class Solution {
    public: \n ${codeForm} \n ${testCase} \n };

    int main() {
        Solution s;
        s.TestCase();
        return 0;
    }`;
	return CPlusForm;
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
		resultList = [{result: result.data}]
	}
	console.log(resultList)
	return resultList;
};
