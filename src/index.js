import jsQR from 'jsqr';
import Jimp from 'jimp';
import speakeasy from 'speakeasy';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


var imgPath = '';
// var imgPath = __dirname + '\\example\\img'

process.argv.slice(2).forEach(function (val, index, array)
{
    if(imgPath === '')
    {
        imgPath = __dirname + path.sep + '..' + path.sep + 'example' + path.sep + val.toString();
    }
});

function readImageAsBase64(filePath) {
    const imageBuffer = fs.readFileSync(filePath);

    const base64Image = imageBuffer.toString('base64');

    return  base64Image.replace(/^data:image\/\w+;base64,/, '');
}

(async () => {
    var img = readImageAsBase64(imgPath);

    Jimp.read(new Buffer.from(img, 'base64'), async function(err, image) {
        const value = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height);
        let code = (value.data.split("=")[1]).split("&")[0]

        if(code)
        {
            var code2Step = speakeasy.totp({
                secret: code,
                encoding: 'base32'
            });

            console.log(code2Step)
        }
    });
})();

export {}