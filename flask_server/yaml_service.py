import os
import shutil
import uuid
import yaml

BASE_PATH = os.path.dirname(__file__)
DEFAULT_PATHS = {
    "jira": os.path.join(BASE_PATH, "default", "jira_default.yaml"),
    "slack": os.path.join(BASE_PATH, "default", "slack_default.yaml"),
}


def count_yaml_files(alert_types):
    regions_data = {}
    all_yaml_files = []

    try:
        for alert_type in alert_types:
            alert_type_path = os.path.join(BASE_PATH, alert_type)
            if os.path.isdir(alert_type_path):
                yaml_files = [os.path.join(alert_type_path, f) for f in os.listdir(alert_type_path) if f.endswith('.yaml')]
                all_yaml_files.extend(yaml_files)

        for yaml_path in all_yaml_files:
            try:
                with open(yaml_path, 'r', encoding='utf-8') as file:
                    yaml_content = yaml.safe_load(file)
                region = yaml_content.get("region", "Unknown Region")
                regions_data.setdefault(region, {"region": region, "count": 0, "yamlName": []})
                name = yaml_content.get('name', 'Unknown Rule Name')
                description = yaml_content.get('description', 'No description available')
                regions_data[region]["yamlName"].append({
                    "name": name,
                    "description": description
                })
                regions_data[region]["count"] += 1
            except Exception as e:
                print(f"Error processing file {yaml_path}: {str(e)}")

        return list(regions_data.values()), 200
    except Exception as e:
        return {"error": f"Failed to process YAML files: {str(e)}"}, 500


def add_rule_yaml(alert_type, region):
    if alert_type not in DEFAULT_PATHS:
        return {"error": "Invalid alertType"}, 400
    if not region:
        return {"error": "Region is required"}, 400

    source_file = DEFAULT_PATHS[alert_type]
    if not os.path.exists(source_file):
        return {"error": "Default file not found"}, 404

    destination_dir = os.path.join(BASE_PATH, alert_type)
    os.makedirs(destination_dir, exist_ok=True)
    unique_filename = f"{uuid.uuid4()}.yaml"
    destination_file = os.path.join(destination_dir, unique_filename)

    shutil.copyfile(source_file, destination_file)
    return {"message": "YAML file successfully created", "fileId": unique_filename}, 200


def delete_yaml_file(alert_type, file_id):
    file_name = f"{file_id}.yaml"
    target_path = os.path.join(BASE_PATH, alert_type, file_name)

    if not os.path.exists(target_path):
        return {"error": "File not found"}, 404

    os.remove(target_path)
    return {"message": f"File {file_name} deleted successfully"}, 200
