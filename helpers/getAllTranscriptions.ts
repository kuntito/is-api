import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import s3Client from "../services/s3Client"
import { envConfig } from "../envConfig/.envConfig"
import { TRANSCRIPTIONS_DIR } from "./uploadTranscription"

const getAllTranscriptions = async () => {
    const listObjRes = await s3Client.send(new ListObjectsV2Command({
        Bucket: envConfig.AWS_BUCKET_NAME,
        Prefix: `${TRANSCRIPTIONS_DIR}/`
    }))

    if (!listObjRes.Contents) return [];

    const transcriptions = await Promise.all(

        listObjRes.Contents.map(async (item) => {
            const getResponse = await s3Client.send(new GetObjectCommand({
                Bucket: envConfig.AWS_BUCKET_NAME,
                Key: item.Key,
            }));

            const text = await getResponse.Body?.transformToString();
            
            return text
        })
    )

    return transcriptions;
}

export default getAllTranscriptions;