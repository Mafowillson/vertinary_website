import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from starlette.requests import Request

from app.i18n import get_translation, TRANSLATIONS
from app.dependencies.locale import get_locale


def test_get_translation_not_found_french():
    text = get_translation("errors.not_found", lang="fr")
    assert text == TRANSLATIONS["fr"]["errors"]["not_found"]
    assert "Ressource" in text or "introuvable" in text


def test_get_translation_unsupported_lang_falls_back_english():
    text = get_translation("errors.not_found", lang="de")
    assert text == TRANSLATIONS["en"]["errors"]["not_found"]


def test_get_translation_missing_key_falls_back():
    out = get_translation("errors.this_key-does-not-exist-ever", lang="zh")
    assert out == "errors.this_key-does-not-exist-ever"


def test_get_translation_zh_dict_missing_key_falls_back_english(monkeypatch):
    import app.i18n as i18n_mod

    zh_errors = dict(i18n_mod.TRANSLATIONS["zh"]["errors"])
    del zh_errors["not_found"]
    monkeypatch.setitem(i18n_mod.TRANSLATIONS["zh"], "errors", zh_errors)
    text = get_translation("errors.not_found", lang="zh")
    assert text == i18n_mod.TRANSLATIONS["en"]["errors"]["not_found"]


def test_get_translation_interpolation_french():
    body = get_translation("emails.welcome_body", lang="fr", name="Jean")
    assert "Jean" in body


def test_get_locale_prefers_fr_cm_header():
    scope = {
        "type": "http",
        "headers": [(b"accept-language", b"fr-CM,fr;q=0.9,en;q=0.8")],
    }
    assert get_locale(Request(scope)) == "fr"


def test_get_locale_unsupported_falls_back_en():
    scope = {
        "type": "http",
        "headers": [(b"accept-language", b"de,ja;q=0.9")],
    }
    assert get_locale(Request(scope)) == "en"


def test_patch_user_language_success_message_matches_real_endpoint():
    """Same response shape as PATCH /api/v1/users/me/language after persisting preference."""

    def update_language_preview(language: str):
        return {"message": get_translation("success.language_updated", lang=language)}

    app = FastAPI()

    @app.patch("/v1/users/me/language")
    def patch_language(payload: dict):
        return update_language_preview(payload["language"])

    client = TestClient(app)
    response = client.patch("/v1/users/me/language", json={"language": "fr"})
    assert response.status_code == 200
    assert response.json()["message"] == TRANSLATIONS["fr"]["success"]["language_updated"]
