const express = require('express');
const router = express.Router();
const controller = require
const pool = require('../queries.js');
const movie = require('../controller/movies.js')


//CREATE/INSERT
// router.post('/register', async (req, res, next) => {
//     const data = req.body;
//     console.log(req)
   
//     try {
//         const result = await pool.query('INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)', 
//         [data.id, data.email, data.gender, data.password, data.role]);  

        
//         res.status(200).json({
//             success: true,
//             data: result
//         });
//     }catch (error) {
//         console.log(error)
//         next(error.detail)
//     }  
// });

router.get('/movies', movie.get)

//Login
router.post('/login', async(req, res, next) => {
    const data = req.body; 

    try {
        const query = `SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1`
        const result = await pool.query(query, [data.email, data.password])


        if(!result.rows.length){
            res.status(200).json({
                success: false,
                data: null,
                message: "email atau password salah"
            });
        } else {
            res.status(200).json({
                result,
                success: true,
                data: null,
                message: "email atau password benar"
            });
        }
    }catch (error) {
        next(error.detail)
    }
})

//UPDATE
router.put('/update', async(req, res, next) => {
    const data = req.body;

    try {
        const query = `UPDATE users 
        SET email = $2, gender = $3, password = $4, role = $5 
        WHERE id = $1`
        const result = await pool.query(query, [data.id, data.email, data.gender, data.password, data.role]);  

        res.status(200).json({
            success: true,
            data: result
        });
    }catch (error) {
        next(error.detail)
    }  
});


//Delete
router.delete('/:id', async(req, res, next) => {
    const id = req.params.id;
   
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);  

        res.status(200).json({
            success: true,
            data: result,
            message: `User deleted with id: ${id}`
        });
    }catch (error) {
        next(error.detail)
    }  
});

//read movies with pagination
router.post('/movies/paginate', async (req, res, next) => {
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    //hitung awal dan akhir index
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const query = `SELECT * FROM movies`
    const movie = await pool.query(query)
    

    const results = {};
    if(endIndex < movie.rows.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }

    results.results = movie.rows.slice(startIndex, endIndex);

    res.json(results);
})



module.exports = router;