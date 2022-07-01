const PostMemDao = require('../daos/post/post.mem.dao');
const PostMongoDao = require('../daos/post/post.mongo.dao');

class DAOsFactory {
    static getDAOs(type) {
        let postDAO;

        switch (type.toLowerCase()) {
            case 'mem':
                postDAO = new PostMemDao();
                break;
            case 'mongo':
                postDAO = new PostMongoDao('coderposts');
                break;
            
            default:
                throw new Error('Invalid data source, please provide the following: MEM | FILE | MONGO');
        }

        return {
            postDAO
        };
    };
}

module.exports = DAOsFactory;
