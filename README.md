<div align=center>

# JAK-Mobile-App

![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=for-the-badge&logo=EXPO&labelColor=f3f3f3&logoColor=000)

<br>

<a href="">
    <img
        src="https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App/blob/main/assets/downloadButtons/google.png?raw=true"
        alt="Get it on Google Play"
        style="max-width: 153px; max-height: 46px;"
    />
</a>

<a href="">
    <img
        src="https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App/raw/main/assets/downloadButtons/apple.png?raw=true"
        alt="Download on the App Store"
        style="max-width: 153px; max-height: 46px;"
    />
</a>

</div>

## Steps

### Clone the Repository

To Clone this Repository, open a terminal in a empty folder and type

```bash
git clone https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App.git
```

### Installing The Required Modules

To install the required modules, just open a terminal in the directory where this
project is cloned. Now type:

```bash
npm i
# or
yarn
```

and hit enter.

### Getting Firebase Credentials

Go to [Firebase Console](http://console.firebase.google.com/) and create a Project. Don't
enable Google Analytics. Now click on the Web Icon and create an app. After you created
an app click on the cog icon in the sidebar and click on Project Settings. Scroll to the
Bottom where you will find your app now click on Config. Copy the Config.

#### Enabling Firebase Authentication

In the Project in Firebase click on Authentication in the Sidebar. Enable
Authentication.

##### Email/Password

Click on `Email/Password` in the Authentication tab and Enable It.

##### Google

Click on `Google` in the Authentication tab and Enable It.

##### Apple

Click on `Apple` in the Authentication tab and Enable It.

#### Enabling Firestore Database

In the Project in Firebase click on Firestore Database in the Sidebar. Click on Enable
Firestore. Start in Test Mode and leave the Timezone as it is.

#### Enabling Firebase Storage

In the Project in Firebase click on Storage in the Sidebar. Click on Enable.
(Sometimes Sotrage is automatically Enabled)

### Providing required Credentials

Create a file name `.env` in the Base Directory. Copy everything in `.env.example`
and paste it in `.env` but change the credentials.

### Starting the App

#### Android

If you are in Windows: Download [Android Studio](https://developer.android.com/studio)

```bash
npm run android
# or
yarn android
```

#### IOS

If you are in MAC: Download [XCode](https://developer.apple.com/xcode/)

```bash
npm run ios
# or
yarn ios
```

#### Web

```bash
npm run web
# or
yarn web
```

### Deploying edited Firebase Rules or Indexes

#### Install required Dependency

In a Terminal in the Base Directory type

```bash
npm install -g firebase-tools
# or
yard global add firebase-tools
```

and press Enter.

#### Login

In a Terminal in the Base Directory type

```bash
firebase login
```

and press Enter. You will be Redirected to a Web Page, Login with your Google Account
that has your Firebase Project.

#### Initialize Firebase

In a Terminal in the Base Directory type

```bash
firebase init firestore, storage
```

and press Enter. Now select `Use an Existing Project` and hit Enter. Now select your
Project and press Enter.

#### Edit the Rules and Indexes

##### Cloud Firestore

-   Rules: `firestore.rules`
-   Indexes: `firestore.indexes.json`

##### Firebase Storage

-   Rules: `storage.rules`

#### Publish

In a Terminal in the Base Directory type

```bash
npm run publish:firebase
```

and press Enter.

## Technology(s) Used

-   Language: [JavaScript](https://www.javascript.com/)
-   Language Framework: [React Native](https://reactnative.dev/)
-   Backend: [Node JS](https://nodejs.org/), [Firebase](https://firebase.google.com/)
-   CLI: [Expo](https://expo.io/)

## Contributors

<a href = "https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App/graphs/contributors">
	<img src = "https://contrib.rocks/image?repo=Jonak-Adipta-Kalita/JAK-Mobile-App" />
</a>
