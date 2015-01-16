@echo off

IF "%SITE_TYPE%" == "backend" (
  deployback.sh
) ELSE (
  IF "%SITE_TYPE%" == "frontend" (
    deployfront.sh
  ) ELSE (
    echo You have to set SITE_TYPE setting to either "backend" or "frontend"
    exit /b 1
  )
)