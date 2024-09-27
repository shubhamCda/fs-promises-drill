const fs = require("fs").promises;
const path = require("path");


const input_file_path = path.join(__dirname, "lipsum.txt");
const uppercase_file_path = path.join(__dirname, "uppercase.txt");
const lowercase_file_path = path.join(__dirname, "lowercase.txt");
const sorted_file_path = path.join(__dirname, "sorted.txt");
const filenames_path = path.join(__dirname, "filenames.txt");


function problem_02_process() {
    file_reader(input_file_path)
    .then((data) =>{
        return convert_file_uppercase(data, uppercase_file_path);
    })
    .then(() =>{
        console.log("uppercase.txt content updataed..!");
        return store_filenames(filenames_path, uppercase_file_path);
        
    }).then(() =>{
        console.log("filenames.txt updated..!");
        return file_reader(uppercase_file_path);
        
    })
    .then((data) =>{
        return convert_file_lowercase(data, lowercase_file_path);
    })
    .then(() =>{
        console.log("lowercase.txt updated..!");
        return store_filenames(filenames_path, lowercase_file_path);
        
    })
    .then(() =>{
        console.log("filenames.txt updated..!");
        return file_reader(lowercase_file_path);
        
    })
    .then((data) =>{
        return sorting_file(data, sorted_file_path);
    })
    .then(() =>{
        console.log("sorted.txt updated successfully..!");
        return store_filenames(filenames_path, sorted_file_path);
        
    })
    .then(() =>{
        return file_reader(filenames_path);
    })
    .catch((err) => console.log(err)
    );
}

function convert_file_uppercase(data, path) {
    
    const uppercase_content = data.toUpperCase();
    
    return file_writer(path, uppercase_content);
}

function convert_file_lowercase(data, path)  {
    const lowercase_content = data.toLowerCase();

    return file_writer(path, lowercase_content);
}

function sorting_file(data, path){
    const sorted_content = data.split(" ").sort((a, b) => a.localeCompare(b)).join("\n");
    return file_writer(path, sorted_content);
}

function store_filenames(path, fileName) {
    return fs.appendFile(path, fileName + '\n');
}

function file_reader(path) {
    return fs.readFile(path, "utf-8");
    
}

function file_writer(path, data) {
    return fs.writeFile(path, data);
    
}














problem_02_process();