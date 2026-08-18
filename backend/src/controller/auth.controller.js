const userModel =  require('../models/user.model');


async function registerUser(req,res) {
    const { userName , email , password ,role } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            {userName},
            {email}
        ]
    });

    if (isUserAlreadyExist){
            return res.status(409).json({message: 'User already exists'});

            const user =  await usermodel.create({
                username,
                email,
                password,
                role

            })
    }
};

