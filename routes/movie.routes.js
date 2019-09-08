let express = require('express');
let router = express.Router();
let M= require('../mongodb/movie');
let G = require('../mongodb/genre');
router.post('/movie', async(req,res) => {
    let {error} = M.ValidationError(req.body);
    if(error) {return res.status(402).send(error.details[0].message)}
   let genre = await G.Genre.findById(req.body.genreId);
   if(!genre){return res.status(400).send('invalid genre id')}
   let data = new M.Movie({
       name: req.body.name,
       genre: {
           _id:genre._id,
           name: genre.name
       },
       rating:req.body.rating,
       price:req.body.price
   });

   let items = await data.save();
   res.send(items);
});

module.exports = router;