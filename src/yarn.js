const { safeLoad, safeDump } = require("js-yaml");
const fs = require("fs").promises;
const path = require("path");

const { abortScriptExecution } = require("./abort");

const fullyQualifiedPathToGlobalYarnRc = path.join(process.env.HOME, ".yarnrc.yml");

exports.writeToYarnConfig = async ({ resolvedRegistry, authIdent, authToken }) => {
  const config = await loadGlobalRcFile();

  if (!config.npmRegistries) {
    config.npmRegistries = {};
  }

  if (!config.npmRegistries[resolvedRegistry]) {
    config.npmRegistries[resolvedRegistry] = {};
  }

  config.npmRegistries[resolvedRegistry].npmAlwaysAuth = true;
  if (authIdent) {
    config.npmRegistries[resolvedRegistry].npmAuthIdent = authIdent;
  }
  if (authToken) {
    config.npmRegistries[resolvedRegistry].npmAuthToken = authToken;
  }

  await writeGlobalRcFile(config);
};

async function loadGlobalRcFile() {
  let fileContent;

  try {
    fileContent = await fs.readFile(fullyQualifiedPathToGlobalYarnRc, {
      encoding: "utf8",
    });
  } catch (e) {
    if (e.code === "ENOENT") {
      return {};
    } else {
      console.error(
        chalk.red(
          `Failed to read global yarn configuration file at '${fullyQualifiedPathToGlobalYarnRc}'`
        ),
        e
      );
      return abortScriptExecution({
        exitCode: 1,
      });
    }
  }

  try {
    return safeLoad(fileContent);
  } catch (e) {
    console.error(
      chalk.red(
        `Failed to parse global yarn configuration file at '${fullyQualifiedPathToGlobalYarnRc}'`
      ),
      e
    );
    return abortScriptExecution({
      exitCode: 1,
    });
  }
}

async function writeGlobalRcFile(config) {
  await fs.writeFile(fullyQualifiedPathToGlobalYarnRc, safeDump(config));
}