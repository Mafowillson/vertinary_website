from fastapi import Request

SUPPORTED_LANGUAGES = ["en", "fr", "zh", "hi", "es"]


def get_locale(request: Request) -> str:
    header = request.headers.get("Accept-Language", "en")
    languages = []
    for part in header.split(","):
        part = part.strip()
        if not part:
            continue
        if ";q=" in part:
            lang, q = part.split(";q=", 1)
            try:
                languages.append((lang.strip(), float(q)))
            except ValueError:
                languages.append((lang.strip(), 0.0))
        else:
            languages.append((part, 1.0))

    languages.sort(key=lambda x: x[1], reverse=True)

    for lang, _ in languages:
        base = lang.split("-")[0].lower()
        if base in SUPPORTED_LANGUAGES:
            return base

    return "en"
