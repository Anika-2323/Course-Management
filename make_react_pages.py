from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment
import re
import json

ROOT = Path(__file__).resolve().parent
FRONTEND = ROOT / "frontend"
REACT = ROOT / "react-frontend"
PAGES = REACT / "src" / "pages"
PAGES.mkdir(parents=True, exist_ok=True)

PAGE_NAMES = {
    "index.html": "Home",
    "role.html": "RoleSelect",
    "student-login.html": "StudentLogin",
    "student-register.html": "StudentRegister",
    "student-dashboard.html": "StudentDashboard",
    "my-courses.html": "MyCourses",
    "courses.html": "Courses",
    "course-content.html": "CourseContent",
    "certificate.html": "Certificate",
    "enrollment-success.html": "EnrollmentSuccess",
    "admin-login.html": "AdminLogin",
    "admin-dashboard.html": "AdminDashboard",
    "add-course.html": "AddCourse",
    "edit-course.html": "EditCourse",
    "notifications.html": "Notifications"
}

ROUTES = {
    "index.html": "/",
    "role.html": "/role",
    "student-login.html": "/student-login",
    "student-register.html": "/student-register",
    "student-dashboard.html": "/student-dashboard",
    "my-courses.html": "/my-courses",
    "courses.html": "/courses",
    "course-content.html": "/course-content",
    "certificate.html": "/certificate",
    "enrollment-success.html": "/enrollment-success",
    "admin-login.html": "/admin-login",
    "admin-dashboard.html": "/admin-dashboard",
    "add-course.html": "/add-course",
    "edit-course.html": "/edit-course",
    "notifications.html": "/notifications"
}

VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

ATTRIBUTE_MAP = {
    "class": "className",
    "for": "htmlFor",
    "tabindex": "tabIndex",
    "readonly": "readOnly",
    "maxlength": "maxLength",
    "minlength": "minLength",
    "autocomplete": "autoComplete",
    "colspan": "colSpan",
    "rowspan": "rowSpan",
    "viewbox": "viewBox",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule"
}

def quote(value):
    return json.dumps(str(value), ensure_ascii=False)

def convert_style(value):
    if not isinstance(value, str):
        return "{}"
    properties = []
    for item in value.split(";"):
        if ":" not in item:
            continue
        key, val = item.split(":", 1)
        key = key.strip()
        val = val.strip()
        if not key:
            continue
        key = re.sub(r"-([a-z])", lambda match: match.group(1).upper(), key)
        properties.append(f"{key}: {quote(val)}")
    return "{" + ", ".join(properties) + "}"

def convert_text(value):
    value = str(value).replace("{", "{'{' }").replace("}", "{'}' }")
    return value.strip()

def process_attribute_value(key, value):
    new_key = ATTRIBUTE_MAP.get(key, key)
    if isinstance(value, list):
        value = " ".join(value)
    return new_key, value

def convert_attributes(tag):
    attributes = []
    for key, value in tag.attrs.items():
        if key == "style":
            attributes.append(f"style={{{convert_style(value)}}}")
            continue
        if key.startswith("on") and isinstance(value, str):
            event_name = key[2:].capitalize()
            attributes.append(f'on{event_name}={{() => window.eval({quote(value)})}}')
            continue

        new_key, clean_val = process_attribute_value(key, value)
        if clean_val is None or clean_val == key:
            attributes.append(new_key)
            continue
        attributes.append(f"{new_key}={quote(clean_val)}")
    return (" " + " ".join(attributes)) if attributes else ""

def convert_node(node, level=0):
    indent = "    " * level
    if isinstance(node, Comment):
        return f"{indent}{{/* {str(node).strip()} */}}"
    if isinstance(node, NavigableString):
        text_value = convert_text(node)
        # Escape raw < and > in free text so JSX doesn't break
        text_value = text_value.replace("<", "&lt;").replace(">", "&gt;")
        return f"{indent}{text_value}" if text_value else ""
    if not getattr(node, "name", None) or node.name in ("script", "style"):
        return ""

    if node.name == "a":
        href = node.get("href")
        route = ROUTES.get(href)
        if route:
            attrs = []
            for k, v in node.attrs.items():
                if k == "href":
                    continue
                if k == "style":
                    attrs.append(f"style={{{convert_style(v)}}}")
                    continue
                new_k, clean_v = process_attribute_value(k, v)
                attrs.append(f"{new_k}={quote(clean_v)}")

            attr_str = (" " + " ".join(attrs)) if attrs else ""
            children = [convert_node(c, level + 1) for c in node.children]
            children = [c for c in children if c]
            if not children:
                return f'{indent}<Link to={quote(route)}{attr_str} />'
            return f'{indent}<Link to={quote(route)}{attr_str}>\n' + "\n".join(children) + f'\n{indent}</Link>'

    tag_name = node.name
    attribute_text = convert_attributes(node)
    if tag_name in VOID_TAGS:
        return f"{indent}<{tag_name}{attribute_text} />"

    children = [convert_node(c, level + 1) for c in node.children]
    children = [c for c in children if c]
    if not children:
        return f"{indent}<{tag_name}{attribute_text}></{tag_name}>"
    return f"{indent}<{tag_name}{attribute_text}>\n" + "\n".join(children) + f"\n{indent}</{tag_name}>"

for html_file in FRONTEND.glob("*.html"):
    page_name = html_file.name
    component_name = PAGE_NAMES.get(page_name)
    if not component_name:
        continue

    html = html_file.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")
    body = soup.body
    if body is None:
        continue

    content = [convert_node(child, 3) for child in body.children]
    content_text = "\n".join([c for c in content if c])

    imports = [
        'import PageCss from "../components/PageCss";',
        'import LegacyScript from "../components/LegacyScript";'
    ]
    if "<Link " in content_text:
        imports.insert(0, 'import { Link } from "react-router-dom";')

    component_code = (
        "\n".join(imports) + "\n\n"
        f"export default function {component_name}() {{\n"
        "    return (\n"
        "        <>\n"
        '            <PageCss href="/css/style.css" />\n'
        f"            {content_text}\n"
        '            <LegacyScript src="/legacy/js/main.js" module={true} />\n'
        "        </>\n"
        "    );\n"
        "}\n"
    )

    output_file = PAGES / f"{component_name}.jsx"
    output_file.write_text(component_code, encoding="utf-8")
    print("Regenerated:", output_file.name)

print("\nAll React pages regenerated with clean CSS classes and SVG attributes.")