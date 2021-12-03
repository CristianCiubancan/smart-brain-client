<!-- ABOUT THE PROJECT -->
## About The Project

This project is consists of a very basic face detection app, where you can create accounts scan faces, and rank up based on the number of faces found in photos you upload.

[Live Preview](https://smart-brain.happyoctopus.click/)


Features:
* Register
* Login
* Logout
* scan images for faces and rank up

This website features cookie authentication for security.



### Built With

Those are the frameworks/libraries used to build this website client.

* [React.js](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Chakra-UI](https://chakra-ui.com/)
* [Formik](https://formik.org/)



<!-- GETTING STARTED -->
## Getting Started

In order to try this locally you you will need to also download and run the [server side](https://github.com/CristianCiubancan/smart-brain-server).

### Prerequisites

To run this project you will need to do the following:
* yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CristianCiubancan/smart-brain-client
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Enter your API in `.env.local`
   ```.env.local
   NEXT_PUBLIC_API_URL=YOUR_API_ENDPOINT
   ```
4. Run the client
   ```sh
   yarn dev
   ```
