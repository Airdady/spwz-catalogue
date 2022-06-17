const Catalogue = require('./modal');
const { Res } = require('../utils/util');

const Controller = {

  getAll: async (req, res) => {
    return Res(res, async () => {
      const catalogues = await Catalogue.getCategories()
      return res.status(200).send({ status: 200, data: catalogues })
    })
  },
  getOne: async (req, res) => {
    return Res(res, async () => {
      const catalogue = await Catalogue.findCatalogueById(req.params.id)
      return res.status(200).send({ status: 200, data: catalogue })
    })
  },
  createOne: (req, res) => {
    return Res(res, async () => {
      const catalogues = await Catalogue.createCategory(req.body)
      return res.status(200).send({ status: 201, catalogues })
    })
  },
  delete: async (req, res) => {
    return Res(res, async () => {
      const catalogue = await Catalogue.findByIdAndDelete(req.params.id)
      await Catalogue.deleteMany({ parentId: req.params.id })
      if (catalogue) {
        return res.status(200).send({ status: 200, message: 'catalogue deleted successfully' })
      }
      return res.status(404).send({ status: 404, message: 'catalogue not found' })
    })
  },
  update: async (req, res) => {
    return Res(res, async () => {
      const catalogue = await Catalogue.findByIdAndUpdate(req.params.id, req.body)
      if (catalogue) {
        const data = await Catalogue.findById(req.params.id)
        return res.status(200).send({ status: 200, message: 'catalogue updated successfully', data })
      }
      return res.status(404).send({ status: 404, message: 'catalogue not found' })
    })
  }
}

module.exports = Controller;