import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    telephone:{
        type : Number,
        required: [true, 'Telephone is required'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    }
});

userSchema.pre('save', function(next) {
    if(this.isModified('password'))
    {
        bcrypt.hash(this.password,10,(err, hash) => {
            if(err) return next(err)
            this.password=hash
            next()
        })
    }
})

userSchema.methods.comparePassword = async function (password) {
    if(!password) throw new Error('Password is missing, can not compare')
    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        console.log('Error while comparing password!', error.message)
    }
}

const User = model("User", userSchema)

export default User
