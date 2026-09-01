(function(){

    // ── 工具函数 ────────────
    function fmt(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    function setHtml(id, html) {
        var el = document.getElementById(id);
        if (el) {
            el.innerHTML = html;
        }
    }
    
    async function fetchJson(p) {
        var r = await fetch('/api/' + p);
        return r.json();
    }
    
    async function renderMermaid(id, def) {
        var el = document.getElementById(id);
        if (!el) return;
        try {
            var r = await mermaid.render('m_' + id, def);
            el.innerHTML = r.svg;
        } catch (e) {
            el.innerHTML = '<p style="color:#cc">Rendering...</p>';
        }
    }
    
    // ── KPI 总览 ────────────────
    async function loadSummary() {
        var d = await fetchJson('summary');
        var cards = [
            {v: fmt(d.total_jobs), l: '招聘总数'},
            {v: fmt(d.avg_salary), l: '平均薪资'},
            {v: fmt(d.max_salary), l: '最高薪资'},
            {v: d.city_count, l: '覆盖城市'},
            {v: d.company_count, l: '招聘企业'},
            {v: fmt(d.min_salary), l: '最低薪资'}
        ];
        setHtml('summary-cards', cards.map(function(c) {
            return '<div class="stat-card">' +
                   '<div class="value">' + c.v + '</div>' +
                   '<div class="label">' + c.l + '</div>' +
                   '</div>';
        }).join(''));
    }
    async function loadCity() {
        var city = await fetchJson('city');
        var top10 = city.slice(0, 10);
    
        // 各城市岗位数量分布
        var barDef = 'xychart-beta\n  x-axis [' +
            top10.map(function(c) { return '"' + c.city + '"'; }).join(', ') +
            ']\n  y-axis "Count" 0 --> ' +
            (top10[0].count + 5) +
            '\n  bar [' +
            top10.map(function(c) { return c.count; }).join(', ') +
            ']';
        renderMermaid('chart-city-bar', barDef);
    
        // 各城市平均薪资对比
        var maxSal = Math.max.apply(null, top10.map(function(c) { return c.avg_salary; }));
        var salDef = 'xychart-beta\n  x-axis [' +
            top10.map(function(c) { return '"' + c.city + '"'; }).join(', ') +
            ']\n  y-axis "Salary" 0 --> ' +
            (maxSal + 2000) +
            '\n  bar [' +
            top10.map(function(c) { return c.avg_salary; }).join(', ') +
            ']';
        renderMermaid('chart-city-salary', salDef);
    }

    async function loadIndustry() {
        var ind = await fetchJson('industry');
    
        // 行业分布饼图
        var pieDef = 'pie\n' +
            ind.map(function(i) {
                return '  "' + i.industry + '" : ' + i.count;
            }).join('\n');
        renderMermaid('chart-industry-pie', pieDef);
    
        // 行业平均薪资柱状图
        var maxSal = Math.max.apply(null, ind.map(function(i) {
            return i.avg_salary;
        }));
        var barDef = 'xychart-beta\n  x-axis [' +
            ind.map(function(i) { return '"' + i.industry + '"'; }).join(', ') +
            ']\n  y-axis "Salary" 0 --> ' +
            (maxSal + 2000) +
            '\n  bar [' +
            ind.map(function(i) { return i.avg_salary; }).join(', ') +
            ']';
        renderMermaid('chart-industry-salary', barDef);
    }
    
    async function loadSalary() {
        var sal = await fetchJson('salary_level');
    
        // 薪资等级分布饼图
        var pieDef = 'pie\n' +
            sal.map(function(s) {
                return '  "' + s.level + '" : ' + s.count;
            }).join('\n');
        renderMermaid('chart-salary-pie', pieDef);
    
        // 薪资等级占比柱状图
        var barDef = 'xychart-beta\n  x-axis [' +
            sal.map(function(s) { return '"' + s.level + '"'; }).join(', ') +
            ']\n  y-axis "Count" 0 --> ' +
            (sal[0].count + 5) +
            '\n  bar [' +
            sal.map(function(s) { return s.count; }).join(', ') +
            ']';
        renderMermaid('chart-salary-bar', barDef);
    }

    async function loadIndustry() {
        var ind = await fetchJson('industry');
    
        // 行业分布饼图
        var pieDef = 'pie\n' +
            ind.map(function(i) {
                return '  "' + i.industry + '" : ' + i.count;
            }).join('\n');
        renderMermaid('chart-industry-pie', pieDef);
    
        // 行业平均薪资柱状图
        var maxSal = Math.max.apply(null, ind.map(function(i) {
            return i.avg_salary;
        }));
        var barDef = 'xychart-beta\n  x-axis [' +
            ind.map(function(i) { return '"' + i.industry + '"'; }).join(', ') +
            ']\n  y-axis "Salary" 0 --> ' +
            (maxSal + 2000) +
            '\n  bar [' +
            ind.map(function(i) { return i.avg_salary; }).join(', ') +
            ']';
        renderMermaid('chart-industry-salary', barDef);
    }
    
    async function loadSalary() {
        var sal = await fetchJson('salary_level');
    
        // 薪资等级分布饼图
        var pieDef = 'pie\n' +
            sal.map(function(s) {
                return '  "' + s.level + '" : ' + s.count;
            }).join('\n');
        renderMermaid('chart-salary-pie', pieDef);
    
        // 薪资等级占比柱状图
        var barDef = 'xychart-beta\n  x-axis [' +
            sal.map(function(s) { return '"' + s.level + '"'; }).join(', ') +
            ']\n  y-axis "Count" 0 --> ' +
            (sal[0].count + 5) +
            '\n  bar [' +
            sal.map(function(s) { return s.count; }).join(', ') +
            ']';
        renderMermaid('chart-salary-bar', barDef);
    }

    async function loadEducation() {
        var edu = await fetchJson('education');
    
        // 学历要求分布饼图
        var pieDef = 'pie\n' +
            edu.map(function(e) {
                return '  "' + e.education + '" : ' + e.count;
            }).join('\n');
        renderMermaid('chart-edu-pie', pieDef);
    
        // 学历与平均薪资关系柱状图
        var order = ['\u5927\u4E13', '\u672C\u79D1', '\u7855\u58EB', '\u535A\u58EB'];
        var sorted = order.map(function(e) {
            return edu.find(function(x) { return x.education === e; });
        }).filter(Boolean);
        if (!sorted.length) {
            setHtml('chart-edu-salary', '<p style="color:#cc">No data</p>');
            return;
        }
        var mx = Math.max.apply(null, sorted.map(function(x) { return x.avg_salary; }));
        var barDef = 'xychart-beta\n  x-axis [' +
            sorted.map(function(x) { return '"' + x.education + '"'; }).join(', ') +
            ']\n  y-axis "Salary" 0 --> ' + (mx + 2000) +
            '\n  bar [' +
            sorted.map(function(x) { return x.avg_salary; }).join(', ') +
            ']';
        renderMermaid('chart-edu-salary', barDef);
    }
    
    async function loadExperience() {
        var exp = await fetchJson('experience');
    
        // 各经验要求岗位数量柱状图
        var barDef = 'xychart-beta\n  x-axis [' +
            exp.map(function(x) { return '"' + x.experience + '"'; }).join(', ') +
            ']\n  y-axis "Count" 0 --> ' + (exp[0].count + 5) +
            '\n  bar [' +
            exp.map(function(x) { return x.count; }).join(', ') +
            ']';
        renderMermaid('chart-exp-bar', barDef);
    
        // 经验与平均薪资关系柱状图
        var mx = Math.max.apply(null, exp.map(function(x) { return x.avg_salary; }));
        var salDef = 'xychart-beta\n  x-axis [' +
            exp.map(function(x) { return '"' + x.experience + '"'; }).join(', ') +
            ']\n  y-axis "Salary" 0 --> ' + (mx + 2000) +
            '\n  bar [' +
            exp.map(function(x) { return x.avg_salary; }).join(', ') +
            ']';
        renderMermaid('chart-exp-salary', salDef);
    }
    
    async function loadSkills() {
        var skills = await fetchJson('skills');
        var skillsHigh = await fetchJson('skills_high_salary');
    
        // 技能需求词频 TOP15 柱状图
        var t = skills.slice(0, 15);
        var barDef = 'xychart-beta\n  x-axis [' +
            t.map(function(x) { return '"' + x.skill + '"'; }).join(', ') +
            ']\n  y-axis "Count" 0 --> ' + (t[0].count + 5) +
            '\n  bar [' +
            t.map(function(x) { return x.count; }).join(', ') +
            ']';
        renderMermaid('chart-skill-bar', barDef);
    
        // 高薪岗位(25K+)技能需求 TOP15 柱状图
        var th = skillsHigh.slice(0, 15);
        if (!th.length) {
            setHtml('chart-skill-high-bar', '<p style="color:#cc">No data</p>');
            return;
        }
        var highDef = 'xychart-beta\n  x-axis [' +
            th.map(function(x) { return '"' + x.skill + '"'; }).join(', ') +
            ']\n  y-axis "Count" 0 --> ' + (th[0].count + 3) +
            '\n  bar [' +
            th.map(function(x) { return x.count; }).join(', ') +
            ']';
        renderMermaid('chart-skill-high-bar', highDef);
    }
    
    async function loadCompany() {
        var R = await Promise.all([
            fetchJson('company_size'),
            fetchJson('headhunter')
        ]);
        var company = R[0], hh = R[1];
    
        var pieDef = 'pie\n' +
            company.map(function(c) { return '  "' + c.company_size + '" : ' + c.count; }).join('\n');
        renderMermaid('chart-company-pie', pieDef);
    
        var maxSal = Math.max.apply(null, company.map(function(c) { return c.avg_salary; }));
        var barDef = 'xychart-beta\n  x-axis [' +
            company.map(function(c) { return '"' + c.company_size + '"'; }).join(', ') +
            ']\n  y-axis "Salary" 0 --> ' + (maxSal + 2000) +
            '\n  bar [' + company.map(function(c) { return c.avg_salary; }).join(', ') + ']';
        renderMermaid('chart-company-salary', barDef);
    
        var hhPieDef = 'pie\n' +
            hh.map(function(x) { return '  "' + x.is_headhunter + '" : ' + x.count; }).join('\n');
        renderMermaid('chart-hh-pie', hhPieDef);
    
        var hhMax = Math.max.apply(null, hh.map(function(x) { return x.avg_salary; }));
        var hhBarDef = 'xychart-beta\n  x-axis [' +
            hh.map(function(x) { return '"' + x.is_headhunter + '"'; }).join(', ') +
            ']\n  y-axis "Salary" 0 --> ' + (hhMax + 2000) +
            '\n  bar [' + hh.map(function(x) { return x.avg_salary; }).join(', ') + ']';
        renderMermaid('chart-hh-salary', hhBarDef);
    }
    
    async function loadTrend() {
        var trend = await fetchJson('monthly_trend');
        var maxCount = Math.max.apply(null, trend.map(function(t){return t.count;}));
        var lineDef = 'xychart-beta\n  x-axis [' +
            trend.map(function(t){return '"' + t.month + '"';}).join(', ') +
            ']\n  y-axis "Count" 0 --> ' +
            (maxCount + 5) +
            '\n  line [' +
            trend.map(function(t){return t.count;}).join(', ') +
            ']';
        renderMermaid('chart-trend-line', lineDef);
    }

    async function loadConclusion() {

        var a = await fetchJson('conclusion');

        var s = a.summary, tc = a.city[0], ti = a.industry[0], ts = a.skills[0];
        var h = '<h4>1. 市场概况</h4><ul>';
        h += '<li>共收录 <strong>'+fmt(s.total_jobs)+'</strong> 个岗位，覆盖 <strong>'+s.city_count+'</strong> 个城市，<strong>'+s.company_count+'</strong> 家企业。</li>';
        h += '<li>平均薪资: <strong>'+fmt(s.avg_salary)+'</strong> 元/月，范围 '+fmt(s.min_salary)+' - '+fmt(s.max_salary)+' 元</li></ul>';
        h += '<h4>2. 城市分布</h4><ul>';
        h += '<li><strong>'+tc.city+'</strong> 以 '+tc.count+' 个岗位领先。</li></ul>';
        h += '<h4>3. 行业分布</h4><ul>';
        h += '<li><strong>'+ti.industry+'</strong> 行业需求最旺 ('+ti.count+' 个岗位)。</li></ul>';
        h += '<h4>4. 薪资分析</h4><ul>';
        h += '<li>大部分岗位集中在 <strong>'+a.salary_level[0].level+'</strong> 区间 ('+a.salary_level[0].percentage+'%)。</li></ul>';
        h += '<h4>5. 技能需求</h4><ul>';
        h += '<li>最热门技能: <strong>'+ts.skill+'</strong> ('+ts.count+' 次)。</li>';
        h += '<li>高薪岗位重视 Python、机器学习、大数据等技能。</li></ul>';
        h += '<h4>6. 求职建议</h4><ul>';
        h += '<li>掌握 SQL 和 Python 作为核心基础。</li>';
        h += '<li>学习 BI 工具 (Tableau/Power BI)。</li>';
        h += '<li>3-5年经验是薪资增长的关键节点。</li>';
        h += '<li>重点关注互联网/IT 和金融行业。</li></ul>';
        setHtml('conclusion-content', h);
    }

    

    loadSummary(); loadCity();loadIndustry(); loadSalary();loadEducation(); loadExperience(); loadSkills();
    loadCompany();loadTrend();loadConclusion()
    
    })();