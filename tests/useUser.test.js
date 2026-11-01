import { useUser } from "../src/hooks/useUser";

const mockAuthContext = { user: undefined };

jest.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: (selector) => selector(mockAuthContext),
}));

describe("useUser", () => {
  beforeEach(() => {
    mockAuthContext.user = undefined;
  });

  it("returns the authenticated user and username", () => {
    const user = { username: "shopper" };
    mockAuthContext.user = user;

    expect(useUser()).toEqual({ user, username: "shopper" });
  });

  it("returns undefined values when there is no authenticated user", () => {
    expect(useUser()).toEqual({
      user: undefined,
      username: undefined,
    });
  });

  it("uses the current username when the authenticated user changes", () => {
    mockAuthContext.user = { username: "first-shopper" };
    expect(useUser().username).toBe("first-shopper");

    const user = { username: "second-shopper" };
    mockAuthContext.user = user;

    expect(useUser()).toEqual({ user, username: "second-shopper" });
  });
});
