const multer = require('multer')

const util = require('util')
const  multiparty = require('multiparty')

const driver_storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,`/public/uploadImage/driver`)
      },
      filename:function(req,file,cb){
        let _fileType = file.originalname.substring(file.originalname.indexOf("."));
        let _fileName
        if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {
         
          _fileName  = file.fieldname+Date.now()+_fileType;
        }
        else{
          _fileName = 'wrong_file_type'+Date.now()
        }
        cb(null,_fileName);
      },
  })
  const upload_driver_image = multer({ storage:driver_storage })

  export const config = {
    api: {
      externalResolver: true,
    //   bodyParser: false
    },
  }


//   module.exports = (req, res) => {
//     const busboy = new Busboy({ headers: req.headers });

//     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//       console.log('File [' + fieldname + ']: filename: ' + filename);

//       file.on('data', function(data) {
//         console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
//       });

//       file.on('end', function() {
//         console.log('File [' + fieldname + '] Finished');
//       });
//     });

//     busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
//       console.log('Field [' + fieldname + ']: value: ' + val);
//     });

//     busboy.on('finish', function() {
//       console.log('Done parsing form!');
//       res.writeHead(303, { Connection: 'close', Location: '/' });
//       res.end();
//     });

//     req.pipe(busboy);
// }

module.exports = async (req,res)=>{
    //   console.log('req is',req.body);
    //   console.log('res is',res);
    const {body} = req
    body.file
    console.log('id is',body.driver)
    console.log('test');
    upload_driver_image.single('driver'),(req,res,cb)=>{
        console.log(req.body)
        console.log('id is',req.body.id)
        let image_name = req.file.filename
        res.status(200).json({status:200,type:'success',image_name})
      }
    await util.promisify(multer().any())(req,res)
    console.log(req.body);
    console.log(req.flies);
    console.log(req); 

    //   return res.json({status:200,type:'success'})
    if (req.method === "POST") {
        console.log('post');
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload: \n\n');
            res.end(util.inspect({ fields: fields, files: files }));
        });
        return;
    } else {
        res.writeHead(405, { 'content-type': 'text/plain' });
        res.end("Method not allowed. Send a POST request.");
        return;
    }

  }