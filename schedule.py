import os
from time import sleep
import subprocess

import sys

while True:
    # os.system('python process.py')
    p = subprocess.Popen([sys.executable, 'process.py'])
    p.wait()
    sleep(3)
