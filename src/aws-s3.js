import {RNS3} from 'react-native-aws3'

import {
    secretKey,
    accessKey
} from '../private'

const bucket = "rep-app-image-video"
const region = "us-west-2"
const keyPrefix = "public/"

const AWS_UPLOAD_OPTIONS = {
    secretKey,
    accessKey,
    bucket,
    region,
    keyPrefix
}

const fileTypeHandler = {
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    mp4: 'video/mp4',
    mov: 'video/mov',
}

const v4 = a =>
a ? (a ^ Math.random() * 16 >> a / 4).toString(16)
: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, v4)

const uploadAWS = file => RNS3.put(file, AWS_UPLOAD_OPTIONS)

const getFileExt = path => path
	.replace('ext=', '.')
	.split('.')
	.pop()
	.toLowerCase()

const getFileType = path => fileTypeHandler[getFileExt(path)]

const createName = path => [v4()].concat(getFileExt(path)).join('.')

const getUploadArgs = path => ({
    uri: path,
    name: createName(path),
    type: getFileType(path),
})


export const getPathAWS = name =>
`https://s3-${region}.amazonaws.com/${bucket}/${keyPrefix}${name}`
export const awsUploader = filepath => uploadAWS(getUploadArgs(filepath))


const handleProgressAWS = callback => ({total, loaded}) => {
    const progress = loaded / total

    if (progress === 1) {
        return callback(0)
    }

    callback(progress)
}

export const handleUploadToAWS = ({path, handleProgress, handleResult}) =>
    awsUploader(path)
    .then(({body: {postResponse: {location}}}) => handleResult(location))
    .catch(console.error)
    .progress(handleProgressAWS(handleProgress))
