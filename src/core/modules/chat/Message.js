import { CANDIDATE, SYSTEM, REPRESENTATIVE } from './contactTypes';
import moment from 'moment';

export default class Message {
  static buildCandidateMessageFromText (msg) {
    return new Message({
      text: msg.text,
      date: new Date().toISOString(),
      sender: {
        name: msg.senderName,
        type: CANDIDATE
      },
      __typename: 'Message'
    });
  }

  static buildRepresentativeMessageFromText (msg) {
    return new Message({
      text: msg.text,
      date: new Date().toISOString(),
      sender: {
        name: msg.senderName,
        type: REPRESENTATIVE
      },
      __typename: 'Message'
    });
  }

  constructor (messageObject) {
    Object.assign(this, messageObject);
  }

  isSentBySystem () {
    return this.sender.type === SYSTEM;
  };

  isSentByCandidate () {
    return this.sender.type === CANDIDATE;
  }

  isSentByRepresentative () {
    return this.sender.type === REPRESENTATIVE;
  }

  get chatFormatedDate () {
    return moment(this.date).calendar();
  }
}
