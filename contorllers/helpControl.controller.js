import nodemailer from "nodemailer"
import userModel from "../models/user.model.js"
import helpModel from "../models/help.model.js"
import dotenv from "dotenv";

dotenv.config();

const helpControl = async (req, res) => {
    //logic

    const {longitude, latitude, message, firstName, urgency, description, Mobile} = req.body;
    const subject = "Kindly help Your brother and sister they are in danger!"
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    try {
        // const users = [] //badme likh diyo ;
        let users = await userModel.find({}, "email");

        // console.log(users[0].email)

        for (let ee of users) {
            await transporter.sendMail({
                from:  process.env.COMPANY_EMAIL,
                to: ee.email,
                subject,
                text: message,
                html: `<p>Click the link below to view the location on the map:</p>
                        <a href="${mapsLink}" target="_blank">View on Google Maps</a>`,
            });
        }

        let addHelp = await helpModel.create({
            latitude,
            longitude,
            message,
            firstName,
            description,
            urgency,
            Mobile
        })

        console.log(addHelp,users);
        console.log(req.body);
        res.status(200).json({ success: true, message: "Emails sent to all users!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }

}

export { helpControl }