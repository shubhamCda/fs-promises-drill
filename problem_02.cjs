const fs = require("fs").promises;
const path = require("path");

// drill using promises from fs library.

const input_file_path = path.join(__dirname, "lipsum.txt");
const uppercase_file_path = path.join(__dirname, "uppercase.txt");
const lowercase_file_path = path.join(__dirname, "lowercase.txt");
const sorted_file_path = path.join(__dirname, "sorted.txt");
const filenames_path = path.join(__dirname, "filenames.txt");


function problem_02_process() {
    file_reader(input_file_path)
        .then((data) => {
            return convert_file_uppercase(data, uppercase_file_path);
        })
        .then(() => {
            console.log("uppercase.txt content updataed..!");
            return store_filenames(filenames_path, uppercase_file_path);

        }).then(() => {
            console.log("filenames.txt updated..!");
            return file_reader(uppercase_file_path);

        })
        .then((data) => {
            return convert_file_lowercase(data, lowercase_file_path);
        })
        .then(() => {
            console.log("lowercase.txt updated..!");
            return store_filenames(filenames_path, lowercase_file_path);

        })
        .then(() => {
            console.log("filenames.txt updated..!");
            return file_reader(lowercase_file_path);

        })
        .then((data) => {
            return sorting_file(data, sorted_file_path);
        })
        .then(() => {
            console.log("sorted.txt updated successfully..!");
            return store_filenames(filenames_path, sorted_file_path);

        })
        .then(() => {
            return file_reader(filenames_path);
        })
        .then((link) => {
            return delete_files(link);
        })
        .then(() => {
            console.log("Files deleted successfull..!");

        })
        .catch((err) => console.log(err)
        );
}

// Convert the content to uppercase & write to a new file.
function convert_file_uppercase(data, filePath) {

    const uppercase_content = data.toUpperCase();

    return file_writer(filePath, uppercase_content);
}

// function to convert content of new file to lower case. Then split the contents into sentences.Then write it to a new file.
function convert_file_lowercase(data, filePath) {
    const lowercase_content = data.toLowerCase();

    const sentences = lowercase_content.match(/[^.!?]+[.!?]+/g) || lowercase_content.split("\n");

    return file_writer(filePath, sentences.join(" "));
}


// sort the content, write it out to a new file.
function sorting_file(data, filePath) {
    const sorted_content = data.split(" ").sort((a, b) => a.localeCompare(b)).join("\n");
    return file_writer(filePath, sorted_content);
}

// delete all the new files that are mentioned in that list simultaneously.
function delete_files(data) {
    const seperate_file = data.split("\n");
    // console.log(seperate_file);

    const removed_files = [];
    seperate_file.forEach(link => {
        if (link !== '') {
            removed_files.push(fs.unlink(link));
        }
    });
    return Promise.all(removed_files)
}

// Store the name of the new file in filenames.txt
function store_filenames(filePath, fileName) {
    return fs.appendFile(filePath, fileName + '\n');
}


// function to read the given file 
function file_reader(filePath) {
    return fs.readFile(filePath, "utf-8");

}

function file_writer(filePath, data) {
    return fs.writeFile(filePath, data);

}


module.exports = { problem_02_process };

