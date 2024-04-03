import axios from 'axios';

export const CComplier = async (data: any) => {
	try {
		const result = await axios.post(
			`https://compilerservice.azurewebsites.net/api/C_Compiler`,
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
			`https://compilerservice.azurewebsites.net/api/CPlus_Compiler`,
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
			`https://compilerservice.azurewebsites.net/api/JavaCompiler`,
			data
		);
		return result;
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
}
