<div align=center>

# JAK-Mobile-App

![Runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=for-the-badge&logo=EXPO&labelColor=f3f3f3&logoColor=000)
![License](https://img.shields.io/github/license/Jonak-Adipta-Kalita/JAK-Mobile-App?style=for-the-badge)
![Support for IOS](https://img.shields.io/badge/iOS-4630EB.svg?style=for-the-badge&logo=APPLE&labelColor=999999&logoColor=fff)
![Support for Android](https://img.shields.io/badge/Android-4630EB.svg?style=for-the-badge&logo=ANDROID&labelColor=A4C639&logoColor=fff)
![Support for Web](https://img.shields.io/badge/web-4630EB.svg?style=for-the-badge&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff)
![GitHub Repo Stars](https://img.shields.io/github/stars/Jonak-Adipta-Kalita/JAK-Mobile-App?style=for-the-badge)
![GitHub Forks](https://img.shields.io/github/forks/Jonak-Adipta-Kalita/JAK-Mobile-App?style=for-the-badge)
![GitHub Watchers](https://img.shields.io/github/watchers/Jonak-Adipta-Kalita/JAK-Mobile-App?style=for-the-badge)
![Made by JAK](https://img.shields.io/badge/BeastNight%20TV-Made%20by%20JAK-blue?style=for-the-badge)

[![Get it on Google Play](https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App/blob/main/assets/images/downloadButtons/google-play.png?raw=true, "Get it on Google Play")]()
[![Download on the App Store](https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App/raw/main/assets/images/downloadButtons/app-store.png?raw=true, "Download on the App Store")]()

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

Go to [Firebase Console](http://console.firebase.google.com/) and create a Project. Enable
Google Analytics. Now click on the Web Icon and create an app. After you created an app
click on the cog icon in the sidebar and click on Project Settings. Scroll to the Bottom
where you will find your app now click on Config. Copy the Config.

#### Get `google-services.json`

Go to [Firebase Console](http://console.firebase.google.com/) and Select your Project.
Click on the cog icon in the sidebar and click on Project Settings. Now in bottom click on
`Add App` and select the Android Logo. Now register your Android app (use
`host.exp.exponent` as the Package Name). After the setup open a terminal in the Base
Directory use this commands:

```bash
yarn build:android
```

after that command do this command (You'll need Java JDK to use this command):

```bash
expo fetch:android:hashes
```

this will give you the `SHA-1` and the `SHA-256` fingerprints. Paste them in your Android
App in Firebase Console then Download the `google-services.json` and put it in the Base Directory of the Project.

#### Get `GoogleService-Info.plist`

Go to [Firebase Console](http://console.firebase.google.com/) and Select your Project.
Click on the cog icon in the sidebar and click on Project Settings. Now in bottom click on
`Add App` and select the IOS Logo. Now register your IOS app (use `host.exp.exponent` as
the Bundle ID) and also don't forget to download the `GoogleService-Info.plist` (after
completing the setup) and put it in the Base
Directory of the Project.

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
npm run start:android
# or
yarn start:android
```

#### IOS

If you are in MAC: Download [XCode](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio)

```bash
npm run start:ios
# or
yarn start:ios
```

#### Web

```bash
npm run start:web
# or
yarn start:web
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
