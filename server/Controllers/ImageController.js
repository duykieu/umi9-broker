const { catchAsync } = require("../Helpers/utils");
const AppError = require("../Libs/AppError");
const formidable = require("formidable");
const Image = require("../Models/Image");
const randomString = require("randomstring");
const { Storage } = require("@google-cloud/storage");

const generateImageId = () => {
    let i = 0;
    while (i >= 0) {
        const string = randomString.generate(5);
        if (Image.count({ imageId: string })) {
            return string;
        }
        i++;
    }
};

exports.upload = catchAsync(async (req, res, next) => {
    const form = formidable({ multiples: false, keepExtensions: true });

    //Parse the form
    form.parse(req, async (err, fields, files) => {
        console.log({ files });

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }

        const keyFilename = process.cwd() + process.env.SERVICE_ACCOUNT_KEY;
        const storage = new Storage({ projectId: process.env.PROJECT_ID, keyFilename });
        const imageId = generateImageId();

        storage.bucket(process.env.BUCKET_NAME).upload(
            files.file.path,
            {
                gzip: true,
                destination: imageId + "/" + files.file.name,
                // By setting the option `destination`, you can change the name of the
                // object you are uploading to a bucket.
                metadata: {
                    // Enable long-lived HTTP caching headers
                    // Use only if the contents of the file will never change
                    // (If the contents will change, use cacheControl: 'no-cache')
                    cacheControl: "public, max-age=31536000",
                },
            },
            (error, file) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        error,
                    });
                }

                //Save info to database
                Image.create(
                    {
                        imageId,
                        fileName: file.metadata.name,
                        originalUrl: "https://storage.cloud.google.com/" + file.metadata.id,
                    },
                    (error, file) => {
                        if (error) {
                            return res.status(500).json({
                                success: false,
                                error,
                            });
                        }

                        return res.json({
                            success: true,
                            imageId,
                        });
                    }
                );
            }
        );
    });
});
