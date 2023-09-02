/*import multiparty from 'multiparty';
import { PutObjectCommand, S3Client, S3 } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';

const bucketName = 'ne-gi-uup-next-ecommerce';

export default async function handle(req, res) {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    console.log('length:', files.file.length);

    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCES_KEY,
        }

    });
    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        console.log(newFilename)
        console.log({ ext, file })

        try {
            await client.send(new PutObjectCommand({
                Bucket: bucketName,
                key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
            }));

        } catch (e) {
            if (e.name === "AbortError") {
                uploadProgress.textContent = 'Upload aborted: ' + e.message;
            }
        }
        const link = `https://ne-gi-uup-next-ecommerce.s3.amazonaws.com/${newFilename}`;
        links.push(link);

    }
    res.json({ links });
}

export const config = {
    api: { bodyParser: false },
};*/


import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const bucketName = 'juan-sesu-ecommerce';


export default async function handle(req, res) {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    console.log('length:', files.file.length);
    console.log(files);
    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCES_KEY,
        },
    });
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        console.log()
        

       // await client.send(new PutObjectCommand({
         //   Bucket: bucketName,
           // key:'',
        //}));
    }

   return  res.json('ok!');
}

export const config = {
    api: { bodyParser: false },
};