# Contributors guideline

First of all, thank you for taking your time to contribute!

We are a small team and there are always more issue than developers hands.

The following is a set of guidelines for contributing to frontend candidates
part of Devv.Jobs project.

## Table of content

- [I'm here to just ask a question](#im-here-to-just-ask-a-question)
- [What should I know to start contributing](#what-should-i-know-to-start-contributing)
- [How can I contribute?](#how-can-i-contribute)
  - [Reporting bugs](#reporting-bugs)
  - [Suggesting enhancements](#suggesting-enhancements)
  - [Implementing existing issues](#implementing-existing-issues)
  - [First issue contribution](#first-issue-contribution)
  - [Pull requests](#pull-requests)
- [Styleguides](#styleguides)
  - [Git commit messages](#git-commit-messages)
  - [Code styleguide](#code-styleguide)
- [Additional notes](#additional-notes)
  - [Labels for issues and pull requests](#labels-for-issues-and-pull-requests)

## I'm here to just ask a question

If you have a question - please **do not create an issue**, instead write us
to support@devv.jobs or in intercom on our website
[Devv.Jobs](https://devv.jobs)

## What should I know to start contributing

It depends on what part do you want to contribute to.

### Documentation and issues.

Most of the documentation is written in
[Github-flavoured Markdown](https://guides.github.com/features/mastering-markdown/).

Please take a look at sections in [How can I contribute?](#how-can-i-contribute)
for more details on how to report bugs, suggest improvements and such.

### Just code in general

To start contributing to the code, you only need to know some
[Vue.JS](https://vuejs.org/) and
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

### Code that does API requests.

When we need to make requests to APIs we use

- [Apollo Client](https://www.apollographql.com/docs/react/) when it comes to
GraphQL requests.

- [Axios](https://github.com/axios/axios) when it comes to non-GraphQL
requests.

Since we use GraphQL for most of the API, it has documentation built-in via
GraphQL inspection. You can use tools like
[Altair](https://altair.sirmuel.design/) to inspect API and see the
documentation, given that you have valid token.

### Build pipeline

To build app into resulting bundle we use [Webpack](https://webpack.js.org/).

## How can I contribute?

### Reporting bugs

**NOTE**: Please report any security-related issues directly to us at
support@devv.jobs instead of opening an issue in the repo.

If you found a bug and want to report it, there are few options:

a) you can write us on support@devv.jobs or in intercom on our
website [Devv.Jobs](https://devv.jobs)

b) you can report a bug by creating issue on GitHub.

**NOTE**: if you are not sure that the bug you encountered is caused by the
behaviour of this part of the project (frontend candidates interface),
please contact us.

Before creating an issue, check open issues with label `bug` on them.

If you found issue, that describes bug you stumbled upon - comment in the
issue with all the information you would like to add.

If there was no issue present, create a new issue:

- in the name of the issue describe in short the problem.
Example: "Dropdown menu doesn't work in Safari on mobile"
- in the description specify
  - device, OS and browser with versions, specify if you used
  production version or development version of the project
  - steps to recreate the problem: when listing steps, don't just say what you
  did, but explain how you did it. For example, if you chose the skill
  from the list, have you done it with mouse or with keyboard?
  - describe the behavior you observed after following the steps and
  point out what exactly is the problem with that behavior
  - explain which behavior you expected to see instead and why
  - screenshots, videos or other materials, which demonstrate the problem
- add label `bug`

**NOTE**: if you found **closed** issue with the bug you encountered, read
the reason why it was closed. If it was solved in the past and re-appeared now,
open a new issue and include a link to the original issue in the body of your
new one. If it was closed for the other reasons - please contact us if you
still wish to report the bug.

### Suggesting enhancements

This section guides you through submitting an enhancement suggestion,
including completely new features and minor improvements to existing
functionality. Following these guidelines helps maintainers and the
community understand your suggestion and find related suggestions.

If you want to suggest and enhancement, there are few options:

a) you can write us on support@devv.jobs or in intercom on our
website [Devv.Jobs](https://devv.jobs)

b) you can suggest enhancement by creating issue on GitHub.

Before creating an issue, check open issues with label `enhancement` on them.

If you found issue, that describes enhanement or similar to what you want to
suggest - comment in the issue with all the information you would like to add.

If there was no issue present, create a new issue:

- in the name of the issue describe in short the enhancement.
Example: "Add keyboard support to chat"
- in the description specify
  - step-by-step description of the suggested enhancement in
  as many details as possible
  - provide specific examples to demonstrate the steps
  - describe current behavior and explain which behavior you
  expected to see instead and why
  - screenshots, videos or other materials, if applicable
  - explain why this enhancement would be useful
- add label `enhancement`

### Implementing existing issues

If this is your first contribution to this project, please also read
[First issue contribution](#first-issue-contribution).

#### When you want to pick up and implement an issue
- check that it's not already picked up by other contributor
- assign issue to yourself
- add label `in-progress` to issue

locally:
- have an up-to-date version of project (`master` branch) - if you need
help with this step, please contact us
- create a new branch with name connected to the issue you will be
implementing (example: `add-keyboard-support-to-chat`)
- checkout to your branch
- when commiting changes, follow [Styleguides](#styleguides)
- after you finished, create [Pull request](#pull-requests)

### First issue contribution

If you want to contribute for the first time, we suggest to
first of all look into the issues with label `first-issue`.

If you encounter any problems during the setup that you cannot resolve
on your own, please contact us.

#### Fork and clone the repo.

If you are new to this,
[this document](https://help.github.com/articles/fork-a-repo/)
from GitHub is really helpful.

We suggest to not skip step 3 of "Keep your fork synced" section, as it helps
if you plan to contribute more than once.

#### Update etc/hosts

Due to the current CORS setup, we ask you to set up entry in hosts file
on your machine (details are below).
Without it, most modern browsers would not let your local version of frontend
app to access our API.

Only staging API has CORS entry that allows local application. Pointing local
version to the production will not/should not work.

Please add this line to your `hosts` file (`/etc/hosts` on Linux):

```
127.0.0.1  sgu5afwec32jfydq.devv.jobs
```

#### Set up the env file

- Copy `.env.example` to `.env`.

- Open `.env` in editor and specify values for variables.

#### Install dependencies

```
yarn install
```

#### Run app

Candidates:
```
yarn candidates
```

App should now be available on http://sgu5afwec32jfydq.devv.jobs:8080

#### You are all set up!

Now you can [help with existing issues](#implementing-existing-issues).

### Pull requests

When you finished implementing issue, you can create pull request.
When creating pull request:
- make sure that name is descriptive and consistent with issue
- reference issue in the description. Example: `#123` or `ref #123`
- make sure commit history is descriptive and follows
[Styleguides](#styleguides)
- after you submit your pull request, verify that all status checks are passing
- wait for review by one of the maintainers

#### What if the status checks are failing?

If a status check is failing, and you believe that the failure is unrelated
to your change, please leave a comment on the pull request explaining
why you believe the failure is unrelated. A maintainer will re-run the
status check for you. If we conclude that the failure was a false positive,
then we will open an issue to track that problem with our status check suite.

#### Unless that is exactly what issue is about, do not

- add new libraries/frameworks/any external sources
- change project config and setup
- heavily refactor code
- leave unhelpful comments (example: "fix this later"), if you need to
leave a comment, formulate it for all other contributors to understand
- implement in the same branch multiple issues
(unless they are heavily connected)

#### If reviewer left change requests or notes

- if one of the maintainers left change request, it means that your pull request
will not be merged until those changes are implemented. If you don't agree with
those changes, you can leave a comment and explain why. Hovewer, it's up to
maintainer to decide if those changes are still required for pull request to
get merged
- if one of the maintainers left notes, it means those are optional suggestions
to improve your pull request. Maintainers will usually wait for you to do
changes or to comment that you won't do them before merging pull request
- if one of the contributors left change request or notes, they will be usually
reviewed and commented on by one of the maintainers. We suggest for you to wait
for maintainer comment before implementing changes suggested by other
contributors

## Styleguides

### Git commit messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less

### Code styleguide

All JavaScript must adhere to
[JavaScript Standard Style](https://standardjs.com/).

**NOTE**: at the moment there may be parts of project that do not follow
this styleguide. If you found one of those parts - create an issue about
refactoring and/or code style improvements.

- Limit lines to 80 characters or less
- Prefix your comments with `TODO` or `NOTE` and add date and your name
in the end. Example:
```
// TODO: add error handling for name field
// --- 1970-01-01 - My Name
```

## Additional notes

### Labels for issues and pull requests

#### Issues

| Label name | Description |
| --- | --- |
| bug | confirmed bugs or reports that are likely to be bugs |
| enhancement | suggestion of improvement or new feature |
| first-issue | good for the first issue, usually small and simple |

#### Pull requests

| Label name | Description |
| --- | --- |
