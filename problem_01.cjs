const fs = require("fs").promises;
const path = require("path");

// const json_file = path.join(__dirname, "json-files");

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


function create_directory(path) {
    return fs.mkdir(path, { recursive: true });
}

async function json_file_generator(json_file, count) {
    const paths = [];
    const files = [];

    for (let index = 1; index <= count; index++) {
        const filesPath = path.join(json_file, `json_file_${index}.json`);
        const p = fs.writeFile(filesPath, JSON.stringify({ username: "shubham" }));

        paths.push(filesPath);
        files.push(p);

    }
    try {
        await Promise.all(files);
        console.log("success..!");
        return paths;
    } catch (err) {
        console.log(err);
    }

}

function delete_json_files(files) {
    const deleteFiles = files.map((link) =>{fs.unlink(link)})
    Promise.all(deleteFiles)
    .then(() =>{
        console.log("All files deleted...");
        
    })
    .catch((err) =>{
        console.log("Error while deleting the files: ", err);
        
    });
}

module.exports = { create_and_delete_files };

// create_and_delete_files(json_file, 5);