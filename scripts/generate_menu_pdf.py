from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from PIL import Image as PILImage


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "imperial-menu.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "imperial-menu.pdf"
LOGO = ROOT / "src" / "assets" / "imperial-logo.png"
MENU_LOGO = ROOT / "tmp" / "pdfs" / "imperial-logo-menu.jpg"

GREEN = HexColor("#102A20")
DARK_GREEN = HexColor("#0A1C15")
CREAM = HexColor("#F7F1E7")
GOLD = HexColor("#C6A260")
RED = HexColor("#A82924")
INK = HexColor("#142019")
MUTED = HexColor("#626A63")
LINE = HexColor("#D7CCB9")

pdfmetrics.registerFont(TTFont("Georgia", r"C:\Windows\Fonts\georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", r"C:\Windows\Fonts\georgiab.ttf"))
pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))


PAGES = [
    {
        "code": "DE",
        "title": "SPEISEKARTE",
        "subtitle": "Italienische Seele. Schweizer Haltung.",
        "season": "Eine saisonale Auswahl - Preise in Schweizer Franken",
        "note": "Vegetarische Gerichte sind mit (V) gekennzeichnet.",
        "categories": [
            ("ANTIPASTI", [
                ("Burrata Imperiale (V)", "Datterini, Basilikumöl, geröstetes Sauerteigbrot", "19"),
                ("Vitello Tonnato", "Kalbfleisch, Thunfischcrème, Kapern, Zitrone", "24"),
                ("Polpo alla Griglia", "Oktopus, Kartoffel, Olive, Petersilie", "26"),
            ]),
            ("PASTA & RISOTTO", [
                ("Tagliolini al Tartufo (V)", "Butter, Salbei, Parmesan, schwarzer Trüffel", "32"),
                ("Pappardelle al Ragù", "Geschmortes Rind, Sangiovese, Rosmarin", "29"),
                ("Risotto al Limone (V)", "Tessiner Merlot, Zitrone, Kräuter, Mascarpone", "28"),
            ]),
            ("PIZZA", [
                ("Margherita Imperiale (V)", "San Marzano, Fior di Latte, Basilikum", "21"),
                ("Tartufo & Funghi (V)", "Fior di Latte, Waldpilze, Trüffelcrème", "29"),
                ("Prosciutto di Parma", "San Marzano, Büffelmozzarella, Rucola", "28"),
            ]),
            ("SECONDI & DOLCI", [
                ("Branzino al Lago", "Wolfsbarsch, Fenchel, Zitrone, Weissweinsud", "39"),
                ("Melanzana Affumicata (V)", "Aubergine, Tomate, Pecorino, Pinienkerne", "27"),
                ("Tiramisù della Casa (V)", "Mascarpone, Espresso, Kakao, Amaretto", "13"),
            ]),
        ],
    },
    {
        "code": "FR",
        "title": "LA CARTE",
        "subtitle": "L'âme italienne. L'exigence suisse.",
        "season": "Une sélection de saison - Prix en francs suisses",
        "note": "Les plats végétariens sont indiqués par (V).",
        "categories": [
            ("ANTIPASTI", [
                ("Burrata Imperiale (V)", "Datterini, huile de basilic, pain au levain grillé", "19"),
                ("Vitello Tonnato", "Veau, crème de thon, câpres, citron", "24"),
                ("Polpo alla Griglia", "Poulpe, pomme de terre, olive, persil", "26"),
            ]),
            ("PÂTES & RISOTTO", [
                ("Tagliolini al Tartufo (V)", "Beurre, sauge, parmesan, truffe noire", "32"),
                ("Pappardelle al Ragù", "Bœuf braisé, Sangiovese, romarin", "29"),
                ("Risotto al Limone (V)", "Merlot tessinois, citron, herbes, mascarpone", "28"),
            ]),
            ("PIZZA", [
                ("Margherita Imperiale (V)", "San Marzano, fior di latte, basilic", "21"),
                ("Tartufo & Funghi (V)", "Fior di latte, champignons, crème de truffe", "29"),
                ("Prosciutto di Parma", "San Marzano, mozzarella di bufala, roquette", "28"),
            ]),
            ("SECONDI & DESSERTS", [
                ("Branzino al Lago", "Bar, fenouil, citron, jus au vin blanc", "39"),
                ("Melanzana Affumicata (V)", "Aubergine, tomate, pecorino, pignons", "27"),
                ("Tiramisù della Casa (V)", "Mascarpone, espresso, cacao, amaretto", "13"),
            ]),
        ],
    },
    {
        "code": "IT",
        "title": "IL MENU",
        "subtitle": "Anima italiana. Cura svizzera.",
        "season": "Una selezione stagionale - Prezzi in franchi svizzeri",
        "note": "I piatti vegetariani sono contrassegnati con (V).",
        "categories": [
            ("ANTIPASTI", [
                ("Burrata Imperiale (V)", "Datterini, olio al basilico, pane a lievitazione naturale", "19"),
                ("Vitello Tonnato", "Vitello, crema di tonno, capperi, limone", "24"),
                ("Polpo alla Griglia", "Polpo, patata, oliva, prezzemolo", "26"),
            ]),
            ("PASTA & RISOTTO", [
                ("Tagliolini al Tartufo (V)", "Burro, salvia, parmigiano, tartufo nero", "32"),
                ("Pappardelle al Ragù", "Manzo brasato, Sangiovese, rosmarino", "29"),
                ("Risotto al Limone (V)", "Merlot ticinese, limone, erbe, mascarpone", "28"),
            ]),
            ("PIZZA", [
                ("Margherita Imperiale (V)", "San Marzano, fior di latte, basilico", "21"),
                ("Tartufo & Funghi (V)", "Fior di latte, funghi di bosco, crema al tartufo", "29"),
                ("Prosciutto di Parma", "San Marzano, mozzarella di bufala, rucola", "28"),
            ]),
            ("SECONDI & DOLCI", [
                ("Branzino al Lago", "Branzino, finocchio, limone, salsa al vino bianco", "39"),
                ("Melanzana Affumicata (V)", "Melanzana, pomodoro, pecorino, pinoli", "27"),
                ("Tiramisù della Casa (V)", "Mascarpone, espresso, cacao, amaretto", "13"),
            ]),
        ],
    },
    {
        "code": "EN",
        "title": "MENU",
        "subtitle": "Italian soul. Swiss care.",
        "season": "A seasonal selection - Prices in Swiss francs",
        "note": "Vegetarian dishes are marked with (V).",
        "categories": [
            ("ANTIPASTI", [
                ("Burrata Imperiale (V)", "Datterini tomatoes, basil oil, toasted sourdough", "19"),
                ("Vitello Tonnato", "Veal, tuna cream, capers, lemon", "24"),
                ("Polpo alla Griglia", "Octopus, potato, olive, parsley", "26"),
            ]),
            ("PASTA & RISOTTO", [
                ("Tagliolini al Tartufo (V)", "Butter, sage, parmesan, black truffle", "32"),
                ("Pappardelle al Ragù", "Braised beef, Sangiovese, rosemary", "29"),
                ("Risotto al Limone (V)", "Ticino Merlot, lemon, herbs, mascarpone", "28"),
            ]),
            ("PIZZA", [
                ("Margherita Imperiale (V)", "San Marzano, fior di latte, basil", "21"),
                ("Tartufo & Funghi (V)", "Fior di latte, wild mushrooms, truffle cream", "29"),
                ("Prosciutto di Parma", "San Marzano, buffalo mozzarella, rocket", "28"),
            ]),
            ("SECONDI & DESSERTS", [
                ("Branzino al Lago", "Sea bass, fennel, lemon, white wine jus", "39"),
                ("Melanzana Affumicata (V)", "Aubergine, tomato, pecorino, pine nuts", "27"),
                ("Tiramisù della Casa (V)", "Mascarpone, espresso, cocoa, amaretto", "13"),
            ]),
        ],
    },
]


