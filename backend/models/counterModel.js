const mongoose = require("mongoose")
const modelName = 'counter';

const counterSchema = new mongoose.Schema({
    value: {
        type: Number,
        default: 0
    }
})


counterSchema.statics.increment = async function(){
    try {
        let count = await this.findOne();

        if (!count) {
            count = (new mongoose.model(modelName, counterSchema))();
        }

        count.value = count.value + 1;
        await count.save();

        return count.value;
    } catch (error) {
        console.log(error)
    }

    return -1;
}

const counterModel = new mongoose.model(modelName, counterSchema)

module.exports = counterModel