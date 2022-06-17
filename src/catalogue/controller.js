import Catalogue from './modal';

const Controller = {

  getAll: async (req, res) => {
    const catalogues = await Catalogue.paginate()
    res.status(200).send({ status: 200, data: catalogues })
  },
  createOne: async (req, res) => {
    const catalogues = await Catalogue.paginate()
    res.status(200).send({ status: 200, data: catalogues })
  }
}

export default Controller;