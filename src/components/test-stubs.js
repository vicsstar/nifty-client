global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

export const store = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn()
};
