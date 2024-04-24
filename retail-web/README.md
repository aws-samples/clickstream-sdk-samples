# Retail Demo Store Web UI

The website is a purely static retail web store modified from [aws-samples/retail-demo-store](https://github.com/aws-samples/retail-demo-store). You can quickly deploy and use it locally without relying on the deployment of any service resources. Additionally, we have pre-integrated the [Clickstream Web SDK](https://github.com/awslabs/clickstream-web) to demonstrate how to integrate the SDK and collect data in an e-commerce web application.

## Local deploy
1. After cloning this repository, download the product images ZIP resources from the [link](https://code.retaildemostore.retail.aws.dev/images.tar.gz) and unzip the files.
2. After unzip the files, you will get an `images` folder, let's copy this folder into this project root folder. The path to the folder should be `retail-web/images/`.
3. Next, execute the following command to install the dependencies and start the website locally.
   ```bash
   npm i && npm run dev
   ```
   Then you can access it in your browser at [http://localhost:8080](http://localhost:8080).

## Configure Clickstream SDK

You can edit the `.env` file to and input your appId and endpoint:
```bash
VITE_CLICKSTREAM_APPID=your appId
VITE_CLICKSTREAM_ENDPOINT=your endpoint
```

Or you can click the "Shop" dropdown at the top of the homepage, then select "Configure Clickstream" to enter the Clickstream SDK configuration page. Next, input your appId and endpoint.


## Configure SensorData and Firebase SDK
In this demo application, you can also simultaneously use Sensor Data Web SDK and the Firebase Web SDK to send data with Clickstream Web SDK. You can configure Firebase and the Sensor SDK as follows:

```bash
// Configure Sensor Data SDK
VITE_SENSORDATA_APPID=your appId
VITE_SENSORDATA_ENDPOINT=your endpoint

// Configure Firebase SDK
VITE_FIREBASE_CONFIG={apiKey:'xxx',authDomain:'xxx',projectId:'xxx',storageBucket:'xxx',messagingSenderId:'xxx',appId:'xxx',measurementId:'G-xxx'}
```

## Use your own deployed API

If you follow [Deployment Instructions](https://github.com/aws-samples/retail-demo-store/blob/master/Deployment-Instructions.md) and have deployed related resources in your AWS account, you can also directly use your remote API to access our web-ui, modify as follows:
1. Copy all content in your `.env` file which contains your service API such as `PRODUCTS_SERVICE_DOMAIN`,`USERS_SERVICE_DOMAIN` and `CARTS_SERVICE_DOMAIN`, and paste it to the bottom of our `.env` file.
2. Modify use local data variable in the `.env` file to false
   ```bash
   VITE_USE_LOCAL_DATA=false
   ```
Then you can execute `npm run dev` to preview retail website with your own API.
