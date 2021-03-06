import SRTParser from 'srt-validator/srtparser';
import { toMS } from 'srt-validator/srtparser/date';

const { test } = QUnit;

test('Success: simple serialization', function(assert) {
  assert.equal(
    SRTParser.serialize([
      {
        sequenceNumber: 1,
        time: { start: 0, end: toMS.hour + toMS.minute + toMS.second + 1 },
        text: 'Hello',
      },
      {
        sequenceNumber: 2,
        time: { start: 0, end: 0 },
        text: 'World',
      },
    ]),
    `1
00:00:00,000 --> 01:01:01,001
Hello

2
00:00:00,000 --> 00:00:00,000
World`
  );
});
