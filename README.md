### Making Commit

This project base uses Husky configurations. Which means your commits must follow a certain format or else fail the pre-commit ESLint.

Your commit message must follow the "type(context): message" format/

In place of the "type" you may use one of the following: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test.

In place of "context" you can use the commit name or what is changed in the commit.

In place of the "message" you can leave the messages of what you actually changed in the commit.

Putting it all together:

`git commit -m "feat(update-heading): changed heading organization"`

`git commit -m "refactor(ref-headers): Refactor all heading components"`