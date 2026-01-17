const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['student', 'college_admin', 'super_admin'],
        default: 'student'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    resetPasswordOtp: {
        type: String
    },
    resetPasswordOtpExpires: {
        type: Date
    }
}, {
    timestamps: true
});

// Pre-save middleware to hash password
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
