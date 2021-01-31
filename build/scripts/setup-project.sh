#!/bin/bash

PROJECT_NAME="$1"

echo Creating project...
gcloud projects create $PROJECT_NAME --name=$PROJECT_NAME --organization=379324684039
gcloud beta billing projects link  $PROJECT_NAME --billing-account=0118EE-C0AC1A-AB5E21

echo Setting config...
gcloud config set project $PROJECT_NAME
gcloud config set run/platform managed
gcloud config set run/region europe-west1

echo Enabling services...
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

echo Project $PROJECT_NAME successfully set up.
