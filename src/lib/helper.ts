"use server";
import { MailObj } from "./types";
const nodemailer = require("nodemailer");

export const generateRandomId = () => {
  const minCeiled = Math.ceil(1000);
  const maxFloored = Math.floor(9999);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export const generateOTP = async () => {
  const minCeiled = Math.ceil(111111);
  const maxFloored = Math.floor(999999);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export const sendMail = async (mail: MailObj) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_KEY,
    },
  });
  try {
    const response = await transporter.sendMail({
      from: '"ToDo App" <mpv799@gmail.com>', // sender address
      to: mail.to, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.body, // plain text body
    });
    console.log("Message sent: %s", response.messageId);
    return true;
  } catch (err) {
    return false;
  }
};
