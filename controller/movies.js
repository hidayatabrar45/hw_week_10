exports.get = (req, res, next) => {
    (async () => {
        const data = req.body;
        console.log("data")
    
        try {
            const result = await pool.query('SELECT * FROM movies');  

            
            res.status(200).json({
                success: true,
                data: result
            });
        }catch (error) {
            console.log(error);
            next(error.detail)
        }  
    })
}
