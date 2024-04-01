export function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    let day
    const pre_day = date.getDate()
    if (pre_day <= 10) {
        day = "0" + pre_day
    }
    const pre_month = date.getMonth() + 1
    let month
    if (pre_month <= 10) {
        month = "0" + pre_month
    }
    const year = date.getFullYear()

    return `${day}-${month}-${year}`;
}