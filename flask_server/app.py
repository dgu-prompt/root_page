import os
import yaml
from flask import redirect
from flask import Flask, send_from_directory
from flask import Flask, request, jsonify

app = Flask(__name__, static_folder='../react_client')
app.config['UPLOAD_F OLDER'] = os.path.join(os.path.dirname(__file__), 'static')



# 정적 폴더 초기화 함수
def clear_static_folder():
    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.isfile(file_path):
            os.remove(file_path)


@app.route('/')
def serve_react():
    return send_from_directory('../react_client', 'index.html')


@app.route('/api/yaml', methods=['POST'])
def save_yaml():
    clear_static_folder()

    yaml_text = request.get_data(as_text=True)
    
    # YAML 데이터를 Python 객체로 변환
    try:
        yaml_data = yaml.safe_load(yaml_text)
    except yaml.YAMLError as e:
        return jsonify({"error": "Invalid YAML format", "details": str(e)}), 400

    # YAML 데이터를 임시 파일에 저장
    temp_yaml_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp.yaml')
    with open(temp_yaml_path, 'w') as file:
        yaml.dump(yaml_data, file)

    # 파일을 elastalert 디렉토리로 이동 및 config.yaml로 저장
    #target_path = '/home/elastalert/config.yaml'
    #로컬 실험
    target_path = '/static_yaml/config.yaml'
    os.replace(temp_yaml_path, target_path)

    # 저장 완료 후 메인 페이지로 리디렉션
    return redirect('/')


if __name__ == '__main__':
    # 정적 폴더가 없을 시 생성
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, port=5000)