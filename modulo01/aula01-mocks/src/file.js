const {readFile} = require("fs/promises")
const { error } = require("./constants")
const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"],
}
class File {
static async csvToJSON(filePath) {
const content = await readFile(filePath, "utf-8")
const validation = this.isValid(content)

if(!validation.valid) throw new Error(validation.error)
}


static isValid(csvString, options = DEFAULT_OPTION) {
    //para ver o conteúdo do arquivo
const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)
const isHeaderValid = headers === options.fields.join(',')

if(!isHeaderValid){
    return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
    }
}
if(!fileWithoutHeader.length && fileWithoutHeader.length > options.maxLines) {
    return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
    }
}
}
}

module.exports = File