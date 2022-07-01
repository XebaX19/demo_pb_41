const PostServices = require('../services/post/post.services');
const { STATUS } = require('../utils/constants/api.constants');
const { apiSuccessResponse, apiFailedResponse } = require('../utils/api.utils');

class PostControllers {
    constructor() {
        this.service = new PostServices();
        this.getPostsController = this.getPostsController.bind(this); //Para bindear los métodos al momento de crear la instancia...en caso de que de error al querer acceder a la instancia (this = undefined)
        this.getPostByIdController = this.getPostByIdController.bind(this) ;
        this.createPostController = this.createPostController.bind(this); 
    };

    async getPostsController(req, res, next) {
        try {
            const posts = await this.service.getPostsService();
            const response = apiSuccessResponse(posts, STATUS.OK);

            return res.status(STATUS.OK).json(response);
        } catch (error) {
            next(error);
        }
    };

    async getPostByIdController(req, res, next) {
        try {
            const { id } = req.params;
            const post = await this.service.getPostByIdService(id);
            const response = apiSuccessResponse(post, STATUS.OK);

            return res.status(STATUS.OK).json(response);
        } catch (error) {
            next(error);
        }
    };

    async createPostController(req, res, next) {
        try {
            const post = req.body;
            const newPost = await this.service.createPostService(post)
            const response = apiSuccessResponse(newPost, STATUS.CREATED);

            return res.status(STATUS.CREATED).json(response);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = PostControllers;