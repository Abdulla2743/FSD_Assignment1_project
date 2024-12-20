OBJECTIVE:  
Develop a full-stack web application for one of the given problem statements that follows modern application development principles, allowing you to design and implement a robust system.  
The assignment emphasizes both design and implementation: you are expected to design a fullyfeatured application but develop only a working prototype focusing on core functionalities. 
Two problem statements are given below. Each Learner has to choose one of the problem statements.  
This is an individual take-home assignment to be carried out by each learner independently. 
*******************************************
PROBLEM STATEMENTS 
TITLE: BOOK EXCHANGE PLATFORM 
----------------------------------
**Problem Statement:**
Book lovers frequently accumulate a collection of books they have read and look for other recommendations. They are always eager to explore new reading material. 
Traditional methods of exchanging books, such as local book swaps or lending among friends, are limited in scope and accessibility. 
Therefore, it is imperative to have a digital platform that can facilitate book exchanges on a larger scale. This platform should connect users with similar reading interests, 
enabling them to trade books easily and efficiently. This project aims to develop a full-stack web application that serves as a centralized platform for users to exchange, lend, and borrow books with other users. 
The platform should provide a user-friendly interface, robust search and recommendation features, and secure transaction capabilities. 

**--Features:--** 

**User Authentication:** Implement a secure user authentication system to allow users to register, log in, and manage their accounts. 

**Book Listing:** Enable users to list books they want to exchange or lend, including details such as title, author, genre, condition, and availability status. 

**Book Search:** Provide users with advanced search and filtering options to discover books based on criteria like genre, author, title, availability. 

**Exchange Requests:** Allow users to send and receive exchange requests for specific books, including negotiation options for terms such as delivery method and duration. 

**Messaging System:** Implement a messaging system to facilitate user communication regarding book exchanges, including negotiation details, logistics, and scheduling. (Mock API s can be used) 

**User Profiles:** Enable users to create profiles with information about their reading preferences, favorite genres, and books they currently own or wish to acquire. 

**Transaction Management:** Provide tools for users to track the status of their exchange transactions, including pending requests, accepted exchanges, and completed transactions. 

+++++++++++++++++++++++++++++++++++++++++++

**Expected outcome** 

The book exchange platform should provide users with a convenient and efficient way to discover new reading material, share their favorite books with others, 
and connect with fellow book enthusiasts in their community. The platform aims to promote a reading culture and foster a sense of community among users by facilitating book exchanges. 
User Stories and Acceptance Criteria for the Book Exchange Platform 
 
**User Story 1: User Authentication** 
As a user,I want to securely register, log in, and manage my account, So that I can access and use the book exchange platform. 
Acceptance Criteria: 
The platform must allow users to register with a valid email and password. 
Passwords must be stored securely using encryption. 
Users should be able to reset their password via a password recovery system. Users should be able to log out from their account. 
 
**User Story 2: Book Listing** 
As a user, I want to list books that I want to exchange or lend, So that others can browse and request the books I offer. Acceptance Criteria: 
Users should be able to add a book to their list by providing details such as title, author, genre, condition, and availability status. 
Each book listing must have a unique ID associated with a user’s profile. Users should be able to edit or delete book listings at any time. 
The book listing must be displayed in the user's profile and searchable by others. 
 
**User Story 3: Book Search** 
As a user, I want to search for books based on criteria such as title, author, genre, and location, So that I can easily find books that interest me. 
Acceptance Criteria: 
The platform must provide a search bar where users can enter keywords like title, author, or genre. The platform should allow users to filter search results by availability status, genre, and location. 
Users must be able to view detailed information about a book (title, author, condition, etc.) when clicking on a search result. 
The search results should be paginated or load incrementally to handle large datasets. 
 
