import mongoose from "mongoose";

const { Schema } = mongoose;

// single answer record
const AnswerSchema = new Schema ({
    questionId: { type: Schema. Types. ObjectId, required: true },
    selectedOptions: { type: [Schema. Types.Mixed], default: []},
    textAnswer: { type: String },
    timeTaken: { type: Number, default: 0}, 
    marksAwarded: { type: Number, default: 0 }, 
    isCorrect: { type: Boolean, default: false },
}, {_id: false });

const AttemptSchema = new Schema ({
    quiz: { type: Schema. Types.ObjectId, ref: 'Quiz', required: true }, 
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quizSnapshot: { type: Schema. Types.Mixed, required: true },
    // student submitted answers
    answers: { type: {AnswerSchema}, default: []},
    status: { type: String, enum: ['in-progress', 'submitted', 'graded'], default: 'in-progress' },
    startedAt: { type: Date, default: Date.now }, 
    submittedAt: { type: Date },
    durationTaken: { type: Number, default: 0}, 
    totalScore: { type: Number, default: 0 }, 
    maxScore: { type: Number, default: 0 },
    // optional metadata
    ipAddress: { type: String }, 
    meta: { type: Schema. Types.Mixed },
}, { timestamps: true });

// compute maxScore from snapshot
AttemptSchema.pre('validate', function (next) {
    if (!this.maxScore && this.quizSnapshot && Array.isArray (this.quizSnapshot.questions)) {
        this.maxScore = this.quizSnapshot.questions.reduce((s, q) => s + (q.marks || 0))
    }
    next();
});

// Helper to find question snapshot by id
AttemptSchema.methods.getQuestionSnapshot = function (questionId) {
  if (!this.quizSnapshot || !Array.isArray(this.quizSnapshot.questions)) return null;
  return this.quizSnapshot.questions.find(
    (q) => String(q._id) === String(questionId)
  );
};

AttemptSchema.methods.applyAutoGrading = async function (scoringFn) {
  // scoringFn receives ({ attempt }) and returns { totalScore, answers: [{ questionId, marksAwarded, isCorrect }] }
  if (typeof scoringFn !== 'function') {
    throw new Error('Scoring function required');
  }

  const result = await scoringFn({ attempt: this });

  // Apply per-question marks
  if (Array.isArray(result.answers)) {
    const map = new Map(result.answers.map(a => [String(a.questionId), a]));

    this.answers = this.answers.map(a => {
      const found = map.get(String(a.questionId));
      if (found) {
        a.marksAwarded = found.marksAwarded ?? a.marksAwarded;
        a.isCorrect = found.isCorrect ?? a.isCorrect;
      }
      return a;
    });
  }

    this. totalScore = typeof result.totalScore === 'number' ? result. totalScore : 'string'    
    this.status = 'graded';
    this.submittedAt = this.submittedAt || new Date();
return this.save();
} ;

export default mongoose.model( 'Attempt', AttemptSchema);