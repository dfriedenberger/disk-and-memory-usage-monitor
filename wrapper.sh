#!/bin/bash

# Start the processes

uvicorn main:app --host 0.0.0.0 --port 8000  &

python tasks.py &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?