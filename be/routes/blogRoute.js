const express = require('express');
const router = express.Router();
const BlogsModel = require('../models/blogs');
const {
    responseError, responseSuccess,
    regExpSearch,
} = require('../utils/common');
router.get('/blogs/list', async (req, res) => {
    try {
        const { page = 1, search } = req.query;
        const limit = 10;
        const conditions = {
            isDeleted: "No"
        };
        conditions.$or = [
            { blogName: regExpSearch(search) },
            { category: regExpSearch(search) },
        ]
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'items',
            limit: 'limit',
            page: 'currentPage',
            nextPage: 'nextPage',
            prevPage: 'prevPage',
            totalPages: 'pageCount',
            pagingCounter: 'pagingCounter',
            meta: 'paginator',
        };
        const populate = [];
        const options = {
            sort: {
                createdAt: -1,
            },
            page: page,
            limit: limit,
            lean: true,
            populate,
            // select: fields,
            customLabels: myCustomLabels,
        };
        const listBlog = await BlogsModel.paginate(conditions, options);
        if (listBlog) {
            return res.json(responseSuccess("List blog successfully!", listBlog));
        }
        return res.json(responseSuccess("List blog successfully!", []))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})
// related list
router.get('/blogs/relatedList', async (req, res) => {
    try {
        const { page = 1, category } = req.query;
        const limit = 3;
        const conditions = {
            isDeleted: "No",
        };
        conditions.category = regExpSearch(category);
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'items',
            limit: 'limit',
            page: 'currentPage',
            nextPage: 'nextPage',
            prevPage: 'prevPage',
            totalPages: 'pageCount',
            pagingCounter: 'pagingCounter',
            meta: 'paginator',
        };
        const populate = [];
        const options = {
            sort: {
                createdAt: -1,
            },
            page: page,
            limit: limit,
            lean: true,
            populate,
            // select: fields,
            customLabels: myCustomLabels,
        };
        const listBlog = await BlogsModel.paginate(conditions, options);
        if (listBlog) {
            return res.json(responseSuccess("List blog successfully!", listBlog));
        }
        return res.json(responseSuccess("List blog successfully!", []))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})
router.get('/blogs/info/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conditions = {
            _id: id,
        }
        const findBlog = await BlogsModel.findOne(conditions);
        if (findBlog) {
            return res.json(responseSuccess("Find a blog successfully!", findBlog));
        }
        return res.json(responseError("Find a blog fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})
router.post('/blogs/create', async (req, res) => {
    try {
        const { blogName, description, category,
            tags, image } = req.body;
        const set = {};
        set.blogName = blogName;
        set.description = description;
        set.category = category;
        set.tags = tags;
        set.image = image;
        console.log(set, "set");
        const newBlog = await BlogsModel.create(set);
        if (newBlog) {
            return res.json(responseSuccess("Create a blog successfully!", newBlog));
        }
        return res.json(responseError("Create a blog fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.put('/blogs/edit', async (req, res) => {
    try {
        const { blogId, blogName, description,
            category, tags, image } = req.body;
        const conditions = {};
        conditions._id = blogId;
        const set = {};
        set.blogName = blogName;
        set.description = description;
        set.category = category;
        set.tags = tags;
        set.image = image;
        const updatedBlog = await BlogsModel.findOneAndUpdate(conditions, set, { new: true });
        if (updatedBlog) {
            return res.json(responseSuccess("Edit a blog successfully!", updatedBlog));
        }
        return res.json(responseError("Edit a blog fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.delete('/blogs/delete', async (req, res) => {
    try {
        const { blogId } = req.body;
        const conditions = {
            _id: blogId,
        }
        const set = {
            isDeleted: "Yes",
        }
        const deletedBlog = await BlogsModel.findOneAndUpdate(conditions, set, { new: true });
        if (deletedBlog) {
            return res.json(responseSuccess("Delete a blog successfully!", deletedBlog));
        }
        return res.json(responseError("Delete a blog fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

module.exports = router;