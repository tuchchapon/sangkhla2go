// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mongoose = require('mongoose');

export default(req,res)=>{
  let location_array =[]
  let mongoURL = 'mongodb+srv://admin:1234@sangkhla.lm5wh.mongodb.net/Sangkhla2goDB'
  mongoose.connect(mongoURL, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ status: 400, type: "failed", payload: err.message });
    }
    return res
      .status(200)
      .json({ status: 200, type: "success", payload: "success" });
  });
}



