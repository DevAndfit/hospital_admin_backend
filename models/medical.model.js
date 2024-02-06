const { Schema, model } = require('mongoose');

const medicalSchema = Schema({
    name: { type: String, required: true },
    img: { type: String },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

medicalSchema.method('toJSON', function() {
   const { __v, _id, ...object } = this.toObject();
   object.uid = _id;
   return object
})


module.exports = model('Medical', medicalSchema);