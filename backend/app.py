import os
from flask import Flask, send_from_directory,jsonify
import sys


sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from backend.data_loader import (load_data,
                                 get_summary_stats,
                                 analyze_by_city,
                                 analyze_by_industry,
                                 analyze_by_salary_level,
                                 analyze_by_education,
                                 analyze_by_experience,
                                 analyze_skills,
                                 analyze_skills_high_salary,
                                 analyze_by_company_size,
                                 analyze_headhunter,
                                 analyze_monthly_trend
                                 )



app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), "..", "frontend"),
    static_url_path="",
)


# 全局数据缓存
_data = None

def get_data():
    global _data
    if _data is None:
        print("Loading data from CSV...")
        _data = load_data()
        print(f"Loaded {len(_data)} job records")
    return _data


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/css/<path:filename>")
def serve_css(filename):
    return send_from_directory(os.path.join(app.static_folder, "css"), filename)


@app.route("/js/<path:filename>")
def serve_js(filename):
    return send_from_directory(os.path.join(app.static_folder, "js"), filename)

@app.route("/api/summary")
def api_summary():
    data = get_data()
    return jsonify(get_summary_stats(data))

@app.route("/api/city")
def api_city():
    data = get_data()
    return jsonify(analyze_by_city(data))

@app.route("/api/industry")
def api_industry():
    data = get_data()
    return jsonify(analyze_by_industry(data))

@app.route("/api/salary_level")
def api_salary_level():
    data = get_data()
    return jsonify(analyze_by_salary_level(data))


@app.route("/api/education")
def api_education():
    data = get_data()
    return jsonify(analyze_by_education(data))

@app.route("/api/experience")
def api_experience():
    data = get_data()
    return jsonify(analyze_by_experience(data))

@app.route("/api/skills")
def api_skills():
    data = get_data()
    return jsonify(analyze_skills(data))

@app.route("/api/skills_high_salary")
def api_skills_high_salary():
    data = get_data()
    return jsonify(analyze_skills_high_salary(data))

@app.route("/api/company_size")
def api_company_size():
    data = get_data()
    return jsonify(analyze_by_company_size(data))

@app.route("/api/headhunter")
def api_headhunter():
    data = get_data()
    return jsonify(analyze_headhunter(data))

@app.route("/api/monthly_trend")
def api_monthly_trend():
    data = get_data()
    return jsonify(analyze_monthly_trend(data))

@app.route("/api/conclusion")
def api_all():
    data = get_data()
    return jsonify({
        "summary": get_summary_stats(data),
        "city": analyze_by_city(data),
        "industry": analyze_by_industry(data),
        "salary_level": analyze_by_salary_level(data),
        "skills": analyze_skills(data),
    })





if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)