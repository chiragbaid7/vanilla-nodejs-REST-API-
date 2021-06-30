const {
  findall,
  findbyID,
  create,
  update,
  _delete,
} = require("../models/productm");

async function getproducts(req, res) {
  try {
    const products = await findall();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
    res.end(err);
  }
}

async function getproductID(req, res, id) {
  try {
    const product = await findbyID(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (err) {
    res.end(JSON.stringify({ message: err.message }));
  }
}

async function save(req, res) {
  try {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", async () => {
      const a = JSON.parse(data);
      const product = await create(a);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(product);
    });
  } catch (err) {
    res.end({ message: err.message });
  }
}

async function updateProduct(req, res, id) {
  try {
    //req is an readeable stream and every stream in nodejs is an eventemitter instance
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const data = JSON.parse(body);
      const product = await update(data, id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(product);
    });
  } catch (err) {
    res.end({ message: err.message });
  }
}
async function deleteProduct(req, res, id) {
  try {
    const product = await _delete(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(product);
  } catch (err) {
    res.end({ message: err.message });
  }
}
module.exports = {
  getproducts,
  getproductID,
  save,
  updateProduct,
  deleteProduct,
};
