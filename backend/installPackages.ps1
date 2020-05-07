<#

-----------------------------------------
GOALIEWATCH SERVER REQUIREMENTS INSTALLATION
-----------------------------------------

Installing required python and node packages for server migration

*NOTE* You MUST change the Execution Policy if your personal machine so you can run this script in your PowerShell terminal

Ex: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

#>

Write-Host "This may take a few minutes..." -ForegroundColor Yellow

    # Upgrade pip
    python -m pip install --upgrade pip
    Write-Host "pip installed" -ForegroundColor Green

    # Install pandas + requests
    pip install pandas
    pip install requests
    Write-Host "Pandas & requests installed" -ForegroundColor Green

    # To store data from python to mongo
    pip install pymongo
    pip install python-dotenv
    pip install dnspython
    Write-Host "Pymongo & dotenv & dnspython installed" -ForegroundColor Green

    # Webscraping
    pip install selenium
    pip install webdriver-manager
    pip install BeatifulSoup4
    pip install lxml
    pip install cfscrape
    Write-Host "Webscraping packages installed" -ForegroundColor Green

    # Install Mongoose for DB
    npm install mongoose --save
    Write-Host "Mongoose installed" -ForegroundColor Green

    # Install nodemon
    npm install nodemon
    Write-Host "Nodemon installed" -ForegroundColor Green

    # Adding in session packages
    npm install --save express-session
    Write-Host "Session packages installed" -ForegroundColor Green

    # Adding in cookie-Parser
    npm install --save cookie-parser
    Write-Host "Cookie package installed" -ForegroundColor Green

    # Navigating to correct folder so it doesn't get mad when installing packages
    # cd .. .\GoalieWatch-MERN\goalie-watchers-mern 

    # Adding in bootstrap package
    npm install bootstrap
    Write-Host "Bootstrap package installed" -ForegroundColor Green

    # Adding in cors package
    npm install cors
    Write-Host "CORS installed" -ForegroundColor Green

    # Adding in doten package
    npm install dotenv
    Write-Host "Dotenv package installed" -ForegroundColor Green    

    # Adding in node cron package
    npm install node-cron
    npm install shelljs
    Write-Host "Node-cron & shelljs package installed" -ForegroundColor Green

    # Adding in react-router package
    npm install react-router-dom
    Write-Host "React-router-dom package installed" -ForegroundColor Green 
    
    # Adding in axios to send HTTP requests to backend API
    npm install axios
    Write-Host "Axios package installed" -ForegroundColor Green 

    # Adding in react select for dynamic searching
    npm install react-select@next
    Write-Host "React select package installed" -ForegroundColor Green 

    # Adding in multiselect for goalie drop down
    npm install --save @progress/kendo-react-dropdowns @progress/kendo-react-intl @progress/kendo-data-query
    Write-Host "Multiselect packages installed" -ForegroundColor Green 

    # Adding in node fetch to pull data from NHL API
    npm install node-fetch
    Write-Host "Note Fetch package installed" -ForegroundColor Green 


Write-Host "All packages sucessfully installed!" -ForegroundColor Green