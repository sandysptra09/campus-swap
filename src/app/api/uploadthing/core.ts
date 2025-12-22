import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getUserFromRequest } from '@/lib/auth';

const f = createUploadthing();

export const ourFileRouter = {

    imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(async ({ req }) => {

            const user = await getUserFromRequest();

            if (!user) throw new UploadThingError('Unauthorized');

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            console.log('Upload complete for userId:', metadata.userId);
            console.log('file url', file.ufsUrl);

            return { uploadedBy: metadata.userId, url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;