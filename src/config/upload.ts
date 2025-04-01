import path from "path";
import multer from "multer";

export const setupStorage = (nameFolder: string) => {
    let publicFolder = path.resolve(
        __dirname,
        "..",
        "..",
        "public",
        nameFolder
    );

    const storage = multer.diskStorage({
        destination: publicFolder,
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

    return storage;
};
