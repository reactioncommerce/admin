// This test file is added to run CI tests
// It should be deleted once we have legit tests
const mockCallback = jest.fn((val) => 2 * val);

test("expect to return a value", () => {
  expect(mockCallback(4)).toBe(8);
});
