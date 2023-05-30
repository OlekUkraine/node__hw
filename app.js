// const os = require('os');

// console.log(os.arch());
// console.log(os.cpus());
// console.log(os.version());
/////////////////////////////////////////////////////

// const { exec } = require('child_process');

///////////////////////////////////////////////////////


const path = require('node:path');
const fs = require('node:fs/promises');
const baseFolderPath = path.join(__dirname, 'baseFolder');


const createFolderAndFile = async () => {
    await fs.mkdir(baseFolderPath);

    const allFolders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
    const allFiles = {
        text1: 'function sayHallo() {\n  console.log(\'Hallo friends\');\n}\n \nmodule.exports = {\n    sayHallo \n};',
        text2: '\nconst { sayHallo } = require(\'../folder1/text1\'); \n \nsayHallo();',
        text3: '// _____ Ok _____',
        text4: '// --- TITLE ---',
        text5: '// --- text__text ---'
    };



    for (const folder of allFolders) {
        await fs.mkdir(path.join(baseFolderPath, folder));
    }



    const folders = await fs.readdir(baseFolderPath, {withFileTypes: true});

    await folders.forEach((folder, index) => {
        fs.writeFile(path.join(baseFolderPath, folder.name, `text${index + 1}.js`), allFiles[`text${index + 1}`]);
    });


    await fs.writeFile(path.join(baseFolderPath, 'text.txt'), 'Family Simpsons');



    await fs.appendFile(path.join(baseFolderPath, 'folder3', 'text3.js'), '\ntext');
    await fs.appendFile(path.join(baseFolderPath, 'folder4', 'text4.js'), '\ntext');
    await fs.appendFile(path.join(baseFolderPath, 'folder5', 'text5.js'), allFiles.text2);



    const readFile4 = await fs.readFile(path.join(baseFolderPath, 'folder4', 'text4.js'), {encoding: 'utf-8'});
    console.log(readFile4);

    const readFile5 = await fs.readFile(path.join(baseFolderPath, 'folder5', 'text5.js'), {encoding: 'utf-8'});
    console.log(readFile5);



    await fs.truncate(path.join(baseFolderPath, 'folder4', 'text4.js'));
    await fs.unlink(path.join(baseFolderPath, 'folder5', 'text5.js'));



    const files = await fs.readdir(path.join(baseFolderPath), {withFileTypes: true});

    console.log(files);
    files.forEach(file=>{
        console.log(file.isFile());
    });
}

createFolderAndFile();








 