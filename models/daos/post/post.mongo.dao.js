const mongodb = require('mongodb');
const config = require('../../../config/config');
const dbConfig = require('../../../db/config');
const PostDTO = require('../../dtos/post.dto');
const { STATUS } = require('../../../utils/constants/api.constants');
const CustomError = require('../../../utils/errors/customError');

const {
    MongoClient,
    ObjectId
} = mongodb;

class PostMongoDao {

    //Implementamos patrón Singleton (pero por base de datos)
    static #dbInstances = {};

    constructor(database) {
        if (!PostMongoDao.#dbInstances[database]) {
            console.log(`[${config.NODE_ENV.trim()}] Connecting to ${database} database...`);
            MongoClient.connect(dbConfig.mongo.uri)
                .then((connection) => {
                    PostMongoDao.#dbInstances[database] = this;
                    const db = connection.db(database);
                    this._collection = db.collection('posts');
                    console.log(`[${config.NODE_ENV.trim()}] Connected to ${database}!`);
                });
        } else {
            return PostMongoDao.#dbInstances[database];
        }
    }

    async getPosts() {
        try {
            return await this._collection.find({}).toArray();
        } catch (error) {
            throw new CustomError(
                STATUS.SERVER_ERROR,
                `Error fetching post`,
                error
            );
        }
    }

    async getPostById(id) {
        try {
            return await this._collection.findOne({ _id: ObjectId(id) });
        } catch (error) {
            throw new CustomError(
                STATUS.SERVER_ERROR,
                `Error fetching post with id ${id}`,
                error
            );
        }
    }

    async createPost(post) {
        try {
            const newPost = new PostDTO(post);
            await this._collection.insertOne(newPost);
            
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

module.exports = PostMongoDao;