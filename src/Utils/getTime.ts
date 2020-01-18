/**
 *  GetTime = () => {}
 *   
 * @param current
 *  current = new Date().getTime();
 *  실행시킨 시간으로 1970년 1월 1일 0시 0분을
 *  기준으로 흐른시간을 문자열로 받는다.
 *  (로컬시간의 전체시간값을 밀리초로 나타냄.)
 *  
 *  다음 우선순위로 리턴됨.
 *  1. 하루 경과 존재하면 -> 해당 날짜 00년00월00일 출력.
 *  2. 시간 경과 존재하면 -> 경과한 시간 출력.
 *  3. 분 경과 존재하면 -> 경과한 분 출력.
 *  4. 초 경과 존재하면 -> 경과한 초 출력.
 */
export const getTime = (date: string): string => {
    const current = parseInt(date);
    const post = new Date().getTime();
    const time: number = post - current;
    const second: number = parseInt(time / 1000 + "");
    const minute: number = parseInt(second / 60 + "");
    const hour: number = parseInt(minute / 60 + "");
    const day: number = parseInt(hour / 24 + "");
    
    // console.log("second: ", second);
    // console.log("minute: ", minute);
    // console.log("hour: ", hour);
    // console.log("day: ", day);

    let result: string = "0";
    if(day > 0) {
        // result = `${day} days ago`;
        const newDate = new Date(current);
        const year: string = newDate.getFullYear() + ".";
        const month: string = newDate.getMonth() + 1 + ".";
        const day: string = newDate.getDate() + "       ";
        result = "".concat(year, month, day);
    } else if(hour > 0) {
        result = `${hour} hours ago`;
    } else if(minute > 0) {
        result = `${minute} minutes ago`;
    } else if(second > 0) {
        result = `${second} seconds ago`;
    } else {
        result = "" // 실행한 날짜입력되도록 하기.
    }
    return result;
}