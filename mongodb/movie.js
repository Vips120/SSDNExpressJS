let mongoose = require('mongoose');
let gSchema = require('./genre');
let Joi = require('@hapi/joi');

let MovieSchema = new mongoose.Schema({
    name: {type:String, min:5, max:250, required:true},
    genre: {
type: gSchema.genreSchema, required:true
    },
    rating: {type:Number,required:true},
    price:{type:Number,required:true}
});

let Movie = mongoose.model('movie', MovieSchema);

function ValidationError(message) {
    let Schema = Joi.object().keys({
        name: Joi.string().min(5).max(250).required(),
        genreId:Joi.string().required(),
         rating:Joi.number().required(),
         price:Joi.number().required()
    });
    return Joi.validate(message,Schema);
}

module.exports = {
    MovieSchema,Movie,ValidationError
};