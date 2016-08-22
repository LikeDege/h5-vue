//玩法类型
import { JRNY_TYPE_LONGLINE, JRNY_TYPE_FEATURE, JRNY_TYPE_GUIDE, JRNY_TYPE_AIRPORT } from './common/constants';

export const transJourneyType = (journeyType) => {
  let str;
  journeyType = parseInt(journeyType);
  switch (journeyType) {
    case JRNY_TYPE_LONGLINE:
      str = '长线玩法';
      break;
    case JRNY_TYPE_FEATURE:
      str = '特色项目';
      break;
    case JRNY_TYPE_GUIDE:
      str = '向导服务';
      break;
    case JRNY_TYPE_AIRPORT:
      str = '机场接送';
      break;
    default:
  }
  return str;
};