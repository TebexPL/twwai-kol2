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
    collection: 'params'
});
paramSchema.plugin(uniqueValidator);

const ParamModel = mongoose.model('paramsXY', paramSchema);

async function query() {
    // pobierz wszystkie
}

    // add

export default {
    query: query,


    model: ParamModel
};
