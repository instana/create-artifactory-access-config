# Changelog

## 1.3.0
 - Option `WRITE_TO_CWD=true` added through which the identified configuration can be written to
   configuration files in the current working directory. This can come in handy for CI cases.

## 1.2.0
 - Support a non-interactive mode via a `NON_INTERACTIVE=true` env var.
 - Accept username / password values via environment variables `USERNAME` and `PASSWORD`.
 - Hide password input.

## 1.1.0
 - Also configure global `.npmrc` files.
 - Provide additional guidance via the CLI output.
 - Fix an error that occurs for Yarn 2 when the global config file is empty.

## 1.0.0

 - Initial Release