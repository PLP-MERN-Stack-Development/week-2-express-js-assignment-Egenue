const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../utils/errors');

let products = [];

exports.getAllProducts = (req, res) => {
  let result = products;
  const { category, page = 1, limit = 10 } = req.query;
  if (category) {
    result = result.filter(p => p.category === category);
  }
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(result.slice(start, end));
};

exports.getProductById = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
};

exports.createProduct = (req, res) => {
  const product = { id: uuidv4(), ...req.body };
  products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
};

exports.searchProducts = (req, res) => {
  const { q } = req.query;
  const result = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  res.json(result);
};

exports.getStats = (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
};