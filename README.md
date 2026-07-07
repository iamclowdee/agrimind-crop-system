Authors' Note on how to start the website locally:
*Requirements:*
1. Code Editor (preferably VS Code).
2. Browser (Any).

*Steps:*
1. Open 3 Terminals in your Code Editor
2. On the first terminal, go inside the 'client' folder. (cd client)
3. Execute "npm run dev"
4. Log into your MongoDB Atlas and paste the id:pass into the server/.env file in the MONGO_URI.
5. On the second terminal, go inside the server folder. (cd server)
6. Execute "npm run dev"
7. On the third terminal. go inside the ml-services. (cd ml-services)
8. Execute "python app.py"
9. Now yout website is completely running.