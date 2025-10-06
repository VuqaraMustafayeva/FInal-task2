// dotenv env faylini oxuyur ve envya yukluyur(hessas melumatlari ayri saxlamaq)
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// frontend ve backendde cross origin problemlerini hell edir
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

// routerlerim
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// error middelewire olan hissem
app.use(errorHandler);

// mongodb ye qosulmaq ucun
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
