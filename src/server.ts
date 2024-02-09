import express,{Express, Request, Response} from 'express';
import sequelize from "./config/sequelize-config.ts";
import indexRoutes from "./routes/index.ts";
import supplierRoutes from "./routes/supplierRoutes.ts";


const PORT = 3000;
const app:Express = express();

sequelize.sync({force: false}).then(() =>{
    console.log("db synced");
}).catch((error)=>{
    console.log("error: ",error);
});


app.use(express.json());

app.use(indexRoutes);
app.use("/api/v2",supplierRoutes);


app.listen(PORT, () =>{
    console.log("port listening.....")
})


