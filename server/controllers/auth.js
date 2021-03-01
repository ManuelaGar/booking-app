import User from '../models/user.js';

export const register = async (req, res) => {
    const {name, password, email} = req.body;

    if(!name) return res.status(400).send('Name is required')
    if(!password || password.length < 6) return res.status(400).send('Password is required and should be min 6 characters')
    
    let isEmailInDB = await User.findOne({ email }).exec();
    if (isEmailInDB) return res.status(400).send('Email is taken')

    const newUser = User(req.body);

    try {
        await newUser.save()
        console.log('User created', newUser);
        return res.json({ ok: true });
    } catch (error) {
        console.log('Create user failed: ', err);
        return res.status(400).send('Error. Try again.');
    }
};