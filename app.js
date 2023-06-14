
const express = require('express');
const app = express();
const conn = require('./config/db');

const PORT = 5000;

app.use(express.json);

app.get('/get-buku', function (req, res){
    const queryStr = "SELECT * FROM buku WHERE deleted_at IS NULL";
    conn.query(queryStr, (err, results) => {
        if (err){
            console.log(err);
            res.error(err.sqlMessage, res);
        } 
        else{
            res.status(200).json({
                "success" : true,
                "message" : "Sukses menampilkan data",
                "data" : results
            });

        }

    })
})


app.post('/store-buku', function (req, res){
    
    console.log(req.body);
    const param = req.body;
    const judul = param.judul;
    const penulis = param.penulis;
    const now = new Date();

    const queryStr = "INSERT INTO buku (judul, penulis, created_at) VALUES(?, ?, ?)";
    const values = [judul, penulis, now];
    

    conn.query(queryStr, values, (err, results) => {
        if (err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message" : err.sqlMessage,
                "data": null
            })
        } else{
            res.status(200).json({
                "success": true,
                "message" : "Sukses menyimpan data",
                "data": results
            });
        }
    })
});


app.get('/get-buku-by-id', function (req, res){
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT * FROM buku WHERE deleted at IS NULL AND id = ?";
    const values = [id];

    conn.query(queryStr, values, (err, results) => {
        if (err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message" : err.sqlMessage,
                "data": null
            })
        } else{
            res.status(200).json({
                "success": true,
                "message" : "Sukses menampilkan data",
                "data": results
            });
        }
    })
})

app.post('/update-buku', function (req, res){
    const param = req.body;
    const id = param.id;
    const judul = param.judul;
    const penulis = param.penulis;

    conn.queryStr = "UPDATE buku SET judul = ?, penulis = ? WHERE id = ? AND deleted_at IS NULL";
    const values = [judul, penulis, id];

    conn.query(queryStr, values, (err, results) => {
        if (err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message" : err.sqlMessage,
                "data": null
            })
        } else{
            res.status(200).json({
                "success": true,
                "message" : "Sukses meng-update data",
                "data": results
            });
        }

    })

})

app.delete('/delete-buku', function (req, res){
    const param = req.body;
    const id = param.id;
    const now = new Date();

    const queryStr = "UPDATE buku SET deleted_at = ? WHERE id = ?"
    const values = [now, id];

    conn.query(queryStr, values, (err, results) => {
        if (err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message" : err.sqlMessage,
                "data": null
            })
        } else{
            res.status(200).json({
                "success": true,
                "message" : "Sukses menghapus data",
                "data": results
            });
        }

    } )


})

app.get('/', (req, res) => res.send('WAWW udah jalan coy LESGOWW. halo btw'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
