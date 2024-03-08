import { writable } from 'svelte/store';
export const currentUser:any = writable();
currentUser.subscribe((value:any) => {
	//console.log("currentUser", value);
}); // logs '0'

// currentUser.subscribe((value:any) => {
// 	currentUserValue =  value
// })
// export let currentUserValue = undefined
