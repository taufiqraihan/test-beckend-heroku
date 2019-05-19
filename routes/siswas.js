var express = require('express');
var router = express.Router();
const models = require('../models');
const { checkAuth } = require('../middlewares/auth');

/* GET users listing. */
router.get('/',checkAuth, function(req, res, next) {
  console.log('tampilkan data siswa')
  models.Siswa.findAll().then(siswas => {
    res.status(200).json({message: "Read Data Siswa", data:siswas})
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: "Something Just Like This Arghhh!!!!! "})
  })
});

router.get('/:id',checkAuth, function(req, res, next) {
  const siswaId = req.params.id
  models.Siswa.findOne({where : {id: siswaId}}).then(siswas => {
    res.status(200).json({message: "Read Data Siswa", data:siswas})
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: "Something Just Like This Arghhh!!!!! "})
  })
});

router.delete('/:id',checkAuth, function(req, res) {
  const siswaId = req.params.id
  models.Siswa.findOne({where: {id: siswaId}}).then(siswa => {
    return siswa.destroy()
  }).then(siswa => {
      res.status(200).json({message: "Delete Siswa with Id " + siswaId})
    }).catch(err => {
    console.log(err)
    res.status(500).json({message: "Something Just Like This Arghhh!!!!! "})
  })
});

router.post('/',checkAuth, function(req, res) {
  const { nama, alamat, kelas } = req.body
  models.Siswa.create({nama, alamat, kelas}).then(siswa => {
    res.status(201).json({message:"Create Siswa", data:siswa})
  }).catch(err => {
    console.log(err)
    res.status().json({})
  })
});

router.put('/:id',checkAuth, function(req, res){
  const siswaId =req.params.id
  const {nama, alamat, kelas} = req.body
  models.Siswa.findOne({where : {id: siswaId}}).then(siswa =>{
    return siswa.update({
      nama,
      alamat,
      kelas
    })
  }).then(updatedSiswa => {
    res.status(200).json({message: "update Siswa", data: updatedSiswa})
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: "Something just like this arghhhh!!!"})
  })
})


module.exports = router;
