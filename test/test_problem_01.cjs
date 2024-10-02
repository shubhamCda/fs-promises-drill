const path = require("path");

const { create_and_delete_files } = require("../problem_01.cjs")

const json_file_directory = path.join(__dirname, "../json-files");


function main() {
    
    create_and_delete_files(json_file_directory, 5);
}

// calling function
main();