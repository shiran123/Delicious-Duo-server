export const registrationValidationSchema = {
    name:{
        notEmpty: {
            errorMessage:"name cannot be empty"    
        },
    },
    address:{
        notEmpty:{
            errorMessage:"address cannot be empty"
        }
    },
    telephone:{
        notEmpty:{
            errorMessage:"telephone cannot be empty"
        }
    },
    email:{
        notEmpty:{
            errorMessage:"email cannot be empty"
        },
        isEmail:{
            errorMessage:"please enter a valid email"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password cannot be empty"
        }
    }
}

export const loginValidationSchema = {
    email:{
        notEmpty:{
            errorMessage:"email cannot be empty"
        },
        isEmail:{
            errorMessage:"please enter a valid email"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password cannot be empty"
        }
    }
}