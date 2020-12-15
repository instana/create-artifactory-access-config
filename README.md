# Artifactory Access Configuration Utility

This utility automates a correct and secure Yarn package manager configuration for third-party registries –
specifically Artifactory. It does this through a set of questions that eventually result in an updated
`~/.yarnrc.yml` file.

## Important Compatibility Note

This CLI creates Yarn configuration files for Yarn 2/Berry (`~/.yarnrc.yml`). Yarn 1 users/workspaces will find
that any configuration made via this CLI has no effect. This is the case because Yarn 1 uses a different global
configuration file and file format (`~/.yarnrc`).

## Usage

```sh
yarn create artifactory-access-config
npx create-artifactory-access-config
```

**Pro Tip:** You can configure default values for the registry and repository key questions via the `REGISTRY` and
`REPOSITORY_KEY` environment variables. This comes in handy within onboarding guides!

```sh
REGISTRY="https://artifactory.example.com" REGISTRY_KE="npm-example" yarn create artifactory-access-config
```

## Security

This CLI tries to apply common best practices for a secure authentication to a third-party registry. Please note
that usage of this CLI results in a change to a global configuration file residing within your `$HOME` directory.
Be especially careful in case you are sharing your dotfiles!
