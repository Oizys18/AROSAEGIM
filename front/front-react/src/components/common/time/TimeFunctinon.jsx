// input : datetime, output : * 분 전, * 시간 전, * 일 전
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 3600 * 24;
const SECONDS_PER_MONTH = 3600 * 24 * 30;

export const getTimeDeltaString = (regDate) => {
  const regTime = new Date(regDate.slice(0,-2) + ':00');
  const timeDeltaSeconds = Math.floor((Date.now() - regTime) / 1000);

  switch (true) {
    case timeDeltaSeconds < SECONDS_PER_DAY * (-1):
      return `${Math.floor(-1 * timeDeltaSeconds/SECONDS_PER_DAY)}일 후`
    case timeDeltaSeconds < SECONDS_PER_HOUR * (-1):
      return `${Math.floor(-1 * timeDeltaSeconds/SECONDS_PER_HOUR)}시간 후`
    case timeDeltaSeconds < SECONDS_PER_MINUTE * (-1):
      return `${Math.floor(-1 * timeDeltaSeconds/SECONDS_PER_MINUTE)}분 후`
    case timeDeltaSeconds < 0:
      return `${timeDeltaSeconds}초 후`
    case timeDeltaSeconds < SECONDS_PER_MINUTE:
      return `방금 전`
    case timeDeltaSeconds < SECONDS_PER_HOUR:
      return `${Math.floor(timeDeltaSeconds/SECONDS_PER_MINUTE)}분 전` 
    case timeDeltaSeconds < SECONDS_PER_DAY:
      return `${Math.floor(timeDeltaSeconds/SECONDS_PER_HOUR)}시간 전`
    case timeDeltaSeconds < SECONDS_PER_MONTH:
      return `${Math.floor(timeDeltaSeconds/SECONDS_PER_DAY)}일 전`
    default:
      const date = new Date(regTime)
      const strYear = date.getFullYear()
      const strMonth = date.getMonth() + 1
      const strDay = date.getDate()
      return `${strYear === new Date().getFullYear() ? '' : strYear + '년'}${strMonth}월 ${strDay}일`
  }
}