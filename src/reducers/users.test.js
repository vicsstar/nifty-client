import { USER_LIST } from "../actions/constants/action-types";
import users from "./users";

it('Users reducer - should handle USER_LIST action', () => {
  const user = {
    type: USER_LIST,
    users: [{ nickname: 'vicsstar' }]
  };

  expect(
    users(undefined, {})
  ).toEqual([]);

  expect(
    users([], user)
  ).toEqual(
    [{ nickname: 'vicsstar' }]
  );
});
