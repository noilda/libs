const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');

/**
 * 1. List available templates
 * 2. Prompt user to select template by index
 * 3. Read template
 * 4. List all index.html files
 * 5. Prompt user to select the desired index.html that will be changed
 * 6. Read index.html
 * 7.Insert template before </body>
 */
(async () => {
  //>>>> List available templates

  const tempDirPath = path.join(__dirname, '..', 'templates');
  const tempNames = await filesInDir(tempDirPath);

  cBoldYellowBright('\n Available templates:\n\n');

  tempNames.forEach((tempName, index) => {
    cGreen(`   ${index}. ${tempName}\n`);
  });
  cBoldYellowBright('\n');

  //List available templates <<<<

  //>>>>  Prompt user to select template by index

  const requiredTempIndex = await terminalInput(
    'Select desired template (default 0):\n'
  );

  if (isNaN(requiredTempIndex) || tempNames.length < +requiredTempIndex + 1) {
    return cBoldRed('Selected option not valid!\n');
  }

  // Prompt user to select template by index<<<<

  //>>>> Read template

  const requiredTempPath = path.join(
    tempDirPath,
    tempNames[requiredTempIndex],
    `${tempNames[requiredTempIndex]}.component.html`
  );

  const requiredTempContent = await readFile(requiredTempPath);

  //Read template <<<<<

  //>>>> List all index.html files

  const indexFiles = recursevlyFileSearch(process.cwd(), [], 'index.html');

  cBoldYellowBright('\nAvailable index.html files:\n\n');

  indexFiles.forEach((indexFile, index) => {
    cGreen(`   ${index}. ${indexFile}\n`);
  });
  cBoldYellowBright('\n');

  //List all index.html files <<<<<

  //>>>> Prompt user to select the desired index.html that will be changed

  const fileToAppendIndex = await terminalInput(
    'Select desired index.html where loader template will be appended:\n'
  );

  if (isNaN(fileToAppendIndex) || indexFiles.length < +fileToAppendIndex + 1) {
    return cBoldRed('Selected option not valid!\n');
  }
  //Prompt user to select the desired index.html that will be changed<<<<

  //>>>> Read index.html

  const requiredIndexFileContent = await readFile(
    indexFiles[fileToAppendIndex]
  );

  // Read index.html <<<<<

  //>>>>Try to replace previous loaders

  /**
   * this regex will match any patterns that start with `<!-- \s*START__HERE Noilda loader`  and ends with `END__HERE Noilda loader \s*-->`
   */
  const cleanedIndexContent = requiredIndexFileContent.replace(
    /<!-- \s*START__HERE Noilda loader[\s\S]*END__HERE Noilda loader \s*-->/gi,
    ''
  );

  //Try to replace previous loaders <<<<

  //>>>> Insert template before </body>

  /**
   * Pay attention to the comments (`<!--  START__HERE Noilda loader  --> &&  <!--  END__HERE Noilda loader  -->)
   * Those comments are being used by regex to replace previous loaders
   */
  const indexWithTemp = cleanedIndexContent.replace(
    '</body>',
    `<!--  START__HERE Noilda loader  -->
    ${requiredTempContent}
    <!--  END__HERE Noilda loader  -->
    </body>`
  );

  fs.writeFile(
    indexFiles[fileToAppendIndex],
    indexWithTemp,
    'utf8',
    function (err) {
      if (err) return cBoldRed(err);
    }
  );
  cBoldGreen('\n Loader appended successfully!\n\n');
  // Insert template before </body> <<<<<
})();

function recursevlyFileSearch(dirPath, filteredFiles, fileName) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (
      fs.statSync(dirPath + '/' + file).isDirectory() &&
      ['node_modules', 'dist'].indexOf(file) < 0 &&
      file.charAt(0) !== '.'
    ) {
      filteredFiles = recursevlyFileSearch(
        dirPath + '/' + file,
        filteredFiles,
        fileName
      );
    } else {
      if (fileName === file) {
        filteredFiles.push(path.join(dirPath, '/', file));
      }
    }
  });

  return filteredFiles;
}

function filesInDir(path) {
  return new Promise((resolve, reject) =>
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    })
  );
}

function readFile(path) {
  return new Promise((resolve, reject) =>
    fs.readFile(path, (err, buffer) => {
      if (err) {
        reject(err);
      }
      resolve(buffer.toString());
    })
  );
}

function terminalInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(chalk.bold.yellowBright(`${question}`), (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

function cBoldYellowBright(question) {
  process.stdout.write(chalk.bold.yellowBright(question));
}

function cGreen(question) {
  process.stdout.write(chalk.greenBright(question));
}

function cBoldGreen(question) {
  process.stdout.write(chalk.bold.greenBright(question));
}

function cBoldRed(question) {
  process.stdout.write(chalk.bold.red(question));
}
