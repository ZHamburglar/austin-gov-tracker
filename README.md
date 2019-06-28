### Making A Commit

This project base uses Husky configurations. Which means your commits must follow a certain format or else fail the pre-commit ESLint.

Found in the package.json:

```json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "lint-staged"
    }
  }
```

Your commit message must follow the "type(context): message" format/

In place of the "type" you may use one of the following: **build**, **chore**, **ci**, **docs**, **feat**, **fix**, **perf**, **refactor**, **revert**, **style**, **test**.

In place of "context" you can use the commit name or what is changed in the commit, with lower case letters and the words separated by "-".

In place of the "message" you can leave the messages of what you actually changed in the commit.

**Note: You can not use capital letters when writing your message or else it will fail the [subject-case] tests**

Putting it all together:

`git commit -m "feat(update-heading): changed heading organization"`

`git commit -m "refactor(ref-headers): Refactor all heading components"`
