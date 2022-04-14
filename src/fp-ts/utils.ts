import { option, taskEither } from "fp-ts";
import { TaskEither } from "fp-ts/lib/TaskEither";

type UserInfo = {
  name: option.Option<string>;
};

export type User = {
  id: string;
  info: option.Option<UserInfo>;
};

const users: Record<string, User> = {
  "1": {
    id: "1",
    info: option.none,
  },
  "2": {
    id: "2",
    info: option.some({
      name: option.none,
    }),
  },
  "3": {
    id: "3",
    info: option.some({
      name: option.some("Mathieu Breton"),
    }),
  },
};

export const getUserById = (id: string): TaskEither<"UserNotFound", User> => {
  return taskEither.tryCatch(
    () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = users[id];
          if (user == undefined) {
            reject("UserNotFound");
          } else {
            resolve(user);
          }
        }, 100);
      });
    },
    (x) => x as "UserNotFound"
  );
};
