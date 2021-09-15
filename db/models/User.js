import seq from "sequelize";
import db from "../db.js";
import crypto from "crypto";

const DEFAULT_ALGO = "RSA-SHA256";

const User = db.define("user", {
  username: {
    type: seq.DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: seq.DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  photoUrl: {
    type: seq.DataTypes.STRING,
  },
  password: {
    type: seq.DataTypes.STRING,
    validate: {
      min: 6,
    },
    allowNull: false,
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: seq.DataTypes.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
});

User.prototype.correctPassword = function (password) {
  return User.encryptPassword(password, this.salt()) === this.password();
};

User.createSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainPassword, salt) {
  return crypto
    .createHash(DEFAULT_ALGO)
    .update(plainPassword)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});

export default User;
