let express = require("express");
let path = require("path");

let app = express();

// handles requests for static files
app.use(express.static(path.join(__dirname, "..", "views")));
app.use("/public", express.static(path.join(__dirname, "..", "dist/public")));
app.use("/node_modules", express.static(path.join(__dirname, "..", "node_modules")));
app.use("/audio", express.static(path.join(__dirname, "..", "static/audio")));

let port = process.env.INTERNAL_PORT || 8080;
app.listen(port, function () {
    console.info(`Web app listening on port ${port}`);
});
