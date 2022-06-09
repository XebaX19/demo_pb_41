const config = require('../../config/config');
const DAOsFactory = require('../../models/daos/daos.factory');
const PostSchema = require('../../models/schemas/post/post.schema');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/errors/customError');

class PostServices {
    static async #validatePost(post) {
        try {

            return await PostSchema.validate(post);
        } catch (error) {
            throw new CustomError(
                STATUS.BAD_REQUEST,
                `Validation error`,
                error
            );
        }
    };

    constructor() {
        this.postDAO = DAOsFactory.getDAOs(config.DATA_SOURCE).postDAO;
    };

    async getPostsService() {
        return await this.postDAO.getPosts();
    };

    async getPostByIdService(id) {
        if (!id) {
            throw new CustomError(
                STATUS.BAD_REQUEST,
                `Id param is required`
            );
        }

        return await this.postDAO.getPostById(id);
    };

    async createPostService(post) {
        const newPost = PostServices.#validatePost(post);

        return await this.postDAO.createPost(newPost);
    };
}

module.exports = PostServices;