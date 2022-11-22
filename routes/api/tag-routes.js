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

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(re.body, 
    { where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ message: "There is no tag with that ID! Please try again" });
    }
    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destory({ 
      where: { id: req.params.id } });
      if (!tagData) {
        res.status(404).json({ message: "There is no tag with that ID! Please try again" });
      }
      res.status(200).json(tagData);
      } catch (err) {
        res.status(500).json(err);
      }
    });

module.exports = router;
