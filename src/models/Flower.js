import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['extremely_sad', 'sad', 'neutral', 'slightly_happy', 'very_happy']
  },
  flowerType: {
    type: String,
    required: true,
    enum: ['wilted', 'tulip', 'rose', 'daisy', 'sunflower']
  },
  color: {
    type: String,
    required: true,
    default: '#F5A9B8'
  },
  position: {
    x: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    y: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
flowerSchema.index({ userId: 1, createdAt: -1 });

// Virtual for flower type mapping
flowerSchema.virtual('mappedFlowerType').get(function() {
  const moodToFlower = {
    'extremely_sad': 'wilted',
    'sad': 'tulip', 
    'neutral': 'rose',
    'slightly_happy': 'daisy',
    'very_happy': 'sunflower'
  };
  return moodToFlower[this.mood] || 'rose';
});

// Virtual for color mapping
flowerSchema.virtual('moodColor').get(function() {
  const moodColors = {
    'extremely_sad': '#8B0000',
    'sad': '#4682B4', 
    'neutral': '#F5A9B8',
    'slightly_happy': '#98FB98',
    'very_happy': '#FFD700'
  };
  return moodColors[this.mood] || '#F5A9B8';
});

export const Flower = mongoose.model('Flower', flowerSchema);

