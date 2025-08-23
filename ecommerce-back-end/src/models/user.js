const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 20
    },
    lastName :{
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 20
    },
    username :{
        type : String,
        required : true,
        trim : true,
        unique : true,
        index : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        index : true,
        lowercase : true,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please enter a valid email address'
        }
    },
    hash_password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    },
    contact : {type : String},
    profilePicture : {type : String},
    
        
},{timestamps : true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10); 
});

userSchema.virtual('fullName')
.get(function(){
     return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}
module.exports = mongoose.model('User',userSchema);