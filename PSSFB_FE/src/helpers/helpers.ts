import { toasts, ToastContainer, FlatToast, BootstrapToast } from 'svelte-toasts';
import type { ToastType } from 'svelte-toasts/types/common';

export function secondsToHMS(seconds: number) {
	// Calculate hours, minutes, and remaining seconds
	var hours = Math.floor(seconds / 3600);
	var minutes = Math.floor((seconds % 3600) / 60);
	var remainingSeconds = seconds % 60;

	// Add leading zero if needed
	var hoursStr = hours < 10 ? '0' + hours : hours;
	var minutesStr = minutes < 10 ? '0' + minutes : minutes;
	var secondsStr = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

	// Combine the results into the "hh:mm:ss" format
	var timeString = hoursStr + ':' + minutesStr + ':' + secondsStr;

	return timeString;
}

export function checkExist(v: any) {
	return v != undefined && v != null && v != '';
}

export function showToast(title: string, description: string, type:ToastType = 'info') {
	const toast = toasts.add({
		title,
		description,
		duration: 5000, // 0 or negative to avoid auto-remove
		placement: 'top-right',
		type,
		onClick: () => {},
		onRemove: () => {}
		// component: BootstrapToast, // allows to override toast component/template per toast
	});

	// toast.remove()
}

export function isValidEmail(email:string) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
