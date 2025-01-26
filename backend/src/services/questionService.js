const Question = require("../models/Question");

const searchQuestions = async (call, callback) => {
    const { query } = call.request;

    try {
        const questions = await Question.find({
            title: { $regex: query, $options: "i" },
        });

        const response = {
            questions: questions.map((q) => {
                let questionData = {
                    id: q._id.toString(),
                    title: q.title,
                    type: q.type,
                };

                // Include different fields based on question type
                if (q.type === "MCQ") {
                    questionData.options = q.options.map((option) => ({
                        text: option.text,
                        isCorrectAnswer: option.isCorrectAnswer,
                    }));
                } else if (q.type === "ANAGRAM") {
                    questionData.blocks = q.blocks.map((block) => ({
                        text: block.text,
                        showInOption: block.showInOption,
                        isAnswer: block.isAnswer,
                    }));
                    questionData.anagramType = q.anagramType;
                } else if (
                    q.type === "CONTENT_ONLY" ||
                    q.type === "READ_ALONG" ||
                    q.type === "CONVERSATION"
                ) {
                    // For these types, no special additional data is included
                    questionData.solution = q.solution;
                }

                return questionData;
            }),
        };

        callback(null, response);
    } catch (error) {
        callback(error);
    }
};

module.exports = { searchQuestions };
