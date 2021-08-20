# LinkShortenerNew
Small link shortener app for PayRock code challenge

Technical Details:
This app was created on a mac machine and uses the Deno runtime

Steps to run app:
- git clone this repo
- Use terminal to navigate to the foler containing the file "link_shortener.js"
- Make sure you have Deno installed then run the following command: deno run --allow-read --allow-write --allow-net link_shortener.js
- App should be running now, so in the browser navigate to the following URL: http://localhost:8080
- Now you should see the home page, here you can enter any link that you want to shorten
- Uppon clicking shorten button you should now be greeted with a new page providing you with your shortened URL
- Now you can use your shortened URL in the browser (If you use the wrong url here you will be taken to a 404 error page)
- After visiting the new shortened URL, if you go back one step and now type in the browser: http://localhost:8080/visits/<enter shortened URL here>, for example
  http://localhost:8080/visits/4gmu, you will be able to view how many times that shortened URL has been hit.
