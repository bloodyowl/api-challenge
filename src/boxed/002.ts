import { Future, Result } from "@swan-io/boxed";
import assert from "assert";
import { getUserById, User } from "./utils";

// Return a `Future<Result<Array<User>, "UserNotFound">>`
// If any user failed to be fetched, the returned value should be the error

// You can access the docs: https://swan-io.github.io/boxed/

export const getUsers = (
  userIds: Array<string>
): Future<Result<Array<User>, "UserNotFound">> => {
  const users = userIds.map(getUserById);
  return Future.all(users).map(Result.all);
};

const test = async () => {
  assert.deepEqual(
    await getUsers(["1", "2", "3"]).mapOk((users) =>
      users.map((user) => user.id)
    ),
    Result.Ok(["1", "2", "3"])
  );
  assert.deepEqual(
    await getUsers(["1", "2", "3", "4"]).mapOk((users) =>
      users.map((user) => user.id)
    ),
    Result.Error("UserNotFound")
  );

  console.log("All passed");
};

test();
