const csv = require("csv-parser");
const xlsx = require("xlsx");

module.exports = async (file) => {
    if (file.mimetype === "text/csv") {
        const results = [];
        const stream = require("stream");
        const readable = new stream.Readable();
        readable._read = () => { };
        readable.push(file.buffer);
        readable.push(null);

        return new Promise((resolve, reject) => {
            readable
                .pipe(csv())
                .on("data", (data) => results.push(data))
                .on("end", () => resolve(results))
                .on("error", reject);
        });
    } else {
        const workbook = xlsx.read(file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return xlsx.utils.sheet_to_json(sheet);
    }
};
