import Catalogue from './modal';
import { Res } from '../util';

const Controller = {

  getAll: async (req, res) => {
    return Res(res, async () => {
      const catalogues = await Catalogue.paginate()
      return res.status(200).send({ status: 200, data: catalogues })
    })
  },
  createOne: (req, res) => {
    return Res(res, async () => {
      const catalogues = await Catalogue.create(req.body)
      return res.status(200).send({ status: 201, data: catalogues })
    })
  },
  delete: async (req, res, next) => {
    return Res(res, async () => {
      const catalogue = await Catalogue.findByIdAndDelete(req.params.id)
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

export default Controller;