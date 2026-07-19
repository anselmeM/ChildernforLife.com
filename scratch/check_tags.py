import re

with open("c:/Users/amotc/Documents/GitHub/repos/ChildernforLife.com/src/App.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Let's extract lines 78 to 260
nav_lines = lines[77:255]

tags = []
for idx, line in enumerate(nav_lines, start=78):
    # simple regex to find tag openings and closings
    # ignoring self closing tags like <img ... /> or <path ... /> or <circle ... /> or <line ... /> or <Heart ... />
    # and ignoring JSX expressions
    # Let's find matches for:
    # 1) </tagname>
    # 2) <tagname ...> (excluding self-closing)
    
    # We will clean the line of comments
    line = re.sub(r'{\s*/\*.*?\*/\s*}', '', line)
    line = re.sub(r'//.*', '', line)
    
    # Find all tag tokens
    tokens = re.findall(r'</?([a-zA-Z0-9:-]+)|/>', line)
    for token in tokens:
        if not token:
            continue
        # Check if it is a closing tag
        is_closing = False
        match_idx = line.find(token)
        if match_idx > 0 and line[match_idx - 1] == '/':
            is_closing = True
        
        # If it is self-closing like circle, path, line, Heart, svg, etc.
        # we can ignore standard self-closing tags
        if token.lower() in ['path', 'circle', 'line', 'heart', 'img', 'br', 'hr', 'input']:
            continue
            
        if is_closing:
            if tags and tags[-1][0] == token:
                tags.pop()
            else:
                print(f"Mismatch: Closing </{token}> at line {idx} does not match open tags: {[t[0] for t in tags]}")
                tags.append((token, idx, "closing"))
        else:
            # check if it's self-closing on the same line
            # e.g. <Heart ... />
            # we'll assume it's opening for now
            tags.append((token, idx, "opening"))

print("Remaining open tags:")
for tag in tags:
    print(f"<{tag[0]}> opened at line {tag[1]}")
