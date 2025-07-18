import { generatePassword } from "../helper/generatePassword"
import { sendEmail } from "../services/mailerService";


export const passwordEmailSend = async (user_email) => {
    const temp_password = generatePassword();

    const subject = 'Flat Finder: Password Reset Request'
    const email_Body = `<h1>Reset Password</h1>
    <h2>Hello,</h2>
    <p>We have received your reset password request!</p>
    <p></p>
    <p>If you have lost your password and wish to reset it, click on the link below to reset it</p>
    <p></p>
    <p><a href="${process.env.URL_HOST}/forgot-password/${user_email}"> Reset Password</a></p>
    <p>Your temporary password: ${temp_password}</p>
    <p>If you did not request for a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password.</p>
    </div>`

    const emailSendRes = await sendEmail(user_email, subject, email_Body)
    return emailSendRes;
}