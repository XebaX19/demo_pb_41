const { v4: uuid } = require('uuid');
const PostDTO = require('../../dtos/post.dto');
const { STATUS } = require('../../../utils/constants/api.constants');
const CustomError = require('../../../utils/errors/customError');

class PostMemDao {
    constructor() {
        this.posts = [];
    }

    async getPosts() {
        return this.posts;
    }

    async getPostById(id) {
        const foundPost = this.posts.find((post) => post._id === id);
        if (!foundPost) {
            throw new CustomError(
                STATUS.NOT_FOUND, 
                `Post with id ${id} does not exist in our records`
            );
        }

        return foundPost;
    }

    async createPost(post) {
        try {
            const newPost = new PostDTO(post, uuid());
            this.posts.push(newPost);

            return newPost;
        } catch (error) {
            throw new CustomError(
                STATUS.SERVER_ERROR, 
                `Error creating post`,
                error
            );
        }
    }
};

module.exports = PostMemDao;