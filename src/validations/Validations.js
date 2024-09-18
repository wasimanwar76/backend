const emailValidator = (req, res, next) => {
    const { email } = req.body;

    // Define a regular expression for validating email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Check if the email field is present
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Validate the email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // If email is valid, proceed to the next middleware or route handler
    next();
};






//   password validations 


const passwordValidator = (req, res, next) => {
    const { password } = req.body;

    // Define a regular expression for password validation
    // Password must be between 6-12 characters, include at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/;

    // Check if the password field is present
    if (!password) {
        return res.status(400).json({ success:false,message: 'Password is required' });
    }

    // Validate the password format
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success:false,
            message:'Password must be 6-12 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character',
        });
    }

    // If the password is valid, proceed to the next middleware or route handler
    next();
};

module.exports = { emailValidator, passwordValidator };
