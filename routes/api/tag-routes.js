const router = require('express').Router();
const { restart } = require('nodemon');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: "There is no tag with that ID! Please try again" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(200).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name
    },
    { where: { id: req.params.id }
    };
    res.status(200).json(tagData);

    });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
