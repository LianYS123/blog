#! /bin/bash

ssh -T lian 'rm -rf /home/lian/static/blog-admin/*'
scp output/blog.zip lian:/home/lian/static/blog-admin/
ssh lian 'cd /home/lian/static/blog-admin/ && unzip -q blog.zip'