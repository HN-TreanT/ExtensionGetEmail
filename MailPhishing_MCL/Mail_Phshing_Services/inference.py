import os
import pickle
from typing import List, Dict
# from inference import inference
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__) 
CORS(app)

# def inference_voting_classifier(model_path: str, sample_path: str) -> List[Dict[str, str]]:
#     # Load the model from the pickle file
#     with open(model_path, "rb") as f:
#         model = pickle.load(f)

#     # Determine whether sample_path is a file or directory  
#     if os.path.isfile(sample_path):
#         sample_files = [sample_path]
#     elif os.path.isdir(sample_path):
#         sample_files = [os.path.join(sample_path, f) for f in os.listdir(sample_path) if f.endswith(".eml")]
#     else:
#         raise ValueError(f"{sample_path} is not a file or directory")

#     # Classify each sample using the model
#     results = []
#     for sample_file in sample_files:
#         label, score = inference(sample_file, model)
#         result = {"file_name": os.path.basename(sample_file), "label": label, "score": score}
#         results.append(result)

#     return results

# Định nghĩa API để kiểm tra hàm inference_voting_classifier
@app.route('/inference', methods=['POST'])
def inference():
    data = request.get_json()
    model_path = data['model_path']
    sample_path = data['sample_path']
    # results = inference_voting_classifier(model_path, sample_path)

    return jsonify(data) 
    # return jsonify("Hoang Nam") 

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=6777) 
    app.run(host='0.0.0.0',port=6777)  
  