import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class FirebaseService {
  private readonly app: FirebaseApp;

  constructor(private readonly configService: ConfigService) {
    this.app = initializeApp({
      apiKey: this.configService.get('FIREBASE_API_KEY'),
      authDomain: this.configService.get('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get('FIREBASE_PROJECT_ID'),
      storageBucket: this.configService.get('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get('FIREBASE_MESSAGING_SENDER_ID'),
      appId: this.configService.get('FIREBASE_APP_ID'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const storage = getStorage(this.app);
    const storageRef = ref(storage, `uploads/${file.originalname}`);

    try {
      const snapshot = await uploadBytes(storageRef, file.buffer);
      console.log('Uploaded a blob or file!', snapshot);

      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);

      return downloadURL;
    } catch (error) {
      console.error('Upload failed', error);
      throw new InternalServerErrorException(
        'File upload failed. Please try again later.',
      );
    }
  }
}
