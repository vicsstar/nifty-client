import { CHANNEL_LIST } from "../actions/constants/action-types";
import channels from "./channels";

it('Channels reducer - should handle CHANNEL_LIST action', () => {
  const channel = {
    type: CHANNEL_LIST,
    channels: [{ channelId: '1002' }]
  };

  expect(
    channels(undefined, {})
  ).toEqual([]);

  expect(
    channels([], channel)
  ).toEqual(
    [{ channelId: '1002' }]
  );
});
