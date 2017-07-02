/**
 * Created by Nishan on 5/1/2017.
 */
'use strict';

var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bitslashpharmacy@gmail.com',
        pass: 'bitslashPharmacyPassword'
    }
    /*
    xoauth2: xoauth2.createXOAuth2Generator({
     user: 'bitslashpharmacy@gmail.com',
     clientId: '75402334219-7sah5sjaeti17j20j738kjso4l0gcdvo.apps.googleusercontent.com',
     clientSecret: 'ssCGY5Unx28A7KC6eFEDIgIb',
     refreshToken: '1/zgBJJ7oBG_z6AEL3nTFwPTGz0lczjhAFSG-2yVnYjt2bo8hvPquxwu2BOOTonrHn'
     })
    */
});

var mailOptions = {
    from: 'Bitslash Pharmacy <bitslashPharmacy@gmail.com>',
    subject: 'nodemailer test mail subject',
    text: 'Is this working?'
};

function startMailSend(emailContent) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bitslashpharmacy@gmail.com',
            pass: 'bitslashPharmacyPassword'
        }
    });

    var mailOptions = {
        from: 'Bitslash Pharmacy <bitslashPharmacy@gmail.com>',
        to: emailContent.to,
        subject: emailContent.subject,
        text: emailContent.text,
        html : emailContent.htmlContent
    };
    console.log(emailContent.htmlContent);

    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log('Error got while sending'+err);
            return 'Error got while sending'+err;
        }
        else{
            res.json({data:'Email Sent to destination'});
            console.log('Email sent succesfully');
            return 'Email sent succesfully';
        }
    });
}

module.exports = startMailSend;