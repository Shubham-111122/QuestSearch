const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrectAnswer: { type: Boolean, required: true },
});

const blockSchema = new mongoose.Schema({
    text: { type: String, required: true },
    showInOption: { type: Boolean, required: true },
    isAnswer: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: [
                "MCQ",
                "READ_ALONG",
                "CONTENT_ONLY",
                "CONVERSATION",
                "ANAGRAM",
            ],
            required: true,
        },
        title: { type: String, required: true },
        options: [optionSchema], // For MCQ type
        blocks: [blockSchema], // For ANAGRAM type
        anagramType: { type: String }, // For ANAGRAM type
        siblingId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }, // For linking sibling questions
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
