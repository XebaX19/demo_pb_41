const { Router } = require('express');
const postRoutes = require('./post/post.routes');
const errorMiddleware = require('../middlewares/error.middleware');

const router = Router();

//Routes
router.use('/posts', postRoutes.initialize());

//Error middleware
router.use(errorMiddleware);

module.exports = router;