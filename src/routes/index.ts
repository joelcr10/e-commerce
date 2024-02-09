import express,{Router, Request, Response} from "express";

import login from "../controllers/authentication/login.ts";
import supplierRegistration from "../controllers/authentication/register.ts";
import changePassword from "../controllers/authentication/resetPassword.ts";

const router: Router = Router();


router.post('/supplierRegistration', async (req: Request,res: Response) =>{
    await supplierRegistration(req,res);
})

router.post('/login', async (req: Request,res: Response) =>{
    await login(req,res);
})

router.post('/changePassword', async (req: Request,res: Response) =>{
    await changePassword(req,res);
})


export default router;