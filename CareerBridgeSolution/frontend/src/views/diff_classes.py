import re

with open(r'd:\Software\CareerBridge\career-assessment.html', 'r', encoding='utf-8') as f:
    html = f.read()

match = re.search(r'<main class="main-wrap">(.*?)</main>', html, re.DOTALL)
if match:
    main_html = match.group(1)
    
    classes_in_html = set(re.findall(r'class="([^"]+)"', main_html))
    
    with open(r'd:\Software\CareerBridge\CareerBridgeSolution\frontend\src\views\CareerAssessment.jsx', 'r', encoding='utf-8') as f:
        jsx = f.read()
    
    classes_in_jsx = set(re.findall(r'className="([^"]+)"', jsx))
    
    html_classes = set()
    for c in classes_in_html:
        for p in c.split(): html_classes.add(p)
        
    jsx_classes = set()
    for c in classes_in_jsx:
        for p in c.split(): jsx_classes.add(p)
        
    diff = jsx_classes - html_classes
    print('Result:', diff)
