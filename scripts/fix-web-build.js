/**
 * THIS IS EXTREMELY HACKY
 * PLEASE LOOK TO EXPO REPO FOR BETTER SOLUTION
 * https://github.com/expo/expo/issues/25965#issuecomment-1873501965
 */

const fs = require('fs');

const fixVarConflict = () => {
  const pathToProblematicFile =
    'node_modules/@apollo/client/utilities/globals/index.js';
  // check if file exists
  const fileExists = fs.existsSync(pathToProblematicFile);
  if (!fileExists) {
    console.log('module not found');
    return;
  }
  const problematicFile = fs.readFileSync(pathToProblematicFile, 'utf8');
  const fixedFile = problematicFile.replace(
    'export { DEV as __DEV__ };',
    '// export { DEV as __DEV__ };',
  );
  fs.writeFileSync(pathToProblematicFile, fixedFile);
};

fixVarConflict()
