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

    const mailData = {
        from:'sangkhla2go',
        subject:'แจ้งเตือนผลการรีวิว',
        to:'tuchchaponsuthamma@gmail.com',
        html: 
    }
}