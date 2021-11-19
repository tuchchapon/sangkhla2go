export default async function (req,res){
    require('dotenv').config()
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth:{
            user: 'tuchchapon@tripniceday.com',
            pass : 'tuchtnd2539'
        },
        secure:true,
    });

    const resetPassword = {
        from:'sangkhla2go',
        subject:'แจ้งเตือนผลการรีวิว',
        to:'tuchchaponsuthamma@gmail.com',
        html: `<div>รหัสผ่านผู้ของคุณคือ</div>`
    }
    await new Promise((resolve,reject)=>{
        transporter.sendMail(resetPassword,function(err,info){
            if(err){
                console.log('err is',err);
                reject(err)
            }
            else{
                console.log('info is',info)
                resolve(info)
            }
        })
    })
console.log('success');
}