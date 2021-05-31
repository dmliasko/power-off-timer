import os
import sys
import platform
import webview
from threading import Timer

SHUTDOWN = 'shutdown'
SLEEP = 'sleep'
RESTART = 'restart'

WINDOWS = 'Windows'
LINUX = 'Linux'
MAC = 'Darwin'

UNKNOWN_PLATFORM_MESSAGE = "Unknown platform"

class Api():

    def __init__(self):
        self.timer = None

    def setTimer(self, seconds, operation):
        int_seconds = int(seconds)

        if operation == SHUTDOWN:
            self.timer = Timer(int_seconds, send_shutdown_command)
        elif operation == SLEEP:
            self.timer = Timer(int_seconds, send_sleep_command)
        elif operation == RESTART:
            self.timer = Timer(int_seconds, send_restart_command)
        else:
            sys.exit(UNKNOWN_PLATFORM_MESSAGE)
        
        self.timer.start()
        

    def cancelTimer(self):
        self.timer.cancel()

def send_shutdown_command():
    platform_name = platform.system()

    if platform_name == WINDOWS:
        os.system("shutdown /s /f")
    elif platform_name == LINUX or platform_name == MAC:
        os.system("shutdown -h now")
    else:
        sys.exit(UNKNOWN_PLATFORM_MESSAGE)

def send_sleep_command():
    platform_name = platform.system()

    if platform_name == WINDOWS:
        os.system("shutdown /h /f")
    elif platform_name == LINUX:
        os.system("systemctl suspend")
    elif platform_name == MAC:
        os.system("pmset sleepnow")
    else:
        sys.exit(UNKNOWN_PLATFORM_MESSAGE)

def send_restart_command():
    platform_name = platform.system()

    if platform_name == WINDOWS:
        os.system("shutdown /r /f")
    elif platform_name == LINUX:
        os.system("reboot")
    elif platform_name == MAC:
        os.system("sudo shutdown -r now")
    else:
        sys.exit(UNKNOWN_PLATFORM_MESSAGE)


if __name__ == "__main__":
    api = Api()
    webview.create_window('Power off Timer', 'assets/index.html', js_api=api, width=475, height=350, resizable=False)
    webview.start()