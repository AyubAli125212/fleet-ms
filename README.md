# FMS- Fleet Management System

### ReactJS + Typescript + NodeJS + ExpressJS + MongoDB + TailwindCSS + ViteJS

## Running the project
1. Clone the project using the following command
```bash
git clone https://github.com/AyubAli125212/fleet-ms.git
```
2. Install dependencies
    - For client
        ```bash
        cd client
        npm install
        ```
    - For server
        ```bash
        cd server
        npm install
        ```
3. Run the project
    - For client
        ```bash
        npm run dev
        ```
    - For server
        ```bash
        npm start
        ```
4. Open the browser and navigate to http://localhost:5173
5. You are ready to go!

## Running the Server using docker
1. cd server
2. docker build -t fms .
3. docker run -p 8000:8000 fms
### Note 
- If you want to run the project using docker, you need to have docker installed on your machine.
- Make sure you have the environment variables set in the .env file.