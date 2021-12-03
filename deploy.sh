#! /bin/bash

ssh -T lian 'rm -rf /home/lian/static/blog-browser/*'
scp output/blog.zip lian:/home/lian/static/blog-browser/
ssh lian 'cd /home/lian/static/blog-browser/ && unzip -q blog.zip'