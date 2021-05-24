const express = require("express");
const multer = require("multer");
const path = require("path")

let storagePhotoProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/photo_profile");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

let storageCategoryCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/category_cover");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

let storageArticleCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/article_cover");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

let uploadImg = multer({
  storage: storagePhotoProfile,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 5000000,
  }
})

let uploadCC = multer({
  storage: storageCategoryCover,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 5000000,
  }
})

let uploadAC = multer({
  storage: storageArticleCover,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 5000000,
  }
})

const formUpload = {
  uploadPhotoProfile: (req, res, next) => {
    const uploadPhotoProfile = uploadImg.single("photo_profile");
    uploadPhotoProfile(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file == undefined || req.file === null) {
        next();
      } else {
        next();
      }
    });
  },

  uploadCategoryCover: (req, res, next) => {
    const uploadCategoryCover = uploadCC.single("category_cover");
    uploadCategoryCover(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined || req.file === null) {
        next();
      } else {
        next();
      }
    });
  },

  uploadArticleCover: (req, res, next) => {
    const uploadArticleCover = uploadAC.single("article_cover")
    uploadArticleCover(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined || req.file === null) {
        next();
      } else {
        next();
      }
    });
  },
};

module.exports = formUpload;
