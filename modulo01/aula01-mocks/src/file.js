const { readFile } = require("fs/promises")
const { error } = require("./constants")
const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}
class File {
    static async csvToJSON(filePath) {
        const content = await readFile(filePath, "utf-8")
        const validation = this.isValid(content)
        if (!validation.valid) throw new Error(validation.error)

        const result = this.parseCSVToJSON(content)

        return result
    }

    static isValid(csvString, options = DEFAULT_OPTION) {

        const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
        const isHeaderValid = header === options.fields.join(",")

        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) {
            return {
                error: error.FILE_LENGHT_ERROR_MESSAGE,
                valid: false
            }
        }
        return { valid: true }
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split(/\r?\n/)
        const firstLine = lines.shift()
        const header = firstLine.split(",")

        const users = lines.map(line => {
            const colums = line.split(",")
            const user = {
            }
            for (const index in colums) {
                user[header[index]] = colums[index].trim()
            }

            return user
        })
        return users
    }
}

module.exports = File