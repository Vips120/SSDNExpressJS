let mongoose = require('mongoose');
let Joi = require('@hapi/joi');

let genreSchema = new mongoose.Schema({
    name:{type:String,require:true,min:0, max:100}
});

let Genre = mongoose.model('genre', genreSchema);

function ValidationError(error){
    let Schema = Joi.object().keys({
        name: Joi.string().min(0).max(100).required()
    });

    return Joi.validate(error,Schema);
};


module.exports = {genreSchema,Genre,ValidationError}

