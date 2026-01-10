import { randomUUID } from "crypto";
import s3Client from "../services/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { envConfig } from "../envConfig/.envConfig";

const uploadTranscription = async (text: string) => {
    const id = randomUUID();
    const s3Key = `transcriptions/${id}.txt`

    await s3Client.send(new PutObjectCommand({
        Bucket: envConfig.AWS_BUCKET_NAME,
        Key: s3Key,
        Body: text,
        ContentType: "text/plain"
    }))
}

export default uploadTranscription;
