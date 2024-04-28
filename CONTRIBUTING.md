## Contributing

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
eas credentials
```

this will give you the `SHA-1` and the `SHA-256` fingerprints. Paste them in your Android
App in Firebase Console then Download the `google-services.json`. Rename it to
`google_services_android.json` and put it in the Base Directory of the Project.

#### Get `GoogleService-Info.plist`

Go to [Firebase Console](http://console.firebase.google.com/) and Select your Project.
Click on the cog icon in the sidebar and click on Project Settings. Now in bottom click on
`Add App` and select the IOS Logo. Now register your IOS app (use `host.exp.exponent` as
the Bundle ID) and also don't forget to download the `GoogleService-Info.plist` (after
completing the setup). Rename it to `google_services_ios.plist` and put it in the Base
Directory of the Project.

#### Enabling Firebase Authentication

In the Project in Firebase click on Authentication in the Sidebar. Enable
Authentication.

##### Email/Password

Click on `Email/Password` in the Authentication tab and Enable It.

#### Enabling Firestore Database

In the Project in Firebase click on Firestore Database in the Sidebar. Click on Enable
Firestore. Start in Test Mode and leave the Timezone as it is.

#### Enabling Firebase Storage

In the Project in Firebase click on Storage in the Sidebar. Click on Enable.
(Sometimes Storage is automatically Enabled)

### Providing required Credentials

Create a file name `.env` in the Base Directory. Copy everything in `.env.example`
and paste it in `.env` but change the credentials.

### Starting the App

#### Android

If you are in Windows: Download [Android Studio](https://developer.android.com/studio)

```bash
npm run start:android
# or
yarn start
```

#### IOS

If you are in MAC: Download [XCode](https://developer.apple.com/xcode/)

```bash
npm run start:ios
# or
yarn start
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
# or
yarn publish:firebase
```

and press Enter.
