from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from markdown_it import MarkdownIt
from markupsafe import Markup

from metadata import metadata

md = MarkdownIt()


templates = Jinja2Templates(directory="templates")

app = FastAPI()

app.add_middleware(GZipMiddleware)
app.mount("/styles", StaticFiles(directory="styles"), name="styles")
app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")
app.mount("/audio", StaticFiles(directory="audio"), name="audio")


@app.get("/")
def read_root(request: Request):
    solo_albums = [
        "clicking-around",
        "fall-17",
        "ignored",
        "propiedades",
        "protestant-reformation",
        "ventana",
        "worm",
    ]

    collab_albums = ["joebowman", "mptl", "warmly", "bac", "mud"]
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"solo_albums": solo_albums, "collab_albums": collab_albums},
    )


@app.get("/about")
def read_about(request: Request):
    file_path = Path("markdown/about.md")
    raw_text = file_path.read_text(encoding="utf-8")
    html = md.render(raw_text)
    return templates.TemplateResponse(
        request=request, name="about.html", context={"content": Markup(html)}
    )


@app.get("/music/{album}")
def read_music(request: Request, album: str):
    return templates.TemplateResponse(
        request=request, name="album.html", context={**metadata[album]}
    )


@app.get("/visual")
def read_visual(request: Request):
    projects = ["gone", "nh", "merriweather", "itr", "dt"]
    return templates.TemplateResponse(
        request=request, name="visual.html", context={"projects": projects}
    )
