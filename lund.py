import pyautogui
import time

try:
    import pygetwindow as gw
except ImportError:
    print("Installing required module...")
    import os
    os.system("pip install pygetwindow")
    import pygetwindow as gw

# Scroll settings
SCROLL_AMOUNT = -50
DELAY = 2

print("Starting in 5 seconds...")
time.sleep(5)

print("Auto-scroll started (Chrome only)... Press Ctrl+C to stop.")

try:
    while True:
        # Get active window
        active_window = gw.getActiveWindow()

        if active_window and "Chrome" in active_window.title:
            pyautogui.scroll(SCROLL_AMOUNT)

        time.sleep(DELAY)

except KeyboardInterrupt:
    print("Stopped.")