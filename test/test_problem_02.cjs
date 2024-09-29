const fs = require("fs").promises;
const path = require("path");

const { file_reader, store_filenames, delete_files, sorting_file, convert_file_lowercase, convert_file_uppercase } = require("../problem_02.cjs");



const input_file_path = path.join(__dirname, "../lipsum.txt");
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


//function call 
problem_02_process();