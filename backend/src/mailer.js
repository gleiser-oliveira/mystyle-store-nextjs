const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

const formatEmail = text => `
    <div className='email' style='
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
        '>
        <h2>Hello, </h2>
        <p>${text}</p>

        <p>---</p>
        <p>GO Apps</p>
        <p>This e-mail was generated automatically. Please do not reply.</p>
`;

exports.transport = transport;
exports.formatEmail = formatEmail;