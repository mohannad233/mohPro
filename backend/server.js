const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // إضافة nodemailer
const authRoutes = require('./auth');
const productRoutes = require('./products');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// خدمة ملفات الصور
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إعداد نقطة النهاية لإرسال البريد الإلكتروني
app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  // إعداد Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mohannad.d1818@gmail.com', // بريدك الإلكتروني
      pass: 'tukzyygtvlriwsxp', // كلمة مرور التطبيق التي حصلت عليها
    },
  });

  const mailOptions = {
    from: email, // البريد المرسل
    to: 'aliomari1996zz@gmail.com', // البريد المستلم
    subject: subject, // الموضوع
    text: message, // نص الرسالة
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