def fit_lines(text: str, font: str, size: float, width: float, maximum: int = 2) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
            if len(lines) == maximum - 1:
                break
    if current and len(lines) < maximum:
        lines.append(current)
    return lines


def draw_category(c: canvas.Canvas, x: float, y: float, width: float, category: tuple) -> float:
    title, dishes = category
    c.setFillColor(GREEN)
    c.setFont("Arial-Bold", 9)
    c.drawString(x, y, title)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.1)
    c.line(x, y - 8, x + width, y - 8)
    y -= 31

    for name, description, price in dishes:
        c.setFillColor(INK)
        c.setFont("Georgia-Bold", 10.4)
        c.drawString(x, y, name)
        c.setFillColor(GREEN)
        c.setFont("Arial-Bold", 8.6)
        price_text = f"CHF {price}"
        c.drawRightString(x + width, y, price_text)
        y -= 14
        c.setFillColor(MUTED)
        c.setFont("Arial", 7.8)
        for line in fit_lines(description, "Arial", 7.8, width - 8):
            c.drawString(x, y, line)
            y -= 10
        y -= 13
    return y


def draw_page(c: canvas.Canvas, page: dict, page_number: int) -> None:
    width, height = A4
    c.setFillColor(CREAM)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    c.setFillColor(DARK_GREEN)
    c.rect(0, height - 174, width, 174, fill=1, stroke=0)
    c.setFillColor(RED)
    c.rect(0, height - 177, width, 3, fill=1, stroke=0)

    c.drawImage(ImageReader(MENU_LOGO), 42, height - 142, 108, 108, preserveAspectRatio=True, mask="auto")
    c.setFillColor(GOLD)
    c.setFont("Arial-Bold", 8)
    c.drawString(176, height - 55, f"RESTAURANT & PIZZERIA  /  {page['code']}")
    c.setFillColor(CREAM)
    c.setFont("Georgia-Bold", 29)
    c.drawString(176, height - 91, page["title"])
    c.setFillColor(HexColor("#DDC99D"))
    c.setFont("Georgia", 12)
    c.drawString(176, height - 116, page["subtitle"])

    c.setFillColor(MUTED)
    c.setFont("Arial", 8.5)
    c.drawString(43, height - 207, page["season"])

    left_x, right_x = 43, 309
    column_width = 243
    top_y = height - 241
    draw_category(c, left_x, top_y, column_width, page["categories"][0])
    draw_category(c, left_x, top_y - 226, column_width, page["categories"][2])
    draw_category(c, right_x, top_y, column_width, page["categories"][1])
    draw_category(c, right_x, top_y - 226, column_width, page["categories"][3])

    c.setStrokeColor(LINE)
    c.setLineWidth(.7)
    c.line(43, 67, width - 43, 67)
    c.setFillColor(MUTED)
    c.setFont("Arial", 7.4)
    c.drawString(43, 49, page["note"])
    c.drawRightString(width - 43, 49, f"{page_number} / 4")
    c.setFillColor(GREEN)
    c.setFont("Arial-Bold", 7.3)
    c.drawCentredString(width / 2, 26, "PASSIONE  /  FAMIGLIA  /  QUALITÀ")


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    MENU_LOGO.parent.mkdir(parents=True, exist_ok=True)
    with PILImage.open(LOGO) as source_logo:
        source_logo.convert("RGB").resize((500, 500), PILImage.Resampling.LANCZOS).save(
            MENU_LOGO, "JPEG", quality=88, optimize=True
        )
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Imperial - Menu")
    c.setAuthor("Imperial Restaurant & Pizzeria")
    c.setSubject("Multilingual restaurant menu")
    for index, page in enumerate(PAGES, start=1):
        draw_page(c, page, index)
        c.showPage()
    c.save()
    PUBLIC_OUTPUT.write_bytes(OUTPUT.read_bytes())
    print(OUTPUT)
    print(PUBLIC_OUTPUT)


if __name__ == "__main__":
    main()
