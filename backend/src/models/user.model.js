"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");
const transporter = require("../services/transporter");
const config = require("../config");
const Schema = mongoose.Schema;
const randomstring = require("randomstring");
const boolean = require("joi/lib/types/boolean");

const roles = ["user", "admin"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 128,
    },
    is_recovery_requested: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      maxlength: 50,
    },
    name: {
      type: String,
      maxlength: 50,
    },
    activationKey: {
      type: String,
      unique: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: roles,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = bcrypt.hashSync(this.password);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.post("save", async function saved(doc, next) {
  try {
    const mailOptions = {
      from: "noreply",
      to: this.email,
      subject: "Confirm creating account",
      html: _creating_account_html(this.activationKey),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return next();
  } catch (error) {
    return next(error);
  }
});

const _creating_account_html = (activationKey) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Web Scarpper Data Visualization</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header img {
      max-width: 100px;
      height: auto;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      text-decoration: none;
      background-color: #3498db;
      color: #fff;
      border-radius: 5px;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
    }

    .footer p {
      color: #777;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Web Scarpper Data Visualization</h2>
    </div>
    <p>Congratulations! 🎉 You've successfully created your account. To get started, click the button below:</p>
    <a class="button" href="${config.hostname}/api/auth/confirm?key=${activationKey}">Confirm My Account</a>
  </div>
</body>

</html>

`;

userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "name",
      "username",
      "email",
      "createdAt",
      "role",
      "is_recovery_requested",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },
});

const _recovery_password_html = (password) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header img {
      max-width: 100px;
      height: auto;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      text-decoration: none;
      background-color: #3498db;
      color: #fff;
      border-radius: 5px;
    }

    .temp-password {
      background-color: #eee;
      padding: 10px;
      margin: 20px 0;
      border-radius: 5px;
      user-select: all;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
    }

    .footer p {
      color: #777;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h2>Password Reset - Welcome to Web Scarpper Data Visualization</h2>
    </div>
    <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
    <p>Your temporary password is:</p>
    <div class="temp-password" onclick="selectText('${password}')">${password}</div>
    <p>For security reasons, we recommend changing your password after logging in.</p>
    <div class="footer">
      <p>Need further assistance? Reply to this email or contact us at our email</p>
    </div>
  </div>

  <script>
    function selectText(elementId) {
      var text = document.getElementById(elementId);
      if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(text);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
      document.execCommand('copy');
      alert('Password copied to clipboard!');
    }
  </script>
</body>

</html>

`;

const generateRandomString = (length = 12) => {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialCharacters = "@#$*_";

  const allCharacters =
    uppercaseLetters + lowercaseLetters + digits + specialCharacters;

  if (length < 4) {
    throw new Error("Length must be at least 4");
  }

  const randomString =
    randomstring.generate({ charset: uppercaseLetters }) +
    randomstring.generate({ charset: lowercaseLetters }) +
    randomstring.generate({ charset: digits }) +
    randomstring.generate({ charset: specialCharacters }) +
    randomstring.generate({ charset: allCharacters, length: length - 4 });

  // Shuffle the string to randomize the order
  const shuffledString = randomString
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return shuffledString.substring(0, length);
};

userSchema.statics = {
  roles,

  checkDuplicateEmailError(err) {
    if (err.code === 11000) {
      var error = new Error("Email already taken");
      error.errors = [
        {
          field: "email",
          location: "body",
          messages: ["Email already taken"],
        },
      ];
      error.status = httpStatus.CONFLICT;
      return error;
    }

    return err;
  },
  async findAndResetPassword(payload, user) {
    const { password } = payload;

    console.log(user);
    const { email } = user;

    this.password = password;
    const _hashSyncPass = bcrypt.hashSync(password);
    const _user = await this.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: _hashSyncPass,
          is_recovery_requested: false,
        },
      },
      { new: true } // This option returns the updated document
    ).exec();

    return _user;
  },

  async findAndSendPassword(payload) {
    const { email } = payload;
    if (!email) throw new APIError("Email must be provided");

    const _user = await this.findOne({ email }).exec();
    if (!_user)
      throw new APIError(
        `No user associated with ${email}`,
        httpStatus.NOT_FOUND
      );

    const _password = generateRandomString(12);
    console.log("_password");
    console.log(_password);
    // console.log("_password")
    this.password = _password;
    const _hashSyncPass = bcrypt.hashSync(_password);
    const user = await this.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: _hashSyncPass,
          is_recovery_requested: true,
        },
      },
      { new: true } // This option returns the updated document
    ).exec();

    try {
      const mailOptions = {
        from: "noreply",
        to: email,
        subject: "Recovery Password",
        html: _recovery_password_html(_password),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }

    return user;
  },

  async findAndGenerateToken(payload) {
    const { email, password } = payload;
    if (!email) throw new APIError("Email must be provided for login");

    const user = await this.findOne({ email }).exec();
    if (!user)
      throw new APIError(
        `No user associated with ${email}`,
        httpStatus.NOT_FOUND
      );

    const passwordOK = await user.passwordMatches(password);

    if (!passwordOK)
      throw new APIError(`Password Error`, httpStatus.UNAUTHORIZED);

    if (!user.active)
      throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED);

    return user;
  },
};

module.exports = mongoose.model("User", userSchema);
