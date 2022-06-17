import Catalogue from './modal';

export const checkParentExists = (req, res, next) => {
  if (req.category.ParentId) {
    const category = await Catalogue.findById(req.category.ParentId);
    if (!category) return Send(res, 404, 'Parent Category does not exists');
  }
  next();
}

