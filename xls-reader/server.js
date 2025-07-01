const express = require("express");
const xlsx = require("xlsx");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;


// Allow frontend to access this backend
app.use(cors());

// Load Excel File 
const workbook = xlsx.readFile(path.join(__dirname, "data.xlsx"));

// Get First Sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = xlsx.utils.sheet_to_json(worksheet);

// Route to send the Data
app.get("/data", (req, res) => {
    res.json(data);
});

app.get("/", (req, res) => {
  res.redirect("/data");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});