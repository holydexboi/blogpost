# blogpost - README

Welcome to the Blog Post project! This platform allows users to create and manage blog posts. Below are the instructions to set up and run the project locally.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your local machine.
- [MongoDB](https://www.mongodb.com/) installed and running locally or have a MongoDB database connection URL.
- A code editor of your choice (e.g., Visual Studio Code, Sublime Text).

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/holydexboi/blogpost.git

   ```

2. Navigate to the project directory:

   ```bash
   cd blogging-platform

   ```

3. Install project dependencies:

   ```bash
   npm install

   ```

4. In the project root, find the config/default and edit the following configuration accordily:

   MONGOURI=your-mongodb-connection-uri
   jwtPrivateKey=your-jwt-secret

5. Start the application:

   ```bash
   npm start

   ```

6.

## Usage

- Create a user account to start posting blogs.
- You can create, edit, delete, and view your blogs.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the project.
- Create your feature branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
