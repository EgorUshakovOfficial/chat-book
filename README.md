# Chat Book
Technologies used: React, Redux, Express, Node, MongoDB<br/>

# Demo 
If you want to see a live demo of this project, please click the following link: https://chat-book1.herokuapp.com/

## About 
A real-time chat application that enables users to exchange messages between one another in a community group.

## Problems encountered and how I solved them 
 While developing this application, I struggled with finding an adequate solution for securely persisting user state in React. I adopted the JWT strategy for authenticating users and initially persisted user state in the application by storing the JWT token in the local storage and using it for user object retrieval. However, I quickly discerned that storing JWT tokens in the local storage is an unsecure practice because it may lead to XSS attacks. With this in mind, I came up with another solution that securely persists user state. The way user state is securely persisted in the application is by using one JWT token signed with a particular secret by the server called the refresh token to request an access token, a JWT token that has a short expiry date and is signed with a different secret than the refresh token, from the server, which is then used for retrieving the user object. The reason this solution is secure is because the refresh token is stored in a HTTP only cookie and the access token is stored as one of the fields in the state of the application. Since HTTP only cookies are inaccessible on the client side and the access token is stored in memory, the application is safe from XSS attacks. Thus, making it an adequate solution persisting user state in React. 

