
from typing import List, Dict
from flask import Flask, jsonify, request
from flask_cors import CORS
import email
import re
import nltk
import pandas as pd
import chardet
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__) 
CORS(app)
# Hàm nhận đầu vào là đường dẫn đến file eml và trả về một danh sách các giá trị đặc trưng
def extract_features(eml_path):

  # Đọc file eml và tạo một đối tượng email
  with open(eml_path, "rb") as f:
    raw_data = f.read()
    result = chardet.detect(raw_data)
    encoding = result["encoding"]

# Đọc file eml với encoding phù hợp và tạo một đối tượng email
  with open(eml_path, "r", encoding=encoding) as f:
    msg = email.message_from_file(f)

  # Lấy các thông tin cơ bản từ email
  sender = msg["From"]
  receiver = msg["To"]
  subject = msg["Subject"]
  date = msg["Date"]

  # Lấy nội dung của email
  content = ""
  for part in msg.walk():
    if part.get_content_type() == "text/plain":
      content += part.get_payload()

  # Xóa các ký tự không cần thiết
  content = content.replace("\n", " ").replace("\r", " ").replace("\t", " ")

  # Tạo một danh sách các từ khóa nhạy cảm
  sensitive_words = ["urgent", "important", "alert", "notice", "warning", "account", "verify", "confirm", "password", "security", "click", "link"]

  # Tính toán các đặc trưng từ email
  length = len(content) # Độ dài của email
  special_char = len(re.findall("[^a-zA-Z0-9\s]", content)) # Số lượng ký tự đặc biệt
  upper_case = len(re.findall("[A-Z]", content)) # Số lượng từ viết hoa
  abbreviation = len(re.findall("\w+\.", content)) # Số lượng từ viết tắt
  link = len(re.findall("http[s]?://\S+", content)) # Số lượng liên kết
  image = len(msg.get_payload()) - 1 if msg.is_multipart() else 0 # Số lượng hình ảnh
  attachment = len(msg.get_payload()) - image -1 if msg.is_multipart() else 0 # Số lượng tệp đính kèm
  sensitive_word = sum([1 for word in nltk.word_tokenize(content) if word.lower() in sensitive_words]) # Số lượng từ khóa nhạy cảm

  # Thêm các đặc trưng mới vào danh sách các giá trị đặc trưng
  words = nltk.word_tokenize(content) # Danh sách các từ trong email
  word_count = len(words) # Số lượng từ trong email
  num_word = len(re.findall("\w+\d+\w+", content)) # Số lượng từ có chứa số
  special_word = len(re.findall("\w+[^a-zA-Z0-9\s]+\w+", content)) # Số lượng từ có chứa ký tự đặc biệt
  upper_word = len(re.findall("[A-Z]\w+", content)) # Số lượng từ có chứa ký tự viết hoa
  abbrev_word = len(re.findall("[A-Z]+\.", content)) # Số lượng từ có chứa ký tự viết tắt
  hyphen_word = len(re.findall("\w+-\w+", content)) # Số lượng từ có chứa dấu gạch ngang
  underscore_word = len(re.findall("\w+_\w+", content)) # Số lượng từ có chứa dấu gạch dưới
  dot_word = len(re.findall("\w+\.\w+", content)) # Số lượng từ có chứa dấu chấm

  # Trả về một danh sách các giá trị đặc trưng
  return [length, special_char, upper_case, abbreviation, link, image, attachment, sensitive_word, word_count, num_word, special_word, upper_word, abbrev_word, hyphen_word, underscore_word, dot_word]

# Hàm nhận đầu vào là đường dẫn đến file eml và trả về nhãn dự đoán
def inference(eml_path):

  # Load mô hình đã được huấn luyện từ file voting_model.pkl
  model = joblib.load("voting_model.pkl")

  # Trích xuất các đặc trưng từ file eml
  features = extract_features(eml_path)

  # Chuyển đổi các đặc trưng thành một dataframe
  features_df = pd.DataFrame([features])

  # Dự đoán nhãn của email bằng mô hình đã được huấn luyện
  label = model.predict(features_df)

  # Trả về nhãn dự đoán
  return label.tolist()

#test= inference('C:/Users/hahah/Documents/NCKH/2023/của Phương/hahahaphuong04/Inbox/message-1-3267.eml')
#print(test)

# Định nghĩa API để kiểm tra hàm inference_voting_classifier
@app.route('/inference', methods=['POST'])
def CheckEmail():
    data = request.get_json()
    # if data['type'] == 'model1':
    #    print('model1')
    #    return jsonify('model1')
    # if data['type'] == 'model2':
    #    print('model2')
    #    return jsonify('model1')
    # if data['type'] == 'model3':
    #    print('model3')
    #    return jsonify('model3')
    # print(data)
    results = inference('./email.eml')
    # return jsonify(results) 
    return jsonify(results[0])
  
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=6777) 
    app.run(host='0.0.0.0',port=6777)  
  