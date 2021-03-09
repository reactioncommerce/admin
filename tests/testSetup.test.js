//This test file is added to run CI tests
//It should be deleted once we have legit tests
const mockCallback = jest.fn(x => 2 * x);

test("expect to return a value", () => {
    expect(mockCallback(4)).toBe(8);
});
