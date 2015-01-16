@echo off

IF "%SITE_TYPE%" == "backend" (
  bash deployback.sh
) ELSE (
  IF "%SITE_TYPE%" == "frontend" (
    bash deployfront.sh
  ) ELSE (
    echo You have to set SITE_TYPE setting to either "backend" or "frontend"
    exit /b 1
  )
)
