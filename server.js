const http = require("http");
const {
  getproducts,
  getproductID,
  save,
  updateProduct,
  deleteProduct,
} = require("./controllers/productc");

const app = http.createServer((req, res) => {
  if (req.url === "/api/product" && req.method === "GET") {
    getproducts(req, res);
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getproductID(req, res, id);
  } else if (req.url === "/api/product" && req.method === "POST") {
    save(req, res);
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    res.write(JSON.stringify({ message: "Page not found" }));
    res.end();
  }
});
app.listen(8080);
