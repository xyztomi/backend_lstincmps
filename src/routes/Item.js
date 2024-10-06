const express = require('express')
const router = express.Router()
const Auth = require('../middleware/Auth')
const { getAllItem, createItem, updateItem, deleteItem, getItemById } = require('../controllers/itemController')
const Upload = require('../middleware/Upload')

// router.post('/item', Upload.single('image'), getItem)

// guest can access
// get all item
router.get('/api/item', getAllItem);
// get an item by id
router.get('/api/item/:id', getItemById);


// auth required
// create an item
router.post('/api/item/upload', Auth, Upload.single('image_url'), createItem);
// update an item by id
router.put('/api/item/:id', Auth, updateItem);
// delete an item by id
router.delete('/api/item/:id', Auth, deleteItem);


module.exports = router