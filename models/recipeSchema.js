const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image:{
        type: String,        
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy',
        required: true
    }
});


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
