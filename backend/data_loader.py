import csv
import os
from collections import Counter

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "boss_data_analyst.csv")

def load_data():
    """加载CSV数据并返回字典列表"""
    rows = []
    with open(DATA_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            row["salary_low"] = int(row["salary_low"])
            row["salary_high"] = int(row["salary_high"])
            row["salary_mid"] = (row["salary_low"] + row["salary_high"]) / 2
            rows.append(row)
    return rows


def get_summary_stats(data):
    """获取总体统计数据"""
    total = len(data)
    avg_salary = round(sum(r["salary_mid"] for r in data) / total)
    max_salary = max(r["salary_high"] for r in data)
    min_salary = min(r["salary_low"] for r in data)
    cities = len(set(r["city"] for r in data))
    companies = len(set(r["company_name"] for r in data))
    return {
        "total_jobs": total,
        "avg_salary": avg_salary,
        "max_salary": max_salary,
        "min_salary": min_salary,
        "city_count": cities,
        "company_count": companies,
    }

def analyze_by_city(data):
    """按城市分组分析"""
    city_map = {}
    for row in data:
        city = row["city"]
        if city not in city_map:
            city_map[city] = {"count": 0, "total_mid": 0}
        city_map[city]["count"] += 1
        city_map[city]["total_mid"] += row["salary_mid"]
    result = []
    for city, info in sorted(city_map.items(), key=lambda x: -x[1]["count"]):
        result.append({
            "city": city,
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result

def analyze_by_industry(data):
    """按行业分组分析"""
    ind_map = {}
    for row in data:
        ind = row["industry"]
        if ind not in ind_map:
            ind_map[ind] = {"count": 0, "total_mid": 0}
        ind_map[ind]["count"] += 1
        ind_map[ind]["total_mid"] += row["salary_mid"]
    result = []
    for ind, info in sorted(ind_map.items(), key=lambda x: -x[1]["count"]):
        result.append({
            "industry": ind,
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result

def analyze_by_salary_level(data):
    """按薪资等级分布分析"""
    level_map = {}
    total = len(data)
    for row in data:
        level = row["salary_level"]
        level_map[level] = level_map.get(level, 0) + 1
    result = []
    for level, count in sorted(level_map.items(), key=lambda x: -x[1]):
        result.append({
            "level": level,
            "count": count,
            "percentage": round(count * 100.0 / total, 2),
        })
    return result

def analyze_by_education(data):
    """按学历要求分析"""
    edu_map = {}
    for row in data:
        edu = row["education"]
        if edu not in edu_map:
            edu_map[edu] = {"count": 0, "total_mid": 0}
        edu_map[edu]["count"] += 1
        edu_map[edu]["total_mid"] += row["salary_mid"]
    result = []
    for edu, info in sorted(edu_map.items(), key=lambda x: -x[1]["count"]):
        result.append({
            "education": edu,
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result

def analyze_by_experience(data):
    """按经验要求分析"""
    exp_map = {}
    for row in data:
        exp = row["experience"]
        if exp not in exp_map:
            exp_map[exp] = {"count": 0, "total_mid": 0}
        exp_map[exp]["count"] += 1
        exp_map[exp]["total_mid"] += row["salary_mid"]
    result = []
    for exp, info in sorted(exp_map.items(), key=lambda x: -x[1]["count"]):
        result.append({
            "experience": exp,
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result

def analyze_skills(data):
    """技能词频分析"""
    counter = Counter()
    for row in data:
        skills = row["required_skills"].split("|")
        for skill in skills:
            skill = skill.strip()
            if skill:
                counter[skill] += 1
    result = [{"skill": s, "count": c} for s, c in counter.most_common(20)]
    return result

def analyze_skills_high_salary(data):
    """高薪岗位(25K+)技能分析"""
    counter = Counter()
    for row in data:
        if row["salary_high"] >= 25000:
            skills = row["required_skills"].split("|")
            for skill in skills:
                skill = skill.strip()
                if skill:
                    counter[skill] += 1
    result = [{"skill": s, "count": c} for s, c in counter.most_common(15)]
    return result

def analyze_by_company_size(data):
    """按公司规模分析"""
    size_map = {}
    for row in data:
        size = row["company_size"]
        if size not in size_map:
            size_map[size] = {"count": 0, "total_mid": 0}
        size_map[size]["count"] += 1
        size_map[size]["total_mid"] += row["salary_mid"]
    result = []
    for size, info in sorted(size_map.items(), key=lambda x: -x[1]["count"]):
        result.append({
            "company_size": size,
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result

def analyze_headhunter(data):
    """猎头 vs 非猎头分析"""
    hh_map = {}
    for row in data:
        hh = row["is_headhunter"]
        if hh not in hh_map:
            hh_map[hh] = {"count": 0, "total_mid": 0}
        hh_map[hh]["count"] += 1
        hh_map[hh]["total_mid"] += row["salary_mid"]
    result = []
    for hh, info in hh_map.items():
        result.append({
            "is_headhunter": "猎头岗位" if hh == "是" else "非猎头岗位",
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result

def analyze_by_company_size(data):
    """按公司规模分析"""
    size_map = {}
    for row in data:
        size = row["company_size"]
        if size not in size_map:
            size_map[size] = {"count": 0, "total_mid": 0}
        size_map[size]["count"] += 1
        size_map[size]["total_mid"] += row["salary_mid"]
    result = []
    for size, info in sorted(size_map.items(), key=lambda x: -x[1]["count"]):
        result.append({
            "company_size": size,
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result

def analyze_headhunter(data):
    """猎头 vs 非猎头分析"""
    hh_map = {}
    for row in data:
        hh = row["is_headhunter"]
        if hh not in hh_map:
            hh_map[hh] = {"count": 0, "total_mid": 0}
        hh_map[hh]["count"] += 1
        hh_map[hh]["total_mid"] += row["salary_mid"]
    result = []
    for hh, info in hh_map.items():
        result.append({
            "is_headhunter": "猎头岗位" if hh == "是" else "非猎头岗位",
            "count": info["count"],
            "avg_salary": round(info["total_mid"] / info["count"]),
        })
    return result
def analyze_monthly_trend(data):
    """月度发布趋势"""
    month_map = {}
    for row in data:
        month = row["publish_date"][:7]
        month_map[month] = month_map.get(month, 0) + 1
    result = [{"month": m, "count": c} for m, c in sorted(month_map.items())]
    return result