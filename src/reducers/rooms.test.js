import { ROOM_LIST } from "../actions/constants/action-types";
import rooms from "./rooms";

it('Rooms reducer - should handle ROOM_LIST action', () => {
  const room = {
    type: ROOM_LIST,
    rooms: [{ roomId: '1002' }]
  };

  expect(
    rooms(undefined, {})
  ).toEqual([]);

  expect(
    rooms([], room)
  ).toEqual(
    [{ roomId: '1002' }]
  );
});
