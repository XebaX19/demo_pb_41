const { Router } = require('express');
const PostControllers = require('../../controllers/post.controllers');

const router = Router();

class PostRoutes {
    constructor() {
        this.controller = new PostControllers();
    };

    initialize(prefix = "") {
        router.get(`${prefix}/`, this.controller.getPostsController);

        router.get(`${prefix}/:id`, this.controller.getPostByIdController);

        router.post(`${prefix}/`, this.controller.createPostController);

        return router;
    };
}

module.exports = new PostRoutes();