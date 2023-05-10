const mongoose = require('mongoose');
const schema = mongoose.Schema;

const statesSchema = new schema({

    state: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    admission_date: {
        type: String,
        required: true
    },
    admission_number: {
        type: Number,
        required: true,
        unique: true
    },
    capital_city: {
        type: String,
        required: true
    },
    capital_url: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true,
    },
    population_rank: {
        type: Number,
        required: true,
        unique: true
    },
    constitution_url: {
        type: String,
        required: true
    },
    state_flag_url: {
        type: String,
        required: true
    },
    state_seal_url: {
        type: String,
        required: true
    },
    map_image_url: {
        type: String,
        required: true
    },
    landscape_background_url: {
        type: String,
        required: true
    },
    skyline_background_url: {
        type: String,
        required: true
    },
    twitter_url: {
        type: String,
        default: undefined
    },
    facebook_url: {
        type: String,
        default: undefined
    },
    funfacts: {
        type: [String],
        default: undefined
    }


})

module.exports = mongoose.model("States", statesSchema);