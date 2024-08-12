# Alaap

## Alaap: A Social Media App

Alaap is a modern social media application designed to connect people and foster meaningful interactions. Built on the MERN (MongoDB, Express.js, React.js, Node.js) stack with RestAPI and GraphQL for the backend, Next.js for the frontend, and Socket.io for real-time updates. Alaap offers a seamless user experience coupled with powerful features. It is a user-friendly social media app with a beautiful, responsive UI. It offers features like posting videos, photos, and stories, and allows users to like, comment, and receive notifications. Enjoy real-time chat, a personal profile showcasing your posts and followers, and a personalized settings page to modify your profile.

## Demo Images -

#### Landing Page -


#### Login Page -


#### Sign Up Page -


#### My Profile Page -


#### Settings Page -


### To set up Alaap on your local machine, follow these simple steps:

#### To clone the repository run the following command in your terminal -

```
git clone https://github.com/rupal-draft/Alaap.git
```

#### Navigate into the project directory:

```
cd Alaap
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

#### Once you've set up the project and configured your environment variables, you can start Alaap using the following commands:

To start the client and the server -

```
npm run dev
```

Now enjoy Alaap! on your localhost:3000. 🥳🥳

### Features

    User Authentication: Secure user authentication and authorization system.
    Profile Customization: Users can personalize their profiles with avatars, bios, and more.
    Social Interactions: Engage with friends through posts, likes, comments, and direct messages.
    Real-Time Updates: Experience seamless real-time updates for notifications, messages, and posts using Socket.io.
    Responsive Design: Enjoy Alaap on any device with its responsive design.

### Contributing

We welcome contributions from the community. If you'd like to contribute to Alaap, please fork the repository and submit pull requests with your changes.

### License

This project is licensed under the MIT License.

### Acknowledgements

Alaap is built with love and contributions from the open-source community. We'd like to thank all the contributors [Rupal Paul](https://github.com/rupal-draft), [Sattwikee Ghosh](https://github.com/sattwikeeg100), [Pratik Biswas](https://github.com/00Pratik-Biswas00) who have helped make this project possible.

For any questions or concerns, please contact us at rupalpaultmsl@gmail.com. We appreciate your interest in Alaap! 🚀
