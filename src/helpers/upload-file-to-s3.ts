const fileUpload = async (base64) => {

  // You can either "yarn add aws-sdk" or "npm i aws-sdk"
  const AWS = require("aws-sdk");

  // Configure AWS with your access and secret key.
  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env;

  // Configure AWS to use promise
  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });

  // Create an s3 instance
  const s3 = new AWS.S3();

  // Ensure that you POST a base64 data to your server.
  // Let's assume the variable "base64" is one.
  const base64Data: any = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");

  // Getting the file type, ie: jpeg, png or gif
  const type = base64.split(";")[0].split("/")[1];

  // Generally we'd have an userId associated with the image
  // For this example, we'll simulate one

  // With this setup, each time your user uploads an image, will be overwritten.
  // To prevent this, use a different Key each time.
  // This won't be needed if they're uploading their avatar, hence the filename, userAvatar.js.
  const params = {
    Bucket: S3_BUCKET,
    Key: `${new Date().getTime()}.${type}`, // you can also send userID in palce of time stamp or anything imp.
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };

  // tslint:disable-next-line: max-line-length
  // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
  // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const { Location, Key } = await s3.upload(params).promise();
  // Save the Location (url) to your database and Key if needs be.
  // As good developers, we should return the url and let other function do the saving to database etc

  return { Location, Key };

  // To delete, see: https://gist.github.com/SylarRuby/b3b1430ca633bc5ffec29bbcdac2bd52
};

export default fileUpload;
