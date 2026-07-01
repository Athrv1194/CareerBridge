import re

with open(r'd:\Software\CareerBridge\career-assessment-script.js', 'r', encoding='utf-8') as f:
    js = f.read()

matches = re.findall(r'<div class="action-bar">(.*?)</div>', js, re.DOTALL)
if matches:
    print('Action bar JS HTML:\n', matches[0])
else:
    print('action-bar not found in JS')
