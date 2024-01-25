export function secondsToHMS(seconds:number) {
    // Calculate hours, minutes, and remaining seconds
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    // Add leading zero if needed
    var hoursStr = (hours < 10) ? "0" + hours : hours;
    var minutesStr = (minutes < 10) ? "0" + minutes : minutes;
    var secondsStr = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;

    // Combine the results into the "hh:mm:ss" format
    var timeString = hoursStr + ':' + minutesStr + ':' + secondsStr;

    return timeString;
}