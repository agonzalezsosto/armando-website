from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from markdown_it import MarkdownIt
from markupsafe import Markup

from db import projects

md = MarkdownIt()


templates = Jinja2Templates(directory="templates")

app = FastAPI()

app.add_middleware(GZipMiddleware)
app.mount("/styles", StaticFiles(directory="styles"), name="styles")
app.mount("/assets", StaticFiles(directory="assets"), name="assets")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")


@app.get("/")
def read_root(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html", context={"projects": projects}
    )


@app.get("/about")
def read_about(request: Request):
    file_path = Path("markdown/about.md")
    raw_text = file_path.read_text(encoding="utf-8")
    html = md.render(raw_text)
    return templates.TemplateResponse(
        request=request, name="about.html", context={"content": Markup(html)}
    )


@app.get("/maze")
def read_maze(request: Request):
    return templates.TemplateResponse(request=request, name="maze.html")


@app.get("/{name}")
def read_name(request: Request, name: str):
    project = projects.get(name)

    try:
        match project:
            case {"type": "album"}:
                if about := project.get("about-file"):
                    file_path = Path(f"assets/text/{about}")
                    raw_text = file_path.read_text(encoding="utf-8")
                    html = md.render(raw_text)

                    project["about"] = Markup(html)

                return templates.TemplateResponse(
                    request=request,
                    name="album.html",
                    context={**project},
                )
            case {"type": "article"}:
                file_path = Path(f"assets/text/{project.get('article-name')}")
                raw_text = file_path.read_text(encoding="utf-8")
                html = md.render(raw_text)

                return templates.TemplateResponse(
                    request=request,
                    name="article.html",
                    context={"content": Markup(html)},
                )
    except KeyError:
        return
