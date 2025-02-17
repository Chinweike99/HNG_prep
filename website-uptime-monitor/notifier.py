import datetime


def notify(status, url, reason=""):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H: %M:%S")
    print(f"[{timestamp} {url} is {status} {reason}]")