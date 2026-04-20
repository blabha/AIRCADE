import json

def esc(s):
    return s.replace("'", "\\'")

content = open('data.js', encoding='utf-8').read()
start = content.index('const QUESTIONS_DB = [')
arr_start = content.index('[', start) + 1
arr_end = content.index('];', arr_start) + 2

db = json.load(open('questions-database.json', encoding='utf-8'))
lines = []
for q in db['questions']:
    ans = q['answers']
    lines.append("  { id:%d, category:'%s', ageGroup:'%s'," % (q['id'], q['category'], q['age_group']))
    lines.append("    question:'%s'," % esc(q['question']))
    for letter in ['A', 'B', 'C']:
        a = ans[letter]
        lines.append("    %s: { text:'%s', energy_wh:%s, water_ml:%s, co2_g:%s, mindfulness:%s, why:'%s' }," % (
            letter, esc(a['text']), a['energy_wh'], a['water_ml'], a['co2_g'], a['mindfulness'], esc(a['why'])
        ))
    lines.append("  },")

new_arr_content = '\n' + '\n'.join(lines) + '\n'
# arr_end points past ]; so content[arr_end-1] is ';' and content[arr_end-2] is ']'
# We keep everything before arr_start, insert new content, then keep from the closing ] onward
new_content = content[:arr_start] + new_arr_content + content[arr_end - 2:]
open('data.js', 'w', encoding='utf-8').write(new_content)
print('Done. data.js is now', len(new_content), 'chars,', new_content.count('\n'), 'lines')
