const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');
const { generatorTime } = require('../utils/common');
const BlogSchema = new Schema({
    blogName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    image: {
        type: String,
        required: true
    },
    isDeleted: {
        type: String, enum: ["Yes", "No"], default: "No"
    },
    createdAt: {
        type: String, default: generatorTime,
    }
})
BlogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Blog', BlogSchema);