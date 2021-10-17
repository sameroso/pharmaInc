<h1 align="center">
 Pharma Inc.
</h1>

<p align="center">
   <a href="#memo-description">Description</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :memo: Description

- A simple app made to visualize patients data and show their details

## :rocket: Technologies

- [ReactJS][reactjs]
- [Typescript][typescript]
- [React Router Dom](https://reactrouter.com/web/guides/quick-start)
- [SASS](https://sass-lang.com/)
- And some other packages...

## :gear: How To Use

To clone and run this application, you'll need [Git][git], [Node.js v14.15.0][nodejs] or higher + [Yarn v1.22][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/sameroso/pharmaInc.git

# Go into the repository
$ cd pharna

# Install dependencies
$ yarn install

# Run the app
$ yarn start
```

Or run with docker

```bash
# Clone this repository
$ git clone https://github.com/sameroso/pharmaInc.git

# Go into the repository
$ cd pharna

# For Development Mode
$ yarn dev

# For Production Mode
$ docker-compose -f docker-compose.prod.yml build
$ docker run -p 8084:80 --name react-app app-prod
```



---

Made with 💗 by Samer 👋 [Get in touch!](https://www.linkedin.com/in/samer-rola-frontend/)

[typescript]: https://www.typescriptlang.org/
[reactjs]: https://reactjs.org/
[sass]: https://sass-lang.com/
