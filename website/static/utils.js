export function weekdayStrFromNo(weekdayNo) {
    let weekdayMap = {
        0: 'mon',
        1: 'tue',
        2: 'wed',
        3: 'thu',
        4: 'fri',
        5: 'sat',
        6: 'sun',
    }
    return weekdayMap[weekdayNo]
}

export function pythonToJSDay(pythonDayNo) {
    // Python day index: mon=0, tue=1, ..., sun=6
    // JavaScript day index: sun=0, mon=1, ..., sat=6
    // Convert a python day index to JS day index
    
    return (pythonDayNo + 1) % 7;
}

export function JSToPythonDay(JSDayNo) {
    return (JSDayNo + 6) % 7;
}