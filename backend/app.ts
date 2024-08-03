import express, {Express, Request, Response} from "express";
import cors, {CorsOptions} from "cors";

const port: string = "3000";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const allowedOrigins: string[] = ["http://localhost", "http://127.0.0.1"];
const options: CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
};

app.use(cors(options));


app.get("/", async(req: Request, res: Response) => {
  res.status(200).send({"message": "Hello World"});
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
