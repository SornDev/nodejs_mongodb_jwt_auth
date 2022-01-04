const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

userSchema.set("toJSON",{
    transform: (document, retrunedObject) => {
        retrunedObject.id = retrunedObject._id.toString();
        delete retrunedObject._id;
        delete retrunedObject._v;
        delete retrunedObject.password;
    },
});

// ກວດຊອບການສ້າງອີເມວຊ້ຳ
userSchema.plugin(uniqueValidator, {message: "Email already in use."});

// ທຳການສ້າງຕາຕະລາງ ຂອງ User 
const User = mongoose.model("user", userSchema);
module.exports = User;