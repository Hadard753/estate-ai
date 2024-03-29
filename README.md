- [Important Note](#important-note)
- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
    - [All environments](#all-environments)
    - [On Windows](#on-windows)
    - [On Linux](#on-linux)
- [Starting with this template](#starting-with-this-template)
- [Template architecture](#template-architecture)
  - [Angular 10](#angular-10)
    - [Angular services & providers](#angular-services--providers)
    - [Angular components](#angular-components)
    - [Angular Universal (Server-Side-Rendering)](#angular-universal-server-side-rendering)
  - [NodeJS](#nodejs)
    - [How the API works](#how-the-api-works)
      - [Working with API params](#working-with-api-params)
      - [API middlewares](#api-middlewares)
    - [Database](#database)
    - [Logging using Ts.LogDebug](#logging-using-tslogdebug)
    - [SSL (https support)](#ssl-https-support)
    - [Authentication and roles](#authentication-and-roles)
      - [Social Authentication](#social-authentication)
    - [Environment configurations](#environment-configurations)
    - [Testing (Unit Tests\API Tests)](#testing-unit-testsapi-tests)
        - [Test database](#test-database)
        - [Running the tests](#running-the-tests)
  - [Sharing code (models, interfaces, etc)](#sharing-code-models-interfaces-etc)
  - [Form validations](#form-validations)
- [Running on production](#running-on-production)
  - [Running Angular and NodeJS on the same server](#running-angular-and-nodejs-on-the-same-server)
    - [Docker\Docker-Compose](#dockerdocker-compose)
      - [Docker-compose](#docker-compose)
      - [Docker image build](#docker-image-build)
    - [The build script (build.sh)](#the-build-script-buildsh)
  - [Seperating client and server](#seperating-client-and-server)
    - [Server as standalone](#server-as-standalone)
    - [Angular as standalone](#angular-as-standalone)

# Important Note

> This template is deprecated and will no longer be maintained. Please use the new [nest-angular-starter](https://github.com/shy2net/nestjs-angular-starter) instead. It has almost the same code-base except the server side which was refactored and is now based on NestJS.
> 
> **It is highly recommend to move to the new template instead, as this template is no longer maintained!**

# Introduction

This starter template comes with NodeJS (typescript) and Angular 10. It shares models between Angular
and NodeJS. Both of the NodeJS and and Angular 10 can run on the same webserver as the NodeJS exposes all of the
default routes to Angular and all of the known routes to the api.

Technologies used in this template:

- Angular 10 (with SSR) - including unit tests (based on Jasmine + Karma)
- NodeJS express typescript (with SSL support) based on [Ts.ED](https://tsed.io/) - for easier express setup using decorators
- Mocha + Chai for backend testing + API tests
- Mongoose (with basic user model)
- Logging (using [Ts.LogDebug](https://typedproject.github.io/ts-log-debug/#/))
- Bootstrap v4 and SCSS by default
- [JWT](https://jwt.io/) and token authentication built-in (including user roles)
- Social Authentication (Google and Facebook)
- Form validations using ([class-validator](https://www.npmjs.com/package/class-validator)), shared between server and client
- Docker support based on alpine and node 12


## Prerequisites

In order to start with this template you have to set up the environment you are working on to suit the needs.

### All environments

Because this template uses mongo-db by default, if you want to run it easily out-of-the-box you must install docker,
then run the following command:

```bash
docker-compose up -d db # Loads up an instance of mongo-db locally with root\root (user\pass) and 'admin' database
```

This will create a simple mongo database with a username\password of 'root' and database named 'admin'.
The mongo-db instance will create a volume mounted at: `~/web_mongo` (inside your user home directory)
Optionally, you can connect to your own mongo-db instance by configuring it (read the config section for more).

### On Windows

Make sure to install [git bash](https://git-scm.com/downloads), this allows you to run `bash` commands which are essential for the build process. You can use any other bash for windows, as long as it can run the scripts this template relays on (`./install_all.sh, predebug.sh, build.sh, test.sh`).

**Make sure to add bash to your system 'PATH'.**

### On Linux

After cloning this repository, make sure to run the following command:
 ```bash
 chmod +x ./install_all.sh && chmod +x ./predebug.sh && chmod +x ./build.sh && chmod +x ./test.sh
 ```

This will give permission to run all included required to work with this template.

# Starting with this template

To work with this template **locally (debug mode)**, follow these commands:

    npm run install:all # Install all dependencies required for both NodeJS and Angular
    npm run node # Run the NodeJS on debug mode
    npm run react # Run React

We don't run the `npm start` command as it is reserved only for the compiled code to run on a production server.

In order to compile and build this template for your **production server** run the following:

    npm run install:all # Install all dependencies required for both NodeJS and Angular
    npm run build # Run the build.sh script to compile and NodeJS and Angular for production
    npm start

These list of commands will install, compile and run the output NodeJS.

# Template architecture

The template comes with a ready to go server and client integration, authentication and basic styling.

## Angular 10

Angular 10 comes with the following features:

- Bootstrap v4 with header and sticky footer.
- Built in SSR bundled with the api server.
- Built in toasty (ngx-toastr) which automatically pops up on HTTP errors obtained from the server API.
- Built in ngx-loading-bar (Youtube styled) when moving between routes.
- Built in auth-guard and authentication, saved on session cookie.
- Built in social authentication (Google and Facebook).
- Build in form validations using class-validator (https://github.com/typestack/class-validator) implemented using the `FormValidatorDirective`.

The code of Angular 10 is stored under the `angular-src` directory.

### Angular services & providers

This template comes with multiple services and proviers which can be used accross the template.

- `ApiService` - This service wraps the access to the server api. It should contain a 'mirror' of the functions that the server has.
- `AuthService` - This service exposes all of the authentication mechanisem and handles all of the login, including login to the api, obtaining the token and saving the token to a cookie for next refresh.
- `AuthGuardService` - An auth guard which used the `AuthService` to guard routes. It also comes with role checking by specifing the `typescript { roles: ['roleName'] }` data for your route.
- `AppHttpInterceptor` - This provider acts as an interceptor for all of the http requests ongoing. It adds the authentication token if provided by the `AuthService` to each request. Then it passes the request to the `RequestsService` to handle.
- `RequestsService` - This service handles all of the requests passing through using the `AppHttpInterceptor`. It shows an error toast if an error had occured in one of the requests.
- `AppService` - Holds information about the current user and app related data.
- `SocialLoginService` - This service is responsible for the whole social authentication (Google and Facebook), it uses `angularx-social-login` module to do so. This service can be found under `social-login` module which initializes all of the providers (which are the 3rd party social sites).

### Angular components

- `AppComponent` - The app component is the bootstrap component of this template. It contain the HTML of the app (such the header, router-oulet and footer). It contains logic to listen to routing changes and showing or hiding the slim loading bar (Youtube styled routing progress bar).

- `HeaderComponent` - The header part of the template. It shows a simple header based on bootstrap which is suitable for mobile as well.
- `FooterComponent` - A simple sticky footer that always appear at the bottom of the page.
- `LoginComponent` - A simple login with username and password which authenticates against the server.
- `UserPageComponent` - A simple page that shows information about the currently logged in user with option of logging out.
- `SocialLoginButton` - A simple container of social login buttons which also performs the social authentication itself.

### Angular Universal (Server-Side-Rendering)

By default this template comes ready with Angular Universal which allows search engines to crawl your website better.
It does this on the NodeJS side after running the `npm run build` command which bundles the angular code and create an angular universal express ready file called `out/src/dist/server.js` which our NodeJS simply imports and initializes in the `src/app.ts` file.

in the `src/app.ts` you have these two methods:

```typescript
  /**
   * Mounts angular using Server-Side-Rendering (Recommended for SEO)
   */
  private mountAngularSSR(): void {
    // The dist folder of compiled angular
    const DIST_FOLDER = path.join(__dirname, 'dist');

    // The compiled server file (angular-src/server.ts) path
    const ngApp = require(path.join(DIST_FOLDER, 'server/main'));

    // Init the ng-app using SSR
    ngApp.init(this.expressApp, path.join(DIST_FOLDER, '/browser'));
  }

  /**
   * Mounts angular as is with no SSR.
   */
  private mountAngular(): void {
    // Point static path to Angular 2 distribution
    this.express.use(express.static(path.join(__dirname, 'dist/browser')));

    // Deliever the Angular 2 distribution
    this.express.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'dist/browser/index.html'));
    });
  }
```

By default the mountAngular is called in the init method of `src/app.ts`, simply change it into `mountAngularSSR` in order to enable
SSR, but be careful as SSR requires special treatments in your code on certain situations.

## NodeJS

Comes with built in typescript support and compilation.

It comes with the following features:

- [Ts.ED](https://tsed.io/) - Easier express with typescript using decorators
- Authentication (including middlewares and token generation)
- Angular routes support (redirect to index.html of compiled Angular code), this means you can run you Angular app and API on the same container!
- Configuration according to environment (using [config npm package](https://www.npmjs.com/package/config)).
- Logging (using [Ts.LogDebug](https://typedproject.github.io/ts-log-debug/#/)).
- Social Authentication, which basically gets an access token from the client that logged into a service and then creates a user associated with it.
- Unit testing using Mocha and Chai.

The code of NodeJS is stored under the `src` directory.
Output directory of the compiled typescript will be available in the `out` directory.

### How the API works

I would first recommend you to read the [Getting Started tutorial of Ts.ED](http://tsed.io/getting-started.html). As it will explain really good how
the decorators help make your express app easier to write, maintain and faster for development.

Within this template, NodeJS comes with three working examples of a working api called `test`, `errorTest` and `saySomething`,
which can be viewed under `src/api/api.controller`.

The way this template is built makes the whole code a-lot more readable, and easier for testing.

api.controller.ts:

```typescript
  @Get('/test') // This tells express to route on /api/test
  test() {
    return responses.getOkayResponse();
  }
```

The `responses.getOkayResponse(data?: any)` is just a simple method that returns a JSON response:

```typescript
export function getOkayResponse(data?: any) {
  return {
    status: 'ok',
    data: data
  } as ActionResponse<any>;
}
```

ActionResponse objects are objects that specify a response to an action done on the server. You can provide
data which comes with the response. If the status of the ActionResponse is error, it will appear as toast
by default in the client.

You can test this api easily by running the express server:
> npm run node

Now simply access your server in this url:
> [http://localhost:3000/api/test](http://localhost:3000/api/test)

#### Working with API params

Let's review the working example of saySomething:

api.controller.ts:

```typescript
  @Get('/say-something') // Route on /api/say-something
  saySomething(@QueryParams('whatToSay') whatToSay: string) { // Setting the @QueryParams decorator tells express to extract the request.query['whatToSay'] into the whatToSay param.
    return responses.getOkayResponse(whatToSay);
  }
```

Now simple open up your browser to the api url with a 'what' param:

> http://localhost:3000/api/say-something?what=Hello

And you will get this output:

```json
{
  "status": "ok",
  "data": "Hello"
}
```

#### API middlewares

The api comes with some prepacked middlewares which can be found in the `src/middlewares` directory:

- `auth.middelware` - Authenticates the user against the stored credentials on the database (currently based on Mongoose).
- `cors.middleware`- Allows passing CORS using the config.CORS_OPTIONS.

### Database

This template uses mongoose as the backend server to store users. It has only one model called UserProfileModel which you can find in the `src/models` directory.
You can view the database code at the `src/db.ts` file, which basically is responible with the communication to the database.

In order to configure the database connection string, please review the `Environment configurations` part of this readme.

### Logging using Ts.LogDebug

This template comes ready with [Ts.LogDebug](https://typedproject.github.io/ts-log-debug/#/). By default it will save all of the error logs into the `logs` directory.
You can edit the logging configurations in the `server.ts` file:

```typescript
  /**
   * Returns the logger configurations.
   */
  private getLoggerConfigurations(settings: IServerSettings): Partial<ILoggerSettings> {
    // All logs are saved to the logs directory by default, you can specify custom directory in the associated configuration file ('LOGS_DIR')
    const logsDir = config.LOGS_DIR || path.join(__dirname, 'logs');

    // Add file appenders (app.log for all logs, error.log only for errors)
    $log.appenders.set('file-error-log', {
      type: 'file',
      filename: path.join(logsDir, `error.log`),
      levels: ['error']
    });

    // --> Uncomment this line if you want to log all data
    // .set('file-log', {
    //   type: 'file',
    //   filename: path.join(logsDir, `app.log`)
    // });

    return {
      ...settings.logger,
      debug: config.DEBUG_MODE,
      level: config.DEBUG_MODE ? 'debug' : 'info'
      /* --> Uncomment to add request logging
        requestFields: ['reqId', 'method', 'url', 'headers', 'body', 'query', 'params', 'duration'],
        logRequest: true
        */
    };
  }
```

### SSL (https support)

This template comes with SSL support right out of the box. The only things you need to configure in your configuration
file is the SSL_CERTIFICATE:

```typescript
  SSL_CERTIFICATE: {
    KEY: string;
    CERT: string;
    CA: string;
  };
```

Let's say we want to configure the production to enable HTTPS, simply open up the `src/config/production.json` file and configure it as followed:
```json
{
  ...
  "DB_URI": "production-mongo-uri",
  "CLIENT_URL": "http://yourwebsite.com",
  // You must create a certificate in order to enable SSL (you can use https://letsencrypt.org/ for a free certificate)
  "SSL": {
    "CA_PATH": "path/to/chain.pem",
    "PRIVATE_KEY_PATH": "path/to/privkey.pem",
    "CERTIFICATE_PATH": "path/to/cert.pem"
  }
  ...
}
```

Now when your server loads up, it will call this method in the `server.ts` file:
```typescript
  /**
   * Returns the SSL (https) if any configured for this environment.
   */
  getSSLConfigurations() {
    const sslConfig = config.SSL_CERTIFICATE;

    if (!sslConfig) return {};

    return {
      httpsPort: 443,
      httpsOptions: {
        key: sslConfig.KEY,
        cert: sslConfig.CERT,
        ca: sslConfig.CA
      }
    };
  }
```

### Authentication and roles

This template comes prepacked with JWT authentication and associated middlewares to authenticate users.
in the `src/auth.ts` file you will be able to see how the authentication is implemented.

Basically, when a login occurs, the user is being authenticated against a hased password using bcrypt, if the passwords match, a token is being generated containing the user data within.

When accessing guarded routes (using the authenticationMiddleware in the `auth.ts` file), the token will be decrypted and checked to see if it's valid. If so, the request will pass and a `req.user` property will be filled with currently logged on user.

For example, let's take a look at a guarded route, such as the `/api/profile`.

> TODO: Add correct information
In the `api.controller.ts` you can see the following code:

```typescript
  @Get('/profile')
  @UseBefore(AuthMiddleware)
  getProfile(@RequestUser() user: UserProfile): UserProfile {
    return user;
  }
```

The `UseBefore` decorator will call the `AuthMiddleware` to check if the user is authorized to login.

Simple isn't it? The token is being delivered in the Authorization header in the format of `Authorization: Bearer ${Token}`.

What about user roles? Each user profile has an array of `roles` which holds strings which contains the roles relevant for the user. For example, if you add the role `admin` to your user you should be able to access the `/api/admin_test` endpoint as it is guarded using the `AuthMiddleware`.

Let's see how it is implemented.

`api.controller.ts`:

```typescript
  @Get('/admin')
  @UseBefore(AuthMiddleware, { role: 'admin' })
  adminTest() {
    return this.test();
  }
```

#### Social Authentication

The procedure of social authentication takes place in the client side, after the client obtains an access token from the 3rd party (Google, Facebook), that access token
will be delieverd to the `social-login/provider` (replace provider with the 3rd party name), which will create a user from the token provided by accessing that specific
3rd party social network user profile information and map the user data into a data applicable for our website.

The authentication is implemented via the `passport` npm package with packages like `passport-facebook-token` and `passport-google-token`.
If A user with the provided email exists, it is returned with a new access token which is only relevant for our app (just like normal authentication).

Take a look at the `src/social-auth` implementation to see how the access token is being used.

### Environment configurations

This template is using the npm `config` package load configurations. You can read more about it here:
https://www.npmjs.com/package/config

All of the configurations are located at the `src/config` directory. The way it loads the configuration is by first loading the `default.json` files and then load the associated environment configuration (by default `development.json`).

In order to change the environment you must specify the `NODE_ENV` environment variable.

For example, if you run on production specify:
`NODE_ENV = production`.

There is a special configurations for the `test` environment as it starts up a test server on a different
port and different credentials.


### Testing (Unit Tests\API Tests)

This template comes with Mocha and Chai integrated.

There are tests for all of the following:

- API tests
- Tests for middlewares and services
- General tests

Each file that has a test has a corresponding `.spec` file with the same name.
For example, for the api tests:

`/src/controllers/api.controller.spec.ts` - you can find all api tests.


##### Test database

When the unit tests are running, they relay on a database connection, especially
the API tests, as these tests write mock data to the database before running the tests.

Before running the tests, you must setup the tests database.
You can do this easily using the following docker command:
> docker-compose up -d test-db

This will start a clean test database on a different port then the normal database.

##### Running the tests

In order to run the tests, enter the following commands:

```bash
# Start the test database before running the tests
docker-compose up -d test-db

### ---> Wait for the database to run (at least 30 seconds for the first time)

# Wait for the database to run, and then run the tests
npm test
```

All configurations will be taken from the `/src/config/test.json` file, which is configured by default
to connect a different port and a different user\password (test\test) in order to run the tests.

If you would like to run this in your own CI\CD tool, make sure write the following in the test run pipeline:

```bash
# Automatically sets up the database using docker-compose
export SETUP_DB=true
# Start the unit tests
npm test
```

This will automatically setup the test database and close it when the tests were finished.

## Sharing code (models, interfaces, etc)

You can use the `shared` directory in order for NodeJS and Angular to share the same code to be used on both sides
without the need of re-writing the models for each.

The already existing models are:

- ActionResponse - a simple response to a user action performed on the api. The server will send this response, and the client will read it.
- UserProfile - a simple user profile model to used for authentication.

## Form validations

This template comes with [class-validator](https://www.npmjs.com/package/class-validator) built in. Which makes it a-lot more easier to write form validations.
As this template shares code between Angular and NodeJS, validations will happen across both platforms.

Let's look at the `UserProfile` model for example:
```typescript
import { Form } from './forms';
import { UserProfile } from './user-profile';
import { IsEmail, MinLength } from 'class-validator';

export class UserProfileModel implements UserProfile {
  @IsEmail()
  email: string;

  @MinLength(1)
  firstName: string;
  @MinLength(1)
  lastName: string;
  @MinLength(6)
  password: string;

  roles?: string[];
}
```

The decorators you see like `@IsEmail`, `@MinLength` are class-validator decorators and allows us to easily force fields to pass certain validations.

For example, when registering a user validations takes place in this way:
- Angular - checks that all fields are valid using the `FormValidatorDirective`, each field on your form will automatically show if it is valid or invalid
  according to the validation set on it.

  The `FormValidatorDirective` is a directive set on a form which simply checks each input and according to it's name assigns the validations relative to it.
  Take a look at this example:


  `angular-src/src/app/components/register/register.component.html`:

  ```html
    ...
    <form #form="ngForm" class="col-12 form" [appFormValidator]="userProfile" [appFormValidatorForce]="true">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" name="email" [(ngModel)]="userProfile.email" id="email"
                  aria-describedby="helpId" placeholder="mail@gmail.com">
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input type="text" class="form-control" name="password" [(ngModel)]="userProfile.password" id="password"
                  aria-describedby="helpId" placeholder="Password">
              </div>

            </div>
      ...
  ```

  See the `appFormValidator` directive? it associated with the `userProfile` object, which is an instance of `UserProfileModel`. This allows you to easily
  Forces validations on forms and errors to the user.


- NodeJS - on the server side validations are taken place in this way:
  `/src/controllers/api.controller.ts`:

  ```typescript
  @Post('/register')
  register(@BodyParams() userProfile: UserProfile): Promise<UserProfile> {
    return registerForm.getHashedPassword().then(hashedPassword => {
      return UserProfileDbModel.create({
        ...registerForm,
        password: hashedPassword
      });
    });
  }
  ```

  The validation of class-validator will take place automatically using the class-validator, you can read about it here:
  [https://tsed.io/docs/validation.html#custom-validation](https://tsed.io/docs/validation.html#custom-validation).

  The pipes required for class-validator to take place, are already implemented at `/src/pipes`;

# Running on production

In order to run this code on production, you must first compile it.
There a few things to take into consideration:

## Running Angular and NodeJS on the same server

This template comes with Angular and NodeJS bundled together and can
be up and running together on the same NodeJS server. This takes place using the `build.sh` bash script
that knows how to compile them together and bundle them.

How does it work? Well it simply compiles each one seperatly and then copies the angular-src output dist directory
into the NodeJS src directory and delievers them in the `src/server.ts` like this:

```typescript
// Point static path to Angular 2 distribution
this.express.use(express.static(path.join(__dirname, 'dist')));

// Deliever the Angular 2 distribution
this.express.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
```

**Take into consideration that it will not work on debug mode.**

When building your image for production it should contain the following commands:

    npm run build # Call the build.sh script to start the build (it also installs the deps required if they do not exist)

And to run this code simple:

    npm start


### Docker\Docker-Compose

This template comes ready with Dockerfile based on node:12.18.1-alpine3.11 docker image.

It also comes with a ready out of the box docker-compose.yml file which can be used
to start-up the database and the web interface.


#### Docker-compose

You can fire-up the database and the web interface using the following command:

    # This will build web docker image automatically if it does not exist
    docker-compose up -d

You can also build the web image manually like this:

    docker-compose build web


The environment variable for communication using docker-compose is already included in the `.env` file.
This `.env` file contains the DB_URI of the database which the web will be able to to access.


#### Docker image build

In order to build the docker image without docker-compose, you can simply run the following command:

    docker build -t my-docker-image:0.0.0 .

And in order to run your docker on port 8080 simply run the following command:

    docker run -p 8080:3000 -itd my-docker-image:0.0.0

Or you can simply use docker compose:

    docker-compose up


This will run your container on port 3000.


### The build script (build.sh)

The build script called `build.sh` is a shell script provided with the template which by default will compile the typescript
NodeJS server side and Angular into one. This means when you run the server after the build you will have both on the same
node container.

Make sure to include the `NODE_ENV` environment variable (or else the build will be set to `development` environment) before calling this
script. The build will compile and copy all of the required configurations for the specified environment, and will generate the Angular
code according to that environment.

By default, when building to production, Server Side Rendering (SSR) is set to build as well:

```bash
# TODO: Remove this 'if' statment until the 'fi' if you don't want SSR at all
if [ $ENV == "production" ]; then
    echo "Building Angular app for SSR..."
    ./node_modules/.bin/ng run angular-src:server:production
    check_errcode "Failed to build Angular app for SSR! aborting script!"
else
    echo "Skipping build for SSR as environment is NOT production"
fi
```

You can remove this set of code if you don't want it to take place at all.


## Seperating client and server

### Server as standalone

In order to run the server as standalone, simply compile it:

    npm run build:node

The output will be projected into the `dist` directory.

### Angular as standalone

In order to run angular as a standalone, simply compile it:

    npm run build:angular

The output will be projected into the `angular-src/dist` directory.
