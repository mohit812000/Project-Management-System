import adminModel from "../models/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

export const getAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find();
        if (admins) {
            return res.status(200).json({
                data: admins,
                message: "fetched"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const addAdmin = (req, res) => {
    try {
        const { name, email, password } = req.body;
        const add_admin = new adminModel({
            name: name,
            email: email,
            password: password
        })

        add_admin.save();

        if (add_admin) {
            return res.status(201).json({
                data: add_admin,
                message: "fetched"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const getAdmin = async (req, res) => {
    try {
        const adminID = req.params.admin_id;
        const admin = await adminModel.findOne({ _id: adminID });
        if (admin) {
            return res.status(200).json({
                data: admin,
                message: "fetched"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateAdmin = async (req, res) => {
    try {
        const adminID = req.params.admin_id;
        const { name, email, password } = req.body;

        const update_admin = await adminModel.updateOne({ _id: adminID }, {
            $set: {
                name: name,
                email: email,
                password: password,
            }
        })

        if (update_admin.acknowledged) {
            return res.status(200).json({
                message: "Updated"

            })
        }
        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const adminID = req.params.admin_id;
        const del_admin = await adminModel.deleteOne({ _id: adminID });
        if (del_admin) {
            return res.status(200).json({
                message: "Deleted"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}



// auth

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existAdmin = await adminModel.findOne({ email: email });
        if (existAdmin) {
            return res.status(200).json({
                message: "Admin already exist"
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log(password, hashedPassword)

        const saveAdmin = await adminModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        if (saveAdmin) {
            return res.status(201).json({
                message: "SignUp Successfully"
            })
        }
        return res.status(400).json({
            message: "Bad Request"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existAdmin = await adminModel.findOne({ email: email });
        if (!existAdmin) {
            return res.status(200).json({
                message: "User doesn't exist"
            })
        }

        const checkPassword = bcrypt.compareSync(password, existAdmin.password);
        if (!checkPassword) {
            return res.status(200).json({
                message: "Invalid Credential"
            })
        }

        const token = jwt.sign(
            {
                _id: existAdmin._id,
                email: existAdmin.email,

            },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1h" },
        )

        console.log("tokennnnn", token);
        return res.status(200).json({
            data: existAdmin,
            token: token,
            message: "Login successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });

    }

}


export const emailSend = async (req, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mohitsharma98023@gmail.com',
                pass: 'mohit123'
            }
        });

        var mailOptions = {
            from: 'mohit98023@gmail.com',
            to,
            subject,
            text,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.status(200).json({
                    message: 'Email sent: ' + info.response
                })
            }
        });


    } catch (error) {
        return res.status(500).json({ message: error.message })


    }

}