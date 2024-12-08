export function getStartOfMinute(date) {
    if (!date instanceof Date) throw new Error('Invalid date argument')
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
}