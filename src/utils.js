import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';

import { adjectives, nouns } from './words';

dotenv.config();

export const generateSecret = () => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretKey = (address, secret) => {
  const email = {
    from: 'admin@treediary.com',
    to: address,
    subject: 'Email authorization key for TreeDiary',
    html: `Hello! Your secret key is <b>${secret}</b>.<br />
    Copy & paste on the app/website to complete authorization process.`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
