#!/bin/bash

bucket_name="$1"
cloudfront_dist_id="$2"
echo Uploading to ${bucket_name}
aws s3 cp --recursive ./dist s3://${bucket_name}/
aws s3 cp --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./dist/index.html s3://${bucket_name}/
aws cloudfront create-invalidation --distribution-id ${cloudfront_dist_id} --paths /index.html
