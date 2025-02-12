# from fastapi import FastAPI

# # Create an instance of the FastAPI class
# app = FastAPI()

# # Define a route using a decorator
# @app.get("/")
# def read_root():
#     return {"message": "Hello, World!"}

from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}