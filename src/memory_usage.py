

def get_memory_usage():
    path = 'tmp/meminfo'  # '/host/proc/meminfo'
    with open(path, 'r', encoding='UTF-8') as file:
        lines = file.readlines()
        meminfo = {}
        for line in lines:
            parts = line.split(':')
            key = parts[0].strip()
            value = parts[1].strip().split()[0]
            meminfo[key] = int(value)
        
        total_memory = meminfo.get('MemTotal', 0) // 1024  # in MB
        available_memory = meminfo.get('MemAvailable', 0) // 1024  # in MB
        used_memory = total_memory - available_memory
        percent_used = (used_memory / total_memory) * 100
        
        return {
            "total_memory": total_memory,
            "used_memory": used_memory,
            "available_memory": available_memory,
            "percent_used": percent_used
        }