**User Story 4: Exchange Requests** 
As a user,I want to send and receive book exchange requests,So that I can initiate a transaction to exchange books with others. 
Acceptance Criteria: 
Users must be able to send an exchange request to another user for a specific book. 
The request must include the option to negotiate terms, such as delivery method and exchange duration. 
The recipient of the request should be able to accept, reject, or modify the request. 
Both parties should receive notifications about the status of the exchange request (pending, accepted, rejected, modified). 
The platform should track ongoing exchanges in the user's transaction history. 


 
**User Story 7: Transaction Management**
As a user, I want to manage my book exchanges, So that I can track the status of all my exchange transactions. Acceptance Criteria: 
Users must be able to view a history of their exchange requests, including pending, accepted, and completed exchanges. 
The transaction management interface should allow users to cancel pending exchanges. 
Users should receive notifications when a transaction status changes (e.g., request accepted, book delivered). 
Transaction history should be available to users on their profile page.

**ASSIGNMENT EXPECTATIONS**
-------------------------

**PART 1: DESIGN**
Design a full-stack architecture for the given Problem statement. For the chosen application, define the application's purpose, user roles, and core functionalities. Identify the primary features of your application and design the architecture of the application. 
The design should consider scalability by using a modular architecture. The frontend should be component-based (e.g., using React components) with a structured hierarchy, while the backend should follow proper separation of concerns (e.g., routing, controllers, services) and a suitable architecture. Identify the services and the operations to be implemented 
Plan your application design in a way that would make it easy to add new features or extend the architecture in the future. For example, ensure that your backend logic is decoupled from the frontend so that other applications, like a mobile app can reuse it. 
 
 
 
**PART 2: BACKEND** 
You are expected to implement three important user stories for the problem statement. Your implementation should follow modern web application development practices. 
Use Node.js (or another backend framework of your choice) to handle server-side logic. Develop REST APIs or GraphQL APIs to handle CRUD operations with a database. Ensure proper routing, URL mapping, and response handling. Use any database (SQL/NoSQL) for data storage and retrieval. 
 
**PART 3. FRONTEND** 
Design and implement the frontend UI for the same three important user stories. Choose a suitable frontend framework and implement it. Use a client-side JavaScript framework (e.g., React, Angular, Vue.js) to build the user interface. Design an interactive, user-friendly UI with responsiveness and state management. Implement the key components that reflect the selected functionalities  
 
**PART 4: INTEGRATION** 
A complete end-to-end demonstration of the selected user stories to be implemented.  
Integrate the frontend and backend components and demonstrate the capabilities. Demonstrate communication between the front end and back end using APIs (e.g., AJAX, Fetch API). Use authentication for secure access to API endpoints. 

**DELIVERABLES:**

1.	Design Documentation: Full application architecture (frontend-backend interaction, API endpoints, database schema). UI/UX wireframes for the platform’s core features. A detailed explanation of your approach to implementing scalability and modularity. 
2.	Demonstration Video of the Working Prototype: Video recording showing the demonstrations of the user stories implemented both frontend and backend. 
Note: if you are exceeding size limits when uploading videos to the elearn portal, add it to a Google Drive and submit the link)  
3.	GitHub Repository: A well-organized repository with a clear README file that includes instructions for setting up the application. 
4.	Short Presentation: A presentation explaining your technology choices, the user stories implemented, snapshots of UI, snapshots of API response in tools like Postman
   
**SUBMISSION INSTRUCTIONS** 
       
1.	Upload the complete code to the GitHub repositories. GitHub repository access is to be kept public and open for all evaluators.  
2.	Create a ZIP file including all the four deliverables (Design document, Demonstration Video, Github Link(mentioned in a notepad), Short Presentation) and upload a single ZIP file to the LMS. 
3.	Academic Honesty: You can discuss with peers and refer to the internet to understand the concept better. However, you may not share code with other groups or do not do a verbatim copy from the Internet/Generative AI responses/GitHub repositories. The code will be tested for plagiarism. If found guilty, no marks will be awarded. 
