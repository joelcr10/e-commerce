const express = require('express');
const sequelize = require('./config/sequelize-config');
const ec_suppliers = require('./models/ec_suppliers');
const PORT = 3000;
const app = express();

sequelize.sync({force: false}).then(() =>{
    console.log("db synced");
}).catch((error)=>{
    console.log("error: ",error);
});


app.use(express.json());

const supplierRegistration = async (req,res) =>{
    try{
        const {full_name, e_mail, password, profile_pic="sdasdasd"} = req.body;
        if(!full_name){
            return res.status(422).send("full name not found");
        }
        if(!e_mail){
            return res.status(422).send("email not found");
        }if(!password){
            return res.status(422).send("password not found");
        }
        const newSupplier = await ec_suppliers.create({
            full_name: full_name,
            e_mail: e_mail,
            password: password,
            profile_pic: profile_pic
        });
      
        return res.status(200).send(`new supplier created: ${newSupplier.registration_id}`);

    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
    

}


const userLogin = async (req,res) =>{
    try{
        const {email, password, userType} = req.body;
        if(!password){
            return res.status(422).send("password not found");
        }
        if(!email){
            return res.status(422).send("email not found");
        }

        if(userType=="supplier"){
            const found = await ec_suppliers.findOne({where: {e_mail: email, password: password}});
            if(found==null){
                return res.status(200).send("Invalid username or password");
            }else{
                
                return res.status(200).send("login successfull");
            }
        }else{
            return res.status(200).send("no such role exists");
        }
    }catch(error){
        console.log(error);
        return res.status(401).send(error);
    }
}

const userProfile = async (req,res) =>{
    try{
        const {registration_id, userType} = req.body;
        if(userType=="supplier"){
            const found = await ec_suppliers.findOne({where: {registration_id: registration_id}});
            if(found==null){
                return res.send("Invalid registration id");
            }else{
                console.log("found",found.dataValues);
                return res.json(found.dataValues);
            }
        }
    }catch(error){
        console.log(error); 
        return res.send("error");
    }
}

app.post('/supplierRegistration', async (req,res) =>{
    await supplierRegistration(req,res);
})

app.post('/login', async (req, res) =>{
    await userLogin(req,res);
})

app.get('/profile', async(req,res) =>{
    await userProfile(req,res);
})

app.post('/changePassword', async (req,res) =>{
    try{
        const {email, userType, newPassword} = req.body;
        if(userType=="supplier"){
            const found = await ec_suppliers.findOne({where: {e_mail: email}});
            if(found==null){
                return res.send("user not found");
            }else{
                console.log(found.password);
                found.password = newPassword;
                await found.save();
                return res.send("password changed");
            }
        }
    }catch(error){
        return res.send(error);
    }
})


app.listen(PORT, () =>{
    console.log("port listening.....")
})