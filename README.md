<div align=center>

# JAK-Mobile-App

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
Bottom where you will find your app now click on CDN. Copy the Config.

#### Enabling Authentication
In the Project in Firebase click on Authentication in the Sidebar. Enable 
Authentication. Now click on `Email/Password` and Enable It.

#### Enabling Firestore Database
In the Project in Firebase click on Firebase Database in the Sidebar. Click on Enable 
Firestore. Start in Test Mode and leave the Timezone as it is. Now click on Rules and set
the rules as:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

### Providing required Credentials
Create a file name `.env.local` in the Base Directory. Copy everything in `.env.example`
and paste it in `.env.local` but change the credentials.

### Starting the App:

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

## Technology(s) Used
- Language: [JavaScript](https://www.javascript.com/)
- Language Framework: [React Native](https://reactnative.dev/)

## Contributors
<a href = "https://github.com/Jonak-Adipta-Kalita/JAK-Mobile-App/graphs/contributors">
	<img src = "https://contrib.rocks/image?repo=Jonak-Adipta-Kalita/JAK-Mobile-App" />
</a>
