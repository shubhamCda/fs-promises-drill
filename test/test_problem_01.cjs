const path = require("path");

const { create_and_delete_files } = require("../problem_01.cjs")

const json_file = path.join(__dirname, "../json-files");

function main() {
    create_and_delete_files(json_file, 5);
}

main();