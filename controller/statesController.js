
const States = require("../model/states");




const getAllStates = async (req, res) => {
    
    const states = await States.find();
    
    if(!states) {return res.status(400).json({message: "No states are in the database."})};
    res.json(states);
};

const createStateInDatabase = async (req, res) => {
    if(!req.body.state ){
        return res
        .status(400)
        .json({ message: "state Required"});
    }

    try{
        const result = await States.create ({
            state: req.body.state,
            slug: req.body.slug,
            code: req.body.code,
            nickname: req.body.nickname,
            website: req.body.website,
            admission_date: req.body.admission_date,
            admission_number: req.body.admission_number,
            capital_city: req.body.capital_city,
            capital_url: req.body.capital_url,
            population: req.body.population,
            population_rank: req.body.population_rank,
            constitution_url: req.body.constitution_url,
            state_flag_url: req.body.state_flag_url,
            state_seal_url: req.body.state_seal_url,
            map_image_url: req.body.map_image_url,
            landscape_background_url: req.body.landscape_background_url,
            skyline_background_url: req.body.skyline_background_url,
            twitter_url: req.body.twitter_url,
            facebook_url: req.body.facebook_url,
            funfacts: req.body.funfacts
        });
        res.status(201).json(result);
    }
    catch (err){
        console.log(err);
    }  

};

// this will lose all previous fun facts //
const updateFunfactsInDatabase = async (req, res) => {
    if(!req.body.code){
        return res.status(400).json({message: "state code parameter is required"});
    }
    const State = await States.findOne({code: req.body.code});

    if(!State){
        return res.status(400).json({message: `state ${req.body.code} is not found`});
    }
    if(req.body.code) State.code = req.body.code;
    if(req.body.funfacts) State.funfacts = req.body.funfacts;

    const result = await State.save()

    res.json(result);
};

const getState = async (req, res) => {
    if(!req.params.code){
        return res.status(400).json({message: "state avrebviation parameter is required"});
    } else if (!(req.params.code.length == 2)) {
        return res.status(400).json({message: "Invalid state abbreviation parameter"});
    };
    
    const state = await States.find({ code: req.params.code}).exec();
    if(!state) {
        return res.status(400).json({message: "There is no state by this State Code"});
    };
    res.json(state);
};

const getStateCapital = async (req, res) => {
    if(!req.params.code){
        return res.status(400).json({message: "state code parameter is required"});
    };

    const state = await States.find({ code: req.params.code}, { state: 1, capital_city: 1, _id: 0}).exec();
    res.json(state);
};

const getStateNickname = async (req, res) => {
    if(!req.params.code){
        return res.status(400).json({message: "state code parameter is required"});
    };

    const state = await States.find({ code: req.params.code}, { state: 1, nickname: 1, _id: 0}).exec();
    res.json(state);
};

const getStatePopulation = async (req, res) => {
    if(!req.params.code){
        return res.status(400).json({message: "state code parameter is required"});
    };

    const state = await States.find({ code: req.params.code}, { state: 1, population: 1, _id: 0}).exec();
    res.json(state);
};

const getStateAdmissiondate = async (req, res) => {
    if(!req.params.code){
        return res.status(400).json({message: "state code parameter is required"});
    };

    const state = await States.find({ code: req.params.code}, { state: 1 , admission_date: 1 , _id: 0}).exec();
    res.json(state);
};

const getStateFunfact = async (req, res) => {
    if(!req.params.code){
        return res.status(400).json({message: "state code parameter is required"});
    };

    //const state = await States.aggregate([{
    //    $project: {$arrayElemAt: ["$funfacts", 0]}
    //}]);


    const state = await States.find({code: req.params.code}, { funfacts: 1 , _id: 0}).exec();

    const funfactLength = state[0].funfacts.length;
    if (funfactLength == 0) {
        return res.status(400).json({message: "This state has no funfacts"});
    };


    const random = Math.floor(Math.random()*funfactLength);


    const stateFunfact = await States.find({code: req.params.code} ,{funfacts: {$slice: [random,1]}, _id: 0,
        state: 0,
        slug: 0,
        code: 0,
        nickname: 0,
        website: 0,
        admission_date: 0,
        admission_number: 0,
        capital_city: 0,
        capital_url: 0,
        population: 0,
        population_rank: 0,
        constitution_url: 0,
        state_flag_url: 0,
        state_seal_url: 0,
        map_image_url: 0,
        landscape_background_url: 0,
        skyline_background_url:0,
        twitter_url: 0,
        facebook_url: 0,
        __v:0
}).exec();

    res.json(stateFunfact[0]);
};

const getDoesContig = async (req, res) => {

    var contig = req.query.contig;

    const contigs = await States.find({ $or: [{code:'AK'}, {code:'HI'}]}).exec();

    const nonContig = await States.find( { $and: [{code: {$ne: 'AK'}}, {code: { $ne:'HI'}}]}).exec();

    const state = await States.find().exec();



    if (contig == 'true') {
        res.json(contigs);
    } else if (contig == 'false') {
        res.json(nonContig);
    } else if (!contig){
    res.json(state);
    } else {
        return res.status(400).json({message: "Incorrect parameters"});
    };

};


// these should find something, but don't find anything if the url is too long (ex. localhost/states/contig is too long but localhost/states works just fine)//
const getContig = async (req, res) => {
    
        const state = await States.find({ $or: [{code:'AK'}, {code:'HI'}]}).exec();
    res.json(state);
};

const getNonContig = async (req, res) => {
    
    const state = await States.find( { $and: [{code: {$ne: 'AK'}}, {code: { $ne:'HI'}}]}).exec();
res.json(state);
};




module.exports = {
    getDoesContig,
    getNonContig,
    getContig,
    getStateFunfact,
    getStatePopulation,
    getStateAdmissiondate,
    getStateNickname,
    getStateCapital,
    getAllStates,
    createStateInDatabase,
    updateFunfactsInDatabase,
    getState
};