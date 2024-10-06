const item = require('../models/Item')

// get all item, also by filter query
const getAllItem = async (req, res) => {
  const { category, status } = req.query;

  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (status) {
    filter.status = status;
  }

  try {
    const items = await item.findAll({ where: filter });
    if (items.length > 0) {
      res.status(200).json({ data: items });
    } else {
      res.status(404).json({ message: 'No items found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items.', error });
  }
};

// create an item
const createItem = async (req, res) => {
  try {
    // req body
    const { title, description, category, status, location } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !status || !imageUrl) {
      return res.status(400).json({ error: 'title, description, image, and status are required.' });
    }

    const newItem = await item.create({
      title,
      description,
      category,
      status,
      location,
      image_url: imageUrl,
      user_id: req.user.id,
    });

    res.status(201).json({ message: 'Item created successfully', item: newItem });

  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// update an item
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, status, image_url } = req.body

  try {
    const updatedItem = await item.update(
      { title, description, category, status, image_url },
      { where: { id } }
    )

    if (updatedItem[0] === 1) {
      res.status(200).json({ message: 'an item has been updated' })
    } else {
      res.status(404).json({ message: 'item not found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'error updating item', err })
  }
}

// delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await item.destroy({ where: { id } })

    if (deleted) {
      res.status(200).json({ message: 'an item has been deleted' })
    } else {
      res.status(404).json({ message: 'item not found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'error deleting item', err })
  }
}

// get an item
const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundItem = await item.findOne({ where: { id } });

    if (foundItem) {
      res.status(200).json({ data: foundItem });
    } else {
      res.status(404).json({ message: 'item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'error fetching item', error });
  }
};

// get all item by category
const getAllItemByCategory = async (req, res) => {
  const { category } = req.query

  try {
    const itemCategory = await item.findAll({ where: { category } })
    if (itemCategory.length > 0) {
      res.status(200).json({ data: itemCategory })
    } else {
      res.status(200).json({ message: `no items found in ${category} category.` })
    }
  } catch (error) {
    res.status(500).json({ message: 'error fetching item by category.', error })
  }
}

// get all item by status (lost / found)
const getAllItemByStatus = async (req, res) => {
  const { status } = req.query
  console.log({ status })

  try {
    const itemStatus = await item.findAll({ where: { status } })
    if (itemStatus.length > 0) {
      res.status(200).json({ data: itemStatus })
    } else {
      res.status(200).json({ message: `no items found in ${status} status.` })
    }
  } catch (error) {
    res.status(500).json({ message: 'error fetching item by status.', error })
  }
}

module.exports = { getAllItem, createItem, updateItem, deleteItem, getItemById }