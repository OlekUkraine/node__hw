// const os = require('os');

// console.log(os.arch());
// console.log(os.cpus());
// console.log(os.version());
/////////////////////////////////////////////////////

// const { exec } = require('child_process');

///////////////////////////////////////////////////////


const path = require('path');
const fs = require('fs');

const text1 = 'function sayHallo() {\n  console.log(\'Hallo friends\');\n}\n \nmodule.exports = {\n    sayHallo \n};';
const text2 = '\nconst { sayHallo } = require(\'../folder_1/main\'); \n ';
const text3 = '\nsayHallo();';
const text4 = 'TITLE';
const text5 = '\ntext__text';




fs.mkdir(path.join(__dirname, 'folder_1'), (err)=>{
    if(err) throw new Error(err.message);
});

fs.mkdir(path.join(__dirname, 'folder_2'), (err)=>{
    if(err) throw new Error(err.message);
});




fs.writeFile(path.join(__dirname, 'folder_1', 'main.js'), text1, (err)=>{
    if(err) throw new Error(err.message);
});

fs.writeFile(path.join(__dirname, 'folder_2', 'main.js'), text2, (err)=>{
    if(err) throw new Error(err.message);
});

fs.writeFile(path.join(__dirname, 'folder_2', 'text.txt'), text4, (err)=>{
    if(err) throw new Error(err.message);
});



// fs.appendFile(path.join(__dirname, 'folder_2', 'main.js'), text3, (err)=>{
//     if(err) throw new Error(err.message);
// });
//
// fs.appendFile(path.join(__dirname, 'folder_2', 'text.txt'), text5, (err)=>{
//     if(err) throw new Error(err.message);
// });





// fs.readFile(path.join(__dirname, 'folder_2', 'text.txt'), {encoding: 'utf-8'}, (err, data)=>{
//     if(err) throw new Error(err.message);
//     console.log(data);
// });




// fs.truncate(path.join(__dirname), (err)=>{               // delete data
//     if(err) throw new Error(err.message);
// })
//
// fs.unlink(path.join(__dirname), (err)=>{                 // delete file
//     if(err) throw new Error(err.message);
// })




// fs.readdir(path.join(__dirname), {withFileTypes: true}, (err, files)=>{
//     if(err) throw new Error(err.message);
//     files.forEach(file=>{
//         console.log(file.isFile());
//     });
// });

 