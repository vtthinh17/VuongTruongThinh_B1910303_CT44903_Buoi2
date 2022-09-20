const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");
const app = express();
const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());
app.use("/api/contacts",contactsRouter);

//khi khong co URL nao khop voi cac route dinh nghia o contactsRouter
//middle nay se xu ly loi 404 not found
app.use((req, res, next) => {
    return next(new ApiError(404,"Resource not found"));
});
//middleware xu ly loi khi cac route tren khong match
app.use((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;