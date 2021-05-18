// This test file is added to run CI tests
// It should be deleted once we have legit tests
const mockCallback = jest.fn((val) => 2 * val);
const value = mockCallback(4);
test("expect to return a value", () => {
  expect(value).toBe(8);
});
