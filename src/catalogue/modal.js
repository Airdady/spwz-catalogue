import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const CatalogueSchema = new mongoose.Schema(
  {
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
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Catalogue",
    },
  },
  { timestamps: true }
);

CatalogueSchema.plugin(mongoosePaginate);
const Catalogue = mongoose.model("Catalogue", CatalogueSchema);

export default Catalogue;