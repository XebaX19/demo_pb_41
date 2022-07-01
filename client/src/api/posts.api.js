import API from './base.api.js';

const baseEndpoint = '/api/posts';

export default class PostsAPI extends API {
    static async getPosts() {
        return await this.get(baseEndpoint);
    }

    static async getPostById(postId) {
        return await this.get(`${baseEndpoint}/${postId}`);
    }

    static async createPost(postPayload) {
        return await this.post(baseEndpoint, postPayload);
    }

    static async updatePost(postId, postPayload) {
        return await this.put(`${baseEndpoint}/${postId}`, postPayload);
    }

    static async deletePost(postId) {
        return await this.del(`${baseEndpoint}/${postId}`);
    }
}