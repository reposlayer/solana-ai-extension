import { classifyText } from './model.js';

const ai = {
  classifyText: async (text) => {
    const inputs = {
      input_ids: [text],
      attention_mask: [1],
    };
    const outputs = await classifyText(inputs);
    const predictions = outputs.predictions;
    return predictions;
  },
};

export default ai;
