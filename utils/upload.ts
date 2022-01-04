import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import crypto from "crypto"

aws.config.update({
    secretAccessKey:process.env.AWS_SECRET_KEY,
    accessKeyId:process.env.AWS_ACESS_KEY,
    region:process.env.AWS_REGION,
})
let bucket = process.env.AWS_BUCKET

let s3 = new aws.S3({ /* ... */ })


let upload = multer({
    storage: multerS3({
        s3: s3,
        // @ts-ignore
        bucket,
        acl: "public-read",
        contentType:multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName)
            })
        }
    })
})

export default upload