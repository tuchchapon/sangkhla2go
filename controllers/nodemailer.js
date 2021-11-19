const nodemailer = require('nodemailer')


// sendgrid mailer setting
const smtpTransport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth:{
        user: 'tuchchapon@tripniceday.com',
        pass : 'tuchtnd2539'
    },
    secure:true,
})

// const handlebarsOptions = {
//   viewEngine: {
//     extName: '.html',
//     partialsDir: `${appDir}/server/mailer/`,
//     layoutsDir: `${appDir}/server/mailer/`,
//     defaultLayout: 'email-layout.html',
//   },
//   viewPath: `${appDir}/server/mailer/`,
//   extName: '.html',
// }

// smtpTransport.use('compile', hbs(handlebarsOptions))

module.exports = {
  smtpTransport,
}
