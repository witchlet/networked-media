Ways in which we ran our `server.js` file

1. `node server.js` -> this requires a restart every time we make changes to the file
2. `node --watch server.js` -> this watches our server.js file for changes and will automatically restart the sever
3. `node --watch --watch-path=views server.js` -> this watches both our server.js file and *all* of our .njk files in our views folder

