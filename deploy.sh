#! /bin/bash

ssh -T lian 'rm -rf /home/lian/static/blog-snowy-browser/*'
scp output/blog.zip lian:/home/lian/static/blog-snowy-browser/
ssh lian 'cd /home/lian/static/blog-snowy-browser/ && unzip -q blog.zip'