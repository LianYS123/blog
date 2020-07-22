自动化部署思路：
1. 在github上配置webhooks，在每次push成功后向自己的服务器发一条请求
2. 服务器接收到请求，执行指定的操作（一个shell脚本）：如git pull等
