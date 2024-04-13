import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./public/temp");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    //storage:storage or as we are using es6 so same name 
    storage,
});