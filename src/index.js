import express from 'express';
import bodyParser from 'body-parser';
const compression = require('compression');

export default (config, init) => {
    const app = express();
    
    app.use(compression({filter: () => true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    let router = express.Router();

    let alivePath = '/alive';
    let aliveCallback = null;

    if(typeof config.alive == 'object'){
        alivePath = config.alive[0];
        aliveCallback = config.alive[1];
    }else{
        aliveCallback = (req, res, next) => {
            res.status(200).json({
                OK:true,
                status:200,
                message:"alive",
            })
        };
    }

    router.get(alivePath,aliveCallback);

    app.use(config.prefix || '/', init(router, app));

    app.use((req, res, next) => {
        res.status(404).json({
            OK:false,
            code: 404,
            message: "Not Found",
        });
    });

    app.use(function(err, req, res, next) {
        res.status(500).json({
            OK:false,            
            code: 500,
            message: err.message || "Internal Error Server",
        });
        console.log(err);
    });

    const PORT = config.port;
    const HOST = config.host;
    
    process.env.PORT = PORT;

    app.set('port', PORT);
    app.set('host', HOST);

    app.listen(PORT, HOST);

    console.log(`@amaris/api running on ${HOST}:${PORT}`);

    return app;
}