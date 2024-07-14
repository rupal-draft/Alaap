# Sociofy

## Sociofy: A Social Media App

Sociofy is a modern social media application designed to connect people and foster meaningful interactions. Built on the MERN (MongoDB, Express.js, React.js, Node.js) stack with RestAPI and GraphQL for the backend, Next.js for the frontend, and Socket.io for real-time updates. Sociofy offers a seamless user experience coupled with powerful features. It is a user-friendly social media app with a beautiful, responsive UI. It offers features like posting videos, photos, and stories, and allows users to like, comment, and receive notifications. Enjoy real-time chat, a personal profile showcasing your posts and followers, and a personalized settings page to modify your profile.

## Demo Images - 

#### Landing Page - 

![Screenshot 2024-07-14 221805](https://github.com/user-attachments/assets/9425a2db-7865-4619-84e3-e6f47041cfde)


#### Login Page - 

![Screenshot 2024-07-14 221829](https://github.com/user-attachments/assets/4d7d8321-09c7-4215-bebe-f207f56b5e87)


#### Sign Up Page - 

![Screenshot 2024-07-14 221850](https://github.com/user-attachments/assets/9b42d964-bb79-4e26-96ab-4bafe6b487b1)


#### My Profile Page - 

![Screenshot 2024-07-14 222701](https://github.com/user-attachments/assets/7395cde7-344f-4db8-8776-a8d21591db10)


#### Settings Page - 

![Screenshot 2024-07-14 222401](https://github.com/user-attachments/assets/bdbe9860-3578-4bd2-9215-8ac6dd56fd7b)


### To set up Sociofy on your local machine, follow these simple steps:

#### To clone the repository run the following command in your terminal - 
```
    git clone https://github.com/rupal-draft/Sociofy.git
```

#### Navigate into the project directory:
```
    cd Sociofy
```

#### Split the terminal. On one side write -
```
cd Server
```

#### On the other side write -
```
cd Client
```

#### Install dependencies for both the server and client side using the following command:
```
    npm install
```

#### Create your .env file based on the provided .env.example, and fill in your environment variables.

Server-side - 

```
PORT=
DATABASE=
NODE_ENV=
FRONTEND=
JWT_SECRET=
EMAIL_ID=
EMAIL_PASSWORD=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_API_VERSION=
```

Client-side - 

```
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_SOCKET_URL=
NEXT_PUBLIC_SERVER_GRAPHQL=
```

### Running the Application

####  Once you've set up the project and configured your environment variables, you can start Sociofy using the following commands:

To start the client and the server -
```
    npm run dev
```

Now enjoy Sociofy! on your localhost:3000. 🥳🥳

### Features

    User Authentication: Secure user authentication and authorization system.
    Profile Customization: Users can personalize their profiles with avatars, bios, and more.
    Social Interactions: Engage with friends through posts, likes, comments, and direct messages.
    Real-Time Updates: Experience seamless real-time updates for notifications, messages, and posts using Socket.io.
    Responsive Design: Enjoy Sociofy on any device with its responsive design.

### Contributing

We welcome contributions from the community. If you'd like to contribute to Sociofy, please fork the repository and submit pull requests with your changes.

### License

This project is licensed under the MIT License.

### Acknowledgements

Sociofy is built with love and contributions from the open-source community. We'd like to thank all the contributors [Rupal Paul](https://github.com/rupal-draft), [Sattwikee Ghosh](https://github.com/sattwikeeg100), [Pratik Biswas](https://github.com/00Pratik-Biswas00) who have helped make this project possible.

For any questions or concerns, please contact us at rupalpaultmsl@gmail.com. We appreciate your interest in Sociofy! 🚀
