import { getApps, getApp, initializeApp, deleteApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCK61_bB72pKVR35xPGZ3FqrzsAIWqGi1w',
	authDomain: 'mypostapp-28ac8.firebaseapp.com',
	projectId: 'mypostapp-28ac8',
	storageBucket: 'mypostapp-28ac8.appspot.com',
	messagingSenderId: '870759706111',
	appId: '1:870759706111:web:a3a194419c705194810bca'
};

let firebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	(firebaseApp = getApp()), deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
