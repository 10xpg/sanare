from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import re
import os

model_dir = os.path.dirname(os.path.abspath(__file__))


# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForCausalLM.from_pretrained(model_dir)


def predictor(age, condition):
    prompt = f"Age: {age}, Condition: {condition}, Drug:"
    inputs = tokenizer(prompt, return_tensors="pt", padding=True)

    with torch.no_grad():
        outputs = model.generate(
            input_ids=inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            pad_token_id=tokenizer.eos_token_id,
            max_length=200,
            do_sample=True,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            temperature=0.7,
            top_k=50,
            top_p=0.95,
        )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Extract info
    drug_match = re.search(r"Drug:\s*([^,\n]+)", response)
    category_match = re.search(r"Category:\s*([^,\n]+)", response)
    effectiveness_match = re.search(r"Effectiveness:\s*([^,\n]+)", response)
    side_effect_match = re.search(r"Side Effects:\s*([^,\n]+)", response)

    return {
        "drug_name": drug_match.group(1).strip() if drug_match else "Not specified",
        "category": (
            category_match.group(1).strip() if category_match else "Not specified"
        ),
        "effectiveness": (
            effectiveness_match.group(1).strip()
            if effectiveness_match
            else "Not specified"
        ),
        "side_effect": (
            side_effect_match.group(1).strip() if side_effect_match else "Not specified"
        ),
    }
