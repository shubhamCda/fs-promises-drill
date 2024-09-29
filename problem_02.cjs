const fs = require("fs").promises;
const path = require("path");



function convert_file_uppercase(data, dirPath) {

    const uppercase_content = data.toUpperCase();

    return file_writer(dirPath, uppercase_content);
}

function convert_file_lowercase(data, dirPath) {
    const lowercase_content = data.toLowerCase();

    return file_writer(dirPath, lowercase_content);
}

function sorting_file(data, dirPath) {
    const sorted_content = data.split(" ").sort((a, b) => a.localeCompare(b)).join("\n");
    return file_writer(dirPath, sorted_content);
}


function delete_files(data) {
    const seperate_file = data.split("\n");
    console.log(seperate_file);

    const removed_files = [];
    seperate_file.forEach(link => {
        if (link !== '') {
            removed_files.push(fs.unlink(link));
        }
    });
    return Promise.all(removed_files)
}


function store_filenames(dirPath, fileName) {
    return fs.appendFile(dirPath, fileName + '\n');
}

function file_reader(dirPath) {
    return fs.readFile(dirPath, "utf-8");

}

function file_writer(dirPath, data) {
    return fs.writeFile(dirPath, data);

}


module.exports = { file_reader, store_filenames, delete_files, sorting_file, convert_file_lowercase, convert_file_uppercase };