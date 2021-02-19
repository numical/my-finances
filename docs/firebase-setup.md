# Firebase Setup
* Currently using Firebase as free 'Spark' billing option offers HTTPS static website
* cannot use `firebase` command line as project not enabled for firebase
* have to use [firebase console](https://console.firebase.google.com) to add project
* plan defaults to paid 'Blaze' so revert to 'Spark' in UI then reenable billing for GCP:
  * `gcloud beta billing projects link my-finances-page --billing-account=0118EE-C0AC1A-AB5E21`
* add files to `public` directory
* `firebase deploy`
* modify domain to point to firebase:


# Firestore Setup
* have to use console
* native mode / multi-region (eur) as no europe-west1 option

## Is there a useable CLI?
* https://cloud.google.com/firestore/docs/reference/rest/

