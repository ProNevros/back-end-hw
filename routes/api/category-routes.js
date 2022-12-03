const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then((ctgData) => {
    res.json(ctgData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  }).then((ctgData) => {
    res.json(ctgData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((newCtg) => {
    res.json(newCtg);
  })
    .catch((err) => {
      res.json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((ctg) => {
    res.json(ctg)
  });
});
  

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const ctgData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!ctgData) {
      res.status(404).json({ message: 'No matching category found' });
      return;
    }
    res.status(200).json(ctgData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
