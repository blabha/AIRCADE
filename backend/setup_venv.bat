@echo off
echo [AIRCADE] Setting up Python virtual environment...

:: Create venv
python -m venv .venv

:: Activate and install
call .venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt

echo.
echo [AIRCADE] Setup complete!
echo.
echo To start the backend:
echo   cd backend
echo   .venv\Scripts\activate
echo   uvicorn main:app --reload --port 8000
echo.
echo Docs available at: http://localhost:8000/docs
pause
