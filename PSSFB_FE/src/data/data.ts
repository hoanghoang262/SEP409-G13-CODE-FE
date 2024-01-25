import Thanh from '../assets/Thanh.jpg';
import Binh from '../assets/binh.jpg';
import Hoang from '../assets/Hoang.jpg';
import Duc from '../assets/Duc.jpg';
import Chien from '../assets/chien.jpg';

interface section {
	display: string;
	link: string;
}

interface dev {
	image: any;
	name: string;
	email: string;
	facebook: string;
	position: string;
}

export const headerData: section[] = [
	{ display: 'Learning', link: '/learning' },
	{ display: 'Leaderboard', link: '/leaderboard' },
	{ display: 'Achievements', link: '/achieve' },
	{ display: 'Forums', link: '/forums' },
	{ display: 'About Us', link: '/aboutus' }
];

export const teammates: dev[] = [
	{
		image: Thanh,
		name: 'Nguyen Cong Thanh',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'front-end devloper'
	},
    {
		image: Duc,
		name: 'Bui Nguyen Ngoc Duc',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'tester'
	},
    {
		image: Binh,
		name: 'Pham Hai Binh',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'backend developer'
	},
    {
		image: Hoang,
		name: 'Nguyen Huy Hoang',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'leader'
	},
    {
		image: Chien,
		name: 'Ha Viet Chien',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'backend developer'
	}
];

export const courses = [
	{
		title: 'C++ for Beginners',
		description: 'The complete C++ Programing Course for Beginners, this course teaches you the fundamentals of a programing language. After completed, you will be able to move from the basics to more advanced course.',
		image:'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/bf4dca390c5742bda4dbf6344e859eb9.jpg',
		estimateTime:72000
	},
	{
		title: 'Javascript basics',
		description: 'Help students master the basic fundamental and syntax in Javascript - the most popular programming language in the world.',
		image:'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/8c4eed15a33744e996461692464ebc7f.jpg',
		estimateTime:93600
	},
	{
		title: 'Advance C++',
		description: 'The complete C++ Programing Course for Beginners, this course teaches you the fundamentals of a programing language. After completed, you will be able to move from the basics to more advanced course.',
		image:'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/37a8e25c3ada4cb0bc3b0b32a36881fe.jpg',
		estimateTime:72000
	},
	{
		title: 'Python fundamentals',
		description: 'This course was created for complete beginners and will teach you programming fundamentals in a Python. Learn python programming fundamentals and build your first project from start to finish.',
		image:'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/cf55489ccd434e8c81c61e6fffc9433f.jpg',
		estimateTime:93600
	}
]

export const posts = [
	{
		image:'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/c4576cce3c7d44c2af2c65a42636faff.jpg',
		title:'Nurture Your Software DNA_Mini code challenge',
		content:'Nurture Your Software DNA_Mini code challenge',
		comment:'47',
		createdDate:'07-11-2023'
	},
	{
		image:'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/34f5b8da9011429faf9e08ab7be4fd52.png',
		title:'FPT TECHDAY 2021_CODE WARS: VÒNG ĐẤU TỰ DO - 03/12/2021',
		content:' Bảng thi giành cho mọi đối tượng đam mê lập trình, yêu thích công nghệ \n Đăng ký tham gia vui lòng truy cập: https://techday2021.fpt.com.vn/vi/code-war',
		comment:'305',
		createdDate:'03-12-2021'
	}
]

export const skills = [
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Java.svg',
		name:'java',
		rate: 4
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/C.svg',
		name:'C',
		rate: 4.2
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Cplus.svg',
		name:'C++',
		rate: 3.4
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Python.svg',
		name:'Python',
		rate: 2
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Csharp.svg',
		name:'C#',
		rate: 3.7
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Go.svg',
		name:'Go',
		rate: 4.1
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/JS.svg',
		name:'javascript',
		rate: 3.2
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/mysql.svg',
		name:'MySQL',
		rate: 4
	},
	{
		icon:'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/postgresql.svg',
		name:'Postgresql',
		rate: 5
	},
]
