import * as nodemailer from "nodemailer";

const HOST: string = "smtp.gmail.com";
const PORT: number = 587;
const SECURE: boolean = false;
const SERVICE: string = "Gmail";
const USER: string = "YOUR_GAMIL_ADDRESS";
const PASS: string = "YOUR_GMAIL_PASSWORD"; // read down comment for PASS

/**
*
* for PASS following this steps: 
* 1. Go to https://myaccount.google.com/security
* 2. Enable 2-step vertification
* 3. Create App Password for Email
* 4. Copy that password (16 characters) without spaces into the PASS.
*/

class Email {
    private readonly transporter: any;
    private readonly from: string;

    constructor(sender = USER) {
        this.transporter = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            secure: SECURE,
            service: SERVICE,

            auth: {
                user: USER,
                pass: PASS
            }
        })

        this.from = sender;
    }

    verify = async() => {
        return this.transporter.verify()
        .then(() => {
            return true;
        })
        .catch((err: any) => {
            throw err;
        })
    }

    send = async (to: string, subject: string = "", text: string = "", html: string = ""): Promise<boolean | Error> => {
        return new Promise((resolve: any, reject: any) => {
            this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                text,
                html
            })
            .then(() => {
                resolve(true);
            })
            .catch((err: any) => {
                reject(err)
            })
        })
    }

}

const email = new Email();

console.log("verify")
email.verify().then((res => console.log('res', res))).catch(console.error)

email.send('test1@gmail.com, test2@gmail.com', 'hello my boy', 'this is test email text', '<h1>this is email test html</h1>')
.then(res => console.log('sended', res))
.catch(console.error)
