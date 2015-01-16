
if ["%SITE_TYPE%" == "backend"]; then
  bash deployback.sh
elif ["%SITE_TYPE%" == "frontend"]; then
  bash deployfront.sh
else
    echo "You have to set SITE_TYPE setting to either backend or frontend"
    exit 1
fi