import assert from "assert";
import { either, readonlyArray, taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { map, TaskEither } from "fp-ts/lib/TaskEither";
import { getUserById, User } from "./utils";

// Return a `TaskEither<"UserNotFound", Array<User>>`
// If any user failed to be fetched, the returned value should be the error

// You can access the docs: https://gcanti.github.io/fp-ts/

export const getUsers = (
  userIds: Array<string>
): TaskEither<"UserNotFound", Array<User>> => {
  const users = userIds.map(getUserById);
  return pipe(
    users,
    taskEither.sequenceArray,
    taskEither.map(readonlyArray.toArray)
  );
};

const test = async () => {
  assert.deepEqual(
    await map((users: Array<User>) => users.map((user) => user.id))(
      getUsers(["1", "2", "3"])
    )(),
    either.right(["1", "2", "3"])
  );
  assert.deepEqual(
    await map((users: Array<User>) => users.map((user) => user.id))(
      getUsers(["1", "2", "3", "4"])
    )(),
    either.left("UserNotFound")
  );

  console.log("All passed");
};

test();
