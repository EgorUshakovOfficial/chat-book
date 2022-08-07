# Chat Book
Technologies used: React, Redux, Express, Node, MongoDB<br/>

# Demo 
If you want to see a live demo of this project, please click the following link: https://chat-book1.herokuapp.com/

## About 
A real-time chat application that enables users to exchange messages between one another in a community group.

## Problems encountered and how I solved them 
While developing this web application, I struggled with finding an adequate solution for securely authenticating users and persisting user state in React. I adopted the JWT strategy for authenticating users and initially persisted user state by storing the JWT token in local storage and retrieving user object from server using it. However, I quickly discerned storing JWT tokens in local storage is not a secure practice because it may lead to XSS attacks. Instead of persisting user state by storing the JWT token in local storage and retrieving user object using it, I have persisted user state by creating a JWT token signed with one secret by server called refresh token and storing it in an HTTP read only cookie, to request another JWT token signed with different secret by server called access token with an expiry time of approximately 15 minutes, whenever browser window is refreshed, and use it to retrieve user object. This solution prevents XSS attacks because values of HTTP read only cookies are inaccessbile on client side. Thus, making it an adequate solution for authenticating users and persisting user state in React. 

