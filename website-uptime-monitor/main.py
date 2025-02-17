import requests
import schedule
import time
from config import WEBSITES, CHECK_INTERVAL
from notifier import notify

def ping_website(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            notify("UP✅", url)
        else:
            notify("DOWN ❌", url, f"(status:{response.status_code})")
        except requests.RequestException as e:
            notify("DOWN ❌", url, f"(Error:{str(e)})")
        
    def monitor_website(website):
        for websites in WEBSITES:
            ping_website(website)

    #Schedule to run at intervals
    schedule.every(CHECK_INTERVAL).minutes.do(monitor_website)
    print("Website Uptime Monitor Started")

    while True:
        schedule.run_pending()
        time.sleep(1)