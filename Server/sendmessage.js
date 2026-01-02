const twilio =require ('twilio')
const dotenv =require ("dotenv") ;
dotenv.config()
console.log(process.env.TWILIO_ACCOUNT_SID)
 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
async function createMessage() {
    try {
         const message = await client.messages.create({
    body: "Hello, there!",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+919521653238",
  });
 
  console.log(message.body);
    } catch (error) {
        consol.log(error)
    }
 
}
 
createMessage();
 
console.log(client)