const path = require("path");

const { create_directory, json_file_generator,  delete_json_files } = require("../problem_01.cjs")

const json_file = path.join(__dirname, "../json-files");

function create_and_delete_files(json_file, count) {
    create_directory(json_file)
        .then(() => {
            console.log("Directory created...!");
            return json_file_generator(json_file, count);

        })
        .then((fileUrls) => {
            console.log("fileUrls fetch successfully...");
            delete_json_files(fileUrls);

        })
        .catch((err) => {
            console.error(err);

        });
}


create_and_delete_files(json_file, 5);