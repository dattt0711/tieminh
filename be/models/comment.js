const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const CommentSchema = new Schema({
    blogObjId: {
        type: ObjectId,
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    username: {
        type: String,
    }
})

module.exports = mongoose.model('Comment', CommentSchema);