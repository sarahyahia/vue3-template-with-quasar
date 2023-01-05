to start front :

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    nvm alias default v16.18.1
    
     npm run dev


to start back:

    source ../../../env/bin/activate #activate the env
    python manage.py runserver 192.168.200.51:8870