// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const hello = (req, res) =>{
  res.status(200).json({ name: 'John Doe' })
}
const hi = (req, res) =>{
  res.status(200).json({ name: 'hi Doe' })
}


// export default function handler(req, res) {
//   res.status(200).json({
//     body: req.body,
//     query: req.query,
//     cookies: req.cookies,
//   });
// }
module.exports ={
Api:{
  hello,
  hi
}

}