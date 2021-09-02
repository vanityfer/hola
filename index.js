const http = require("http");
const path = require("path");
const fs = require("fs");



const express = require("express");

const app = express();
const httpServer = http.createServer(app);

app.listen(process.env.PORT || 3000);
// const PORT = process.env.PORT || 3000;

// httpServer.listen(PORT, () => {
//  console.log(`Server is listening on port ${PORT}`);
// });

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", express.static(path.join(__dirname, "./public")));

const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "/"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.use(express.static(__dirname + '/public'));
app.post(
  "/",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
        app.get("/", express.static(path.join(__dirname, "./public")));
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          app.get("/", express.static(path.join(__dirname, "./public")));
      });
    }
  }
);

app.get("/image.png", (req, res) => {
    res.sendFile(path.join(__dirname, "uploads/image.png"));
  });
