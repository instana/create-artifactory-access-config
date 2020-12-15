exports.abortScriptExecution = ({exitCode=0, withoutLogging=true}) => {
  const error = new Error('Deliberate script abortion');
  error.withoutLogging = withoutLogging;
  error.exitCode = exitCode;
  throw error;
}

exports.isErrorLoggingSurpressed = e => e.withoutLogging;