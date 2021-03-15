const mail = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH = 'https://developers.google.com/oauthplayground'

const {
    MAIL_ID,
    MAIL_CLIENT,
    MAIL_REFRESHTOKEN,
    SENDER_MAIL
} = process.env

const oauth2Client = new OAuth2(
    MAIL_ID,
    MAIL_CLIENT,
    MAIL_REFRESHTOKEN,
    SENDER_MAIL,
    OAUTH
)

// send mail
const send_email = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAIL_REFRESHTOKEN
    })

    const token_access = oauth2Client.getAccessToken()
    const transportProtocol = mail.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_MAIL,
            clientId: MAIL_ID,
            clientSecret: MAIL_CLIENT ,
            token_access,
            refreshToken: MAIL_REFRESHTOKEN,
            
        }
    })

    const config = {
        from: SENDER_MAIL,
        to: to,
        subject: "Trademark Journal Portal",
        txt: txt,
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">${txt}</h2>
            <p>Congratulations! You're almost there to Start using Trademark Portal.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }

    transportProtocol.sendMail(config, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = send_email