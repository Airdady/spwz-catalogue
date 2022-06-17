const mongoose = require("mongoose");
const { groupedCatalogue } = require("../utils/util");

const CatalogueSchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      unique: true,
      required: true,
      default: 1
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    parentId: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

CatalogueSchema.statics.createCategory = async function (doc) {
  const cursor = await this.find({}).sort({ categoryId: -1 }).limit(1);
  if (doc.parentId) {
    const parent = await this.findById(doc.parentId);
    doc.parentId = parent.categoryId
    if (!parent) {
      throw new Error('parent Catalogue not found')
    }
  }
  doc.categoryId = cursor.length ? cursor[0].categoryId + 1 : 1;
  const results = Catalogue.create(doc);
  return results;
}

CatalogueSchema.statics.getCategories = async function () {
  const categories = await this.find();
  return groupedCatalogue(categories);
};


CatalogueSchema.statics.findCatalogueById = async function (id) {
  const catalogues = await this.find();
  const t = [];
  for (let i = 0; i < catalogues.length; i++) {
    t[catalogues[i].categoryId] = catalogues[i].parentId;
  }
  const f = (t, c) => {
    var a = [];
    for (let i = 0; i < t.length; i++) {
      const newCat = catalogues.find((cat) => cat.categoryId === i)
      if (t[i] === c) {
        a.push({
          id: newCat._id.toString(),
          name: newCat.name,
          slug: newCat.slug,
          sub: f(t, i)
        });
      }
    }
    return a;
  };
  let foundObj;
  JSON.stringify(f(t, 0), (_, nestedValue) => {
    if (nestedValue && nestedValue['id'] === id) {
      foundObj = nestedValue;
    }
    return nestedValue;
  });
  if (!foundObj) {
    throw new Error('catalogue not found');
  }
  return foundObj;
}

const Catalogue = mongoose.model("Catalogue", CatalogueSchema);

module.exports = Catalogue;