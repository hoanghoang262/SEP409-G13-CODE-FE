export function formatDate(inputDate: string) {
    console.log(inputDate)
    const date = new Date(inputDate);
    let day
    const pre_day = date.getDate()

    if (pre_day < 10) {
        day = "0" + pre_day
    } else {
        day = pre_day
    }

    const pre_month = date.getMonth() + 1
    let month
    if (pre_month < 10) {
        month = "0" + pre_month
    } else {
        month = pre_month
    }

    const year = date.getFullYear()

    return `${day}-${month}-${year}`;
}

export function formatDateTime(inputDate: string) {
    console.log(inputDate)
    const date = new Date(inputDate);
    let day
    const pre_day = date.getDate()

    if (pre_day < 10) {
        day = "0" + pre_day
    } else {
        day = pre_day
    }

    const pre_month = date.getMonth() + 1
    let month
    if (pre_month < 10) {
        month = "0" + pre_month
    } else {
        month = pre_month
    }

    const year = date.getFullYear()

    const hour = date.getHours()
    const minute = date.getMinutes()


    return `${day}/${month}/${year}-${hour}:${minute}`;

}

function getDateMinusSevenHours(dateString: string) {
    const targetDate = new Date(dateString);
    targetDate.setHours(targetDate.getHours() + 7); // Subtract 7 hours
    return targetDate;
}

export function getTimeDifference(dateString: string) {
    // Parse the given date string
    const targetDate: any = new Date(getDateMinusSevenHours(dateString));

    // Get the current date and time
    const currentDate: any = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate - currentDate;

    // Convert the time difference to seconds, minutes, hours, and days
    const secondsDifference = Math.floor(Math.abs(timeDifference) / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);

    // Calculate remaining time after weeks
    const remainingDays = daysDifference % 7;
    const remainingHours = hoursDifference % 24;
    const remainingMinutes = minutesDifference % 60;
    const remainingSeconds = secondsDifference % 60;

    // Generate the human-readable string

    if (weeksDifference > 0) {
        return `${weeksDifference} week${weeksDifference === 1 ? '' : 's'} ago `;
    }
    if (remainingDays > 0) {
        return `${remainingDays} day${remainingDays === 1 ? '' : 's'} ago `;
    }
    if (remainingHours > 0) {
        return `${remainingHours} hour${remainingHours === 1 ? '' : 's'} ago `;
    }
    if (remainingMinutes > 0) {
        return `${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'} ago `;
    }
    if (remainingSeconds > 0) {
        return `${remainingSeconds} second${remainingSeconds === 1 ? '' : 's'} ago`;
    }

}