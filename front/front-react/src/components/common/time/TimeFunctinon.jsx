// input : datetime, output : * 분 전, * 시간 전, * 일 전

export const getTimeDeltaString = (regTime) => {
  const timeDeltaSeconds = Math.floor((Date.now() - regTime) / 1000);
  
  if(timeDeltaSeconds < 60) {
    return `${timeDeltaSeconds}초 전`
  } else if (timeDeltaSeconds < 3600 ) {
    return `${Math.floor(timeDeltaSeconds/60)}분 전`
  } else if (timeDeltaSeconds < 3600 * 24) {
    return `${Math.floor(timeDeltaSeconds/3600)}시간 전`
  } else if (timeDeltaSeconds < 3600 * 24 * 30) {
    return `${Math.floor(timeDeltaSeconds/(3600*24))}일 전`
  } else {
    const date = new Date(regTime)
    const strYear = date.getFullYear()
    const strMonth = date.getMonth()
    const strDay = date.getDay()
    return `${strYear === Date.now().getFullYear() ? '' : strYear + '/'}${strMonth}/${strDay}`
  }
}