const fs = require("fs");
const path = require("path");
const products = require("../data/products.json");

function findall() {
  return new Promise((resolve, reject) => {
    try {
      resolve(products);
    } catch (err) {
      reject(err);
    }
  });
}

function findbyID(id) {
  return new Promise((resolve, reject) => {
    try {
      const product = products.find((pro) => pro.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    } catch (err) {
      reject(err);
    }
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const new_product = { ...product };
    products.push(new_product);
    fs.writeFileSync("./data/products.json", JSON.stringify(products)); //save back to json
    resolve(JSON.stringify(new_product));
  });
}

function update(data, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const index = products.findIndex((pro) => pro.id === id);
      if (index) {
        console.log(id);
        const product = await findbyID(id);
        const updatedproduct = {
          name: data.name || product.title,
          description: data.description || product.description,
          price: data.price || product.price,
        };
        products[index] = { id, ...updatedproduct };
        fs.writeFileSync("./data/products.json", JSON.stringify(products)); //save back to json
        resolve(JSON.stringify(products[index]));
      } else {
        resolve("Null");
      }
    } catch (err) {
      reject(err);
    }
  });
}
function _delete(id) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((pro) => pro.id === id);
    if (index === -1) {
      resolve("Product not found");
    } else {
      const product = products[index];
      console.log(product);
      products.splice(index, 1);
      fs.writeFileSync("./data/products.json", JSON.stringify(products)); //save back to json
      resolve(JSON.stringify(product));
    }
  });
}
module.exports = {
  findall,
  findbyID,
  create,
  update,
  _delete,
};
