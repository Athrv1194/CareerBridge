import re
with open(r'd:\Software\CareerBridge\career-assessment-script.js', 'r', encoding='utf-8') as f:
    js = f.read()

matches = re.findall(r'<div class="action-bar">(.*?)</div>', js, re.DOTALL)
if matches:
    with open('action_bar.txt', 'w', encoding='utf-8') as fw:
        fw.write(matches[0])
