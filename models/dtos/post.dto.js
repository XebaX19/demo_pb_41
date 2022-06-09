class PostDTO {
    constructor(postItem, _id) {
        Object.assign(this, postItem); //Toma los atributos de la "source" y se lo asigna al "target". Esto es lo mismo a asignar uno por uno los campos de postItem
        this.createdAt = postItem.createdAt || Date.now();
        this.updatedAt = Date.now();

        if (_id) {
            this._id = _id;
        }
    }
};

module.exports = PostDTO;