const express = require('express');
const router = express.Router();
const CommentModel = require('../models/comment');
const { convertToObjectId, responseSuccess, responseError } = require('../utils/common');
router.post('/comments/create', async (req, res) => {
    try {
        const { blogId, rating, comment, username } = req.body;
        const set = {};
        set.blogObjId = blogId;
        set.rating = rating;
        set.comment = comment;
        set.username = username;
        const rs = await CommentModel.create(set);
        if (rs) {
            return res.json(responseSuccess("Create a comment successfully!", rs));
        }
        return res.json(responseError("Create a comment fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.get('/comments/list', async (req, res) => {
    try {
        const { blogObjId } = req.query;
        const conditions = {};
        conditions.blogObjId = convertToObjectId(blogObjId);
        const result = await CommentModel.find(conditions);
        if (result) {
            return res.json(responseSuccess("list comment successfully!", result));
        }
        return res.json(responseError("List comment fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

module.exports = router;