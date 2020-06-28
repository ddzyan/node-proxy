## 简介

使用 nodejs 实现 ngxin 反向代理和负载均衡(权重模式)功能

已完成内容：

1. http 请求转发
2. 代理服务心跳监测
3. 负载均衡权重模式

未完成内容：

1. 请求配置缓存，减少转发次数
2. 配置信息未需要支持热加载
3. 支持 https , ws 和 wss 协议
4. 请求和返回日志输出到本地文件

## 安装和启动

```shell
npm i

# 启动代理服务
node ./service/index.js

# 启动转发服务
node ./index.js
```

## 项目架构

<img src="https://i.imgur.com/TcJKWyr.png" width = "100%" height = "70%" alt="" align=center />

<img src="https://i.imgur.com/QImtb7p.png" width = "100%" height = "70%" alt="" align=center />
