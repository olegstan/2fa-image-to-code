import jsQR from 'jsqr';
import Jimp from 'jimp';
import speakeasy from 'speakeasy';
import fs from 'fs';
import path from 'path';

var imgPath = '';

// var imgPath = __dirname + '\\example\\img'

process.argv.slice(2).forEach(function (val, index, array)
{
    if(imgPath === '')
    {
        imgPath = __dirname + path.sep + 'example' + path.sep + val.toString();
    }
});

(async () => {
    var img = fs.readFileSync(imgPath, 'utf8');

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