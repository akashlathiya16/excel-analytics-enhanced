@echo off
echo Starting Excel Analytics Project...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd Excel_Analytics && npm start"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.

echo Waiting for servers to initialize...
timeout /t 5 /nobreak >nul

echo Opening Dashboard in browser...
start http://localhost:3000

echo.
echo ✅ Project Started Successfully!
echo ✅ Dashboard opened in browser
echo ✅ Both servers running
echo.
echo Press any key to exit this window...
pause >nul 