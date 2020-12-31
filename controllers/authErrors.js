// *REGISTER ERROR HANDLING*
module.exports.handleRegisterErrors = err => {
    errors = { email: "", password: "", username: "", fullname: "" };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "That email is already taken!";
        return errors;
    }
        
    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// *LOGIN ERROR HANDLING*
module.exports.handleLoginErrors = err => {
    errors = { email: "", password: ""}

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered"
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "That password does not match the email"
    }
    return errors
}