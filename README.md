# Artifactory Access Configuration Utility

This utility automates a correct and secure NPM/Yarn package manager configuration for third-party registries –
specifically Artifactory. It does this through a set of questions that eventually result in updated
`~/.npmrc` and `~/.yarnrc.yml` files.

## Important Compatibility Note

This CLI creates configuration files for NPM (`~/.npmrc`) and Yarn 2/Berry (`~/.yarnrc.yml`).

## Usage

```sh
yarn create artifactory-access-config
npx create-artifactory-access-config
```

**Pro Tip:** You can configure default values for the registry and repository key questions via the `REGISTRY` and
`REPOSITORY_KEY` environment variables. This comes in handy within onboarding guides!

```sh
REGISTRY="https://artifactory.example.com" REPOSITORY_KEY="npm-virtual" yarn create artifactory-access-config
```

## Security

This CLI tries to apply common best practices for a secure authentication to a third-party registry. Please note
that usage of this CLI results in a change to global configuration files residing within your `$HOME` directory.
Be especially careful in case you are sharing your dotfiles!
