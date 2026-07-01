import re

with open(r'd:\Software\CareerBridge\CareerBridgeSolution\frontend\src\views\CareerAssessment.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_css = '.career-assessment-wrapper {\n'

root_match = re.search(r':root\s*\{([^\}]+)\}', css)
if root_match:
    new_css += root_match.group(1) + '\n'

css = re.sub(r':root\s*\{[^\}]+\}', '', css)

dark_match = re.search(r'\[data-theme="dark"\]\s*\{([^\}]+)\}', css)
if dark_match:
    css = re.sub(r'\[data-theme="dark"\]\s*\{[^\}]+\}', '', css)

css = re.sub(r'\*\s*\{[^\}]+\}', '', css)
css = re.sub(r'html\s*\{[^\}]+\}', '', css)
css = re.sub(r'body\s*\{([^\}]+)\}', r'\1', css)

new_css += css + '\n}\n'

if dark_match:
    new_css += '\n[data-theme="dark"] .career-assessment-wrapper {\n' + dark_match.group(1) + '\n}\n'

with open(r'd:\Software\CareerBridge\CareerBridgeSolution\frontend\src\views\CareerAssessment.css', 'w', encoding='utf-8') as f:
    f.write(new_css)
print('Scoped CareerAssessment.css successfully!')
