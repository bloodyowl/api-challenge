import assert from "assert";
import { either, option, taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { getUserById } from "./utils";

// Return a `TaskEither<error, string>`, where `string` is the user's name
// If the user doesn't contain a name, it should be an `"NoName"` left
// If the `getUserById` outputs an error, it should be the returned error

// You can access the docs: https://gcanti.github.io/fp-ts/

type error = "NoName" | "UserNotFound";

export const getUserName = (userId: string): TaskEither<error, string> => {
  // Your code here
};

const test = async () => {
  assert.deepEqual(await getUserName("1")(), either.left("NoName"));
  assert.deepEqual(await getUserName("2")(), either.left("NoName"));
  assert.deepEqual(await getUserName("3")(), either.right("Mathieu Breton"));
  assert.deepEqual(await getUserName("4")(), either.left("UserNotFound"));
  console.log("All passed");
};

test();
