const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){
        const {page = 1} = req.query;
        const products = await Product.paginate({}, {page, limit: 10});
        return res.json(products);
    },

    async show(req, res){
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },

    async store(req, res){
        try {
            //criação
            const {title, description, url} = req.body;
            const product = await Product.create({title, description, url});
            return res.json(product);
        } catch (error) {
            console.error(error)
        }
    },

    async update(req, res){
        //atualização
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(product);
    },

    async destroy(req, res){
        //remoção
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    }
};