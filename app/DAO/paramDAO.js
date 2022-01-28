import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const paramSchema = new mongoose.Schema({
    temp: {type: String},
    humidity: {type: String},
    pressure: {type: String},
    date: {type: String}
}, {
    collection: 'paramsTB'
});
paramSchema.plugin(uniqueValidator);

const ParamModel = mongoose.model('paramsTB', paramSchema);

async function query() {
  const result = await ParamModel.find({});
  if (result)
      return mongoConverter(result);
}


async function add(object) {
  const result = await ParamModel.create(object);
  if (result)
      return mongoConverter(result);
}

export default {
    query: query,
    add: add,

    model: ParamModel
};
