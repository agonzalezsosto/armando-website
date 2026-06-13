import shutil
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

from db.projects import projects

env = Environment(loader=FileSystemLoader("templates/"))

filepath = Path(".rendered-site")
filepath.mkdir(parents=True, exist_ok=True)

shutil.copytree("scripts/", ".rendered-site/scripts/", dirs_exist_ok=True)
shutil.copytree("assets/", ".rendered-site/assets/", dirs_exist_ok=True)
shutil.copytree("styles/", ".rendered-site/styles/", dirs_exist_ok=True)

template = env.get_template("index.html")
result = template.render(projects=projects)

(filepath / "index.html").write_text(result)
