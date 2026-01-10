from pydantic import BaseModel
from typing import List

class FileResponse(BaseModel):
    id: int
    name: str
    size: int

    class Config:
        from_attributes = True

class DownloadFilesResponse(BaseModel):
    files: List[FileResponse]

