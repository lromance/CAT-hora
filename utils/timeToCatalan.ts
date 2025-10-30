
const numberToCatalan = (n: number, isHour: boolean = false): string => {
  const map: { [key: number]: string } = {
    1: isHour ? 'una' : 'un',
    2: isHour ? 'dues' : 'dos',
    3: 'tres',
    4: 'quatre',
    5: 'cinc',
    6: 'sis',
    7: 'set',
    8: 'vuit',
    9: 'nou',
    10: 'deu',
    11: 'onze',
    12: 'dotze',
  };
  return map[n] || n.toString();
};

export const timeToCatalan = (hour: number, minute: number): string => {
  if (minute < 0 || minute > 59) minute = 0;
  
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const nextH12 = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;

  const hText = numberToCatalan(h12, true);
  const nextHText = numberToCatalan(nextH12, true);

  // Special case: Midnight and Noon
  if (minute === 0) {
    if (hour === 0) return "És mitjanit.";
    if (hour === 12) return "És migdia.";
  }
  
  let verb = h12 === 1 ? "És la" : "Són les";

  if (minute === 0) return `${verb} ${hText} en punt.`;

  const quarters = Math.floor(minute / 15);
  const remainder = minute % 15;

  const nextHourArticle = nextH12 === 1 ? 'de la' : 'de les';
  verb = nextH12 === 1 ? "És" : "Són";

  let mainPart = '';

  switch (quarters) {
    case 0: // 0-14
      verb = h12 === 1 ? "És la" : "Són les";
      return `${verb} ${hText} i ${minute === 5 ? 'cinc' : minute === 10 ? 'deu' : `${minute} minuts`}.`;
    case 1: // 15-29
      mainPart = 'un quart';
      break;
    case 2: // 30-44
      mainPart = 'dos quarts';
      break;
    case 3: // 45-59
      mainPart = 'tres quarts';
      break;
  }
  
  if (remainder === 0) {
    return `${verb} ${mainPart} ${nextHourArticle} ${nextHText}.`;
  }

  const remainderText = remainder === 5 ? 'cinc' : remainder === 10 ? 'deu' : `${remainder} minuts`;
  return `${verb} ${mainPart} i ${remainderText} ${nextHourArticle} ${nextHText}.`;
};

export const formatTwoDigits = (num: number): string => num.toString().padStart(2, '0');
