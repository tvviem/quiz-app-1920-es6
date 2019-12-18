import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  content: {type: String, required: true},
  created_by : {type: Schema.Types.ObjectId, ref: 'User'},
  tags: [String], 
  answers:
    [
      { 
        answer: {type: String, required: true}, 
        is_correct: {type: Boolean, default: false} 
      }
    ],
}, {timestamps: true});

const Question = model('Question', questionSchema);
export default Question;
