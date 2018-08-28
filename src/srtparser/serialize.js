import { toMS } from './date';
const CHUNK_SEPARATOR = '\n\n';

/**
 * Builds the file contents of an SRT given an array of SRTChunks
 * @param  {Array} srtChunks
 * @return {String}
 */
export default function serialize(srtChunks) {
  return srtChunks
    .map(
      chunk => `${chunk.sequenceNumber}
${serializeTimeSpan(chunk.time)}
${chunk.text}`
    )
    .join(CHUNK_SEPARATOR);
}

/**
 * Given a TimeSpan { start, end }, return the serialized representation
 * @example
 * serializeTimeSpan({start: 0, end: 1}) === '00:00:00,000 --> 00:00:00,001'
 * @param  {[type]} timeSpan [description]
 * @return {[type]}          [description]
 */
function serializeTimeSpan(timeSpan) {
  return `${serializeTimeStamp(timeSpan.start)} --> ${serializeTimeStamp(
    timeSpan.end
  )}`;
}

/**
 * Given a timestamp ()
 * @example
 * serializeTimeStamp(1000) === 00:00:01,000
 * @param  {Integer} timeStamp - Timestamp in microseconds
 * @return {String} - A string representation of the timestamp in SRT format
 */
function serializeTimeStamp(timeStamp) {
  let remainder = timeStamp;
  const hours = timeStamp / toMS.hour;
  remainder %= toMS.hour;
  const minutes = remainder / toMS.minute;
  remainder %= toMS.minute;
  const seconds = remainder / toMS.second;
  remainder %= toMS.second;
  const millis = remainder;

  const padding = [2, 2, 2, 3];
  const [strHours, strMinutes, strSeconds, strMillis] = [
    hours,
    minutes,
    seconds,
    millis,
  ]
    // Map numbers to 0-padding + rounded strings
    .map((value, i) => `${Math.floor(value)}`.padStart(padding[i], '0'));

  return `${strHours}:${strMinutes}:${strSeconds},${strMillis}`;
}