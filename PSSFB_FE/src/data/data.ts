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
	{ display: 'Learning', link: 'learning' },
	{ display: 'Leaderboard', link: 'leaderboard' },
	{ display: 'Achievements', link: 'achieve' },
	{ display: 'Forums', link: 'forums' },
	{ display: 'About Us', link: 'aboutus' }
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
