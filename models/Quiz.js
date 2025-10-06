import mongoose from "mongoose";

const { Schema } = mongoose;

const OptionSchema = new Schema ({
    _id: { type: Schema. Types. ObjectId, auto: true },
     text: { type: String, required: true },
     media: { type: String }, 
}, {_id: true });

const QuestionSchema = new Schema ({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId },
    text: { type: String, required: true },
    type: { type: String, enum: ["single", "multiple", "tf", "short"], required: true },
    options: { type: [OptionSchema], default: [] },
    correctAnswers: { type: [Schema.Types.Mixed], default: [] }, 
    marks: { type: Number, default: 1, min: 0 }, 
    negativeMarks: { type: Number, default: 0, min: 0 }, 
    explanation: { type: String }, 
    media: { type: String },
    perQuestionTime: { type: Number },
}, {_id: false });

const QuizSchema = new Schema ({
    title: { type: String, required: true, trim: true, index: 'text' },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    questions: { type: [QuestionSchema], default: []},

    duration: { type: Number, default: 0 },
    attemptsAllowed: { type: Number, default: 1 }, 
    startTime: { type: Date },
    endTime: { type: Date },
    isPublished: { type: Boolean, default: false }, 
    randomizeQuestions: { type: Boolean, default: false },
    shuffleOptions: { type: Boolean, default: false },
    showAnswersAfterSubmit: { type: Boolean, default: false },

    settings: {
        allowNegativeMarking: { type: Boolean, default: true }, 
        partialCredit: { type: Boolean, default: true },
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) ;

// Virtual: totalMarks - sum of question marks
QuizSchema.virtual( 'totalMarks').get (function () {
    return this.questions.reduce ((sum, q) => sum + (q. marks || 0), 0);
});

// Virtual: questionCount
QuizSchema.virtual('questionCount').get(function () {
    return this.questions.length;
});

// Helper: return a student-safe copy of the quiz (no correctAnswers)
QuizSchema.methods.getStudentView = function ({ includeAnswers = false, shuffle = false }) {
    // deep clone
    const clone = JSON. parse (JSON.stringify(this.toObject()));
    // remove server-only fields
    if (!includeAnswers) {
        clone.questions = clone. questions.map ((q) => {
        delete q.correctAnswers;
        return q;
    });}

    // optional shuffling (respect quiz config)
    const shuffleArray = (arr) => arr.sort (() => Math. random () - 0.5);
        if (shuffle) {
            if (this. randomizeQuestions) clone.questions = shuffleArray (clone.questions)
            if (this.shuffleOptions) clone.questions = clone.questions.map ( (q) => {
            if (q.options && q.options.length) q.options = shuffleArray(q.options);
        return q;
    });}

    // Remove internal references
    delete clone.createdBy;
    return clone;
};

export default mongoose.model ( 'Quiz', QuizSchema);