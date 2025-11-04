# Troubleshooting Guide

## Common Errors and Solutions

### 1. "Cannot GET /" or "Connection Refused"
**Problem:** The server isn't running.

**Solution:**
1. Make sure you're in the correct folder:
   ```
   cd C:\Users\lilmi\OneDrive\Documents\server_website
   ```

2. Check if the server is running. You should see:
   ```
   Server is running on http://localhost:3000
   ```

3. If not running, start it:
   ```
   npm start
   ```

### 2. "Cannot find module 'express'" or "Cannot find module 'socket.io'"
**Problem:** Dependencies aren't installed.

**Solution:**
Run this command in the project folder:
```
npm install
```

Wait for it to finish, then try starting the server again:
```
npm start
```

### 3. "Port 3000 is already in use"
**Problem:** Another program is using port 3000.

**Solution:**
Option A - Use a different port:
1. Stop the current server (Ctrl+C)
2. Set a different port:
   ```
   set PORT=3001
   npm start
   ```
3. Then visit: http://localhost:3001

Option B - Find and close the program using port 3000:
```
netstat -ano | findstr :3000
```
Then use Task Manager to end that process.

### 4. Browser shows "This site can't be reached" or "ERR_CONNECTION_REFUSED"
**Problem:** The server isn't running or the URL is wrong.

**Solution:**
- Make sure the server is running (see #1)
- Use the exact URL: `http://localhost:3000` (not https, not 127.0.0.1)

### 5. Page loads but shows errors in browser console
**Problem:** JavaScript errors or Socket.IO connection issues.

**Solution:**
1. Open browser Developer Tools (F12)
2. Check the Console tab for errors
3. Make sure you see "Server is running" in your command prompt
4. Check the Network tab to see if Socket.IO is loading

### 6. "npm is not recognized"
**Problem:** Node.js isn't installed or not in PATH.

**Solution:**
1. Download and install Node.js from: https://nodejs.org/
2. Choose the LTS version
3. Restart your command prompt after installation
4. Verify installation: `node --version` and `npm --version`

## Quick Checklist

Before accessing localhost, make sure:
- [ ] You've run `npm install` successfully
- [ ] You're in the correct folder (server_website)
- [ ] The server is running (you see "Server is running" message)
- [ ] You're using `http://localhost:3000` (not https)
- [ ] No firewall is blocking the connection

## Still Having Issues?

1. Check the command prompt where you ran `npm start` - what error messages do you see?
2. Open browser Developer Tools (F12) and check:
   - Console tab for JavaScript errors
   - Network tab to see what's failing to load
3. Share the error messages you see

