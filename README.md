# ERC721 Marketplace frontend
Frontend for the [ERC721 marketplace](https://github.com/Nft-Lab/ERC721-marketplace) ethereum contracts. Exposes a webapp that lets everyone interact with a ERC721 marketplace deployed on the ethereum network. 

## Usage
first of all
```shell
npm i
```
installs all the dependencies
### Development server
```shell
npm start
```
will start a development server trough [angular cli](https://angular.io/cli), the applicatoin will be loaded and will be available at [localhost:4200](http://localhost:4200); live reloading will be active.

### Code scaffolding
Components are in the `src/app/components` folder, they are directly there if more than one page loads them (for example the header is loaded everywhere) or are inside the folder of the component that renders them. 

### Build
```shell
npm run build
```
builds the bundle application on dist/app, this folder can be served with any http server such as [nginx](https://nginx.org/en/) or [apache2 web server](https://httpd.apache.org/)

## Contributing
For every feature request submit a pull request and if useful and meaningful wil certainly be approved by someone.

### Standards
all the code to be integrated has to be formatted with [prettier](prettier.io). Fortunately we provide an easy way to do so, just run
```bash
npm run prettify
```
and your code will automatically be formatted, so that everything is uniform. After that commit and make your pull request

## Documentation
Documentation for architectural and implementation decisions can be found on the [wiki](/wiki) page
