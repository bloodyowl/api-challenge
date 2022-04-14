import { Future, Option, Result } from "@swan-io/boxed";

type UserInfo = {
  name: Option<string>;
};

export type User = {
  id: string;
  info: Option<UserInfo>;
};

const users: Record<string, User> = {
  "1": {
    id: "1",
    info: Option.None(),
  },
  "2": {
    id: "2",
    info: Option.Some({
      name: Option.None(),
    }),
  },
  "3": {
    id: "3",
    info: Option.Some({
      name: Option.Some("Mathieu Breton"),
    }),
  },
};

export const getUserById = (id: string) => {
  return Future.make<Result<User, "UserNotFound">>((resolve) => {
    const timeoutId = setTimeout(() => {
      const user = users[id];
      if (user == undefined) {
        resolve(Result.Error("UserNotFound"));
      } else {
        resolve(Result.Ok(user));
      }
    }, 100);
    return () => clearTimeout(timeoutId);
  });
};
