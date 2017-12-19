exports.handle = (app) => {
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-AlerrorHandlerlow-Credentials", true);
        next();
    });

    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
        );
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        return next();
    });

    app.all("*", function (req, res, next) {
        if (req.method.toLowerCase() !== "options") {
            return next();
        }
        return res.send(204);
    });
}