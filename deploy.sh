#! /bin/bash

STATIC_PATH=/home/www/static/blog-snowy-browser/

ssh -T tianyi 'rm -rf '${STATIC_PATH}'*'
scp output/blog.zip tianyi:${STATIC_PATH}
ssh tianyi 'cd '${STATIC_PATH}' && unzip -q blog.zip'