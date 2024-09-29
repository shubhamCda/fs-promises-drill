const fs = require("fs").promises;

// drill using promises from fs library.


// Convert the content to uppercase & write to a new file.
function convert_file_uppercase(data, dirPath) {

    const uppercase_content = data.toUpperCase();

    return file_writer(dirPath, uppercase_content);
}

// function to convert content of new file to lower case. Then split the contents into sentences.Then write it to a new file.
function convert_file_lowercase(data, dirPath) {
    const lowercase_content = data.toLowerCase();

    const sentences = lowercase_content.match(/[^.!?]+[.!?]+/g) || lowercase_content.split("\n");

    return file_writer(dirPath, sentences.join(" "));
}


// sort the content, write it out to a new file.
function sorting_file(data, dirPath) {
    const sorted_content = data.split(" ").sort((a, b) => a.localeCompare(b)).join("\n");
    return file_writer(dirPath, sorted_content);
}

// delete all the new files that are mentioned in that list simultaneously.
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

// Store the name of the new file in filenames.txt
function store_filenames(dirPath, fileName) {
    return fs.appendFile(dirPath, fileName + '\n');
}


// function to read the given file 
function file_reader(dirPath) {
    return fs.readFile(dirPath, "utf-8");

}

function file_writer(dirPath, data) {
    return fs.writeFile(dirPath, data);

}


module.exports = { file_reader, store_filenames, delete_files, sorting_file, convert_file_lowercase, convert_file_uppercase };