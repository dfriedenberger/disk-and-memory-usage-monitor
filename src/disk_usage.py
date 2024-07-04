import subprocess


def get_disk_usage():
    path = '/host/root'
    result = subprocess.run(['df', '-h', path], capture_output=True, text=True, check=True)
    lines = result.stdout.split('\n')
    for line in lines:
        print(line)
        
        if line.lower().startswith("filesystem"):
            continue

        # D:/Stuff/Tools/Git  229G  178G   51G  78% /
        #total 229G used 178G available 51G percent 78% mounted /

        parts = line.split()
        total = parts[1]
        used = parts[2]
        available = parts[3]
        percent = parts[4]
        mounted = parts[5]
        if mounted == path:
            return {"total": total, "used": used, "available": available, "percent": percent}
    return None
