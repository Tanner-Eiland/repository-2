// Cross-Origin Resource Sharing
const whiteList = [
    "http://127.0.0.1:550", 
    "http://localhost:3000", 
    "htpps://www.google.com"
];

const corsOptions = {
    origin: (origin, callback ) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            calback (new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus: 200,
};

module.exports = corsOptions;