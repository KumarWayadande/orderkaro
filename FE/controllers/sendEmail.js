
async function sendMail(DESTINATION_EMAIL, message, subject, userAddressDetails){

    // console.log("sendMail called");
  try{
    const nodemailer=require("nodemailer");
    const {google} = require("googleapis");

  const CLIENT_ID = '399156512256-ig1428r8uhno63mtjsbdf9r9p0ob3osi.apps.googleusercontent.com'
  const CLIENT_SECRET = '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'
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
  const REFRESH_TOKEN = '1//041BZMtirje6zCgYIARAAGAQSNwF-L9Irf6NKwlT45PYNH0cVHaWd-yGSIJkxRGBbhkYu4dG_4BqeU0uI8hWISfs1bGk1WeRryGk'
 
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
          type: "OAuth2",
          user:"kumarwaidande7219@gmail.com",
          clientId:CLIENT_ID,
          clientSecret:CLIENT_SECRET,
          refreshToken:REFRESH_TOKEN,
          accessToken:accessToken
        }
    });


    const mailOptions = {
      from:'Order Karo Platform <kumarwaidande7219@gmail.com>',
      to:DESTINATION_EMAIL,
      subject:subject,
      text:message
    };

    const result = await transport.sendMail(mailOptions);
    return result
  }
  catch(error ){
    console.log(error);
  }
}
// sendMail().then(result=> console.log("Email sent....", result))
  // .catch(error=>console.log(error.message))

module.exports = sendMail;