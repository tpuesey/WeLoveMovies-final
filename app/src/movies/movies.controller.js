const services = require("./movies.services");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

 //added middleware
 async function movieExists(req, res, next) {
     const movie = await services.getMovieById(Number(req.params.movieId));
     if (movie) {
         res.locals.movie = movie;
         return next()
     }
     next({ status: 404, message: 'Movie cannot be found.' });
 }

 //CRUD implementation 
 async function list(req, res, next) {
     try {
         const { is_showing } = req.query;
         if (is_showing) {
             const data = await services.listMoviesShowing()
             return res.json({ data });
         }
         const data = await services.list();
         res.json({ data });
     } catch (err) {
         next({ status: 405, message: err })
     }
 };

 async function read(req, res) {
     res.json({ data: res.locals.movie });
 }

 async function readReviews(req, res, next) {
     const data = await services.readReviews(res.locals.movie.movie_id);
     res.json({ data });
 }

 async function readTheaters(req, res, next) {
     const data = await services.readTheaters(res.locals.movie.movie_id);
     res.json({ data });
 }

 module.exports = {
     list: asyncErrorBoundary(list),
     read: [movieExists, asyncErrorBoundary(read)],
     readReviews: [movieExists, readReviews],
     readTheaters: [movieExists, readTheaters],
 };