from fastapi import FastAPI, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from metadata import metadata

templates = Jinja2Templates(directory="templates")

app = FastAPI()

app.add_middleware(GZipMiddleware)
app.mount("/styles", StaticFiles(directory="styles"), name="styles")
app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")
app.mount("/audio", StaticFiles(directory="audio"), name="audio")


@app.get("/")
def read_root(request: Request):
    albums = [
        "clicking-around",
        "fall-17",
        "ignored",
        "propiedades",
        "protestant-reformation",
        "ventana",
        "worm",
    ]
    return templates.TemplateResponse(
        request=request, name="index.html", context={"albums": albums}
    )


@app.get("/about")
def read_about(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="about.html",
    )


@app.get("/music/{album}")
def read_music(request: Request, album: str):
    return templates.TemplateResponse(
        request=request, name="album.html", context={**metadata[album]}
    )


@app.get("/visual")
def read_visual(request: Request):
    return templates.TemplateResponse(request=request, name="visual.html")
