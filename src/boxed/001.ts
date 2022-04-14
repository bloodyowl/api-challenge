import { Future, Result } from "@swan-io/boxed";
import assert from "assert";
import { getUserById } from "./utils";

// Return a `Future<Result<string, error>>`, where `string` is the user's name
// If the user doesn't contain a name, it should be an `"NoName"` error
// If the `getUserById` outputs an error, it should be the returned error

// You can access the docs: https://swan-io.github.io/boxed/

type error = "NoName" | "UserNotFound";

export const getUserName = (userId: string): Future<Result<string, error>> => {
  // Your code here
};

const test = async () => {
  assert.deepEqual(await getUserName("1"), Result.Error("NoName"));
  assert.deepEqual(await getUserName("2"), Result.Error("NoName"));
  assert.deepEqual(await getUserName("3"), Result.Ok("Mathieu Breton"));
  assert.deepEqual(await getUserName("4"), Result.Error("UserNotFound"));
  console.log("All passed");
};

test();
