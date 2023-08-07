---
sidebar: auto
---



# 使用 MobaXterm 连接 Docker 内环境

## 创建容器

SSH 默认端口是22，将宿主机器的空闲端口映射到容器端口 22，比如 50022

此时在外部访问宿主机 50022 端口就相当于在访问容器的 22 端口

```bash
docker pull ubuntu:latest
docker run -it --privileged=true -p 50022:22 --name ubuntu  ubuntu bash

# 在容器中安装某些大型软件，如matlab时可能需要让--privileged=true, 
# -p后跟端口映射，--name后跟你喜欢的容器名，-v后跟地址映射，根据你的需求来指定文件夹
# -v /d/docker/ubuntu_fsl_disp:/shared_data

```



## 安装常用软件

```bash
apt-get update
apt-get install vim
apt-get install git
apt-get install net-tools
```



## 配置 SSH 链接

容器中安装 SSH Server

```bash
apt-get install openssh-server
```

修改sshd_config，开放22端口，并允许密码登录

```bash
echo "Port 22">>/etc/ssh/sshd_config
echo "PermitRootLogin yes">>/etc/ssh/sshd_config
```

启动ssh服务

```bash
service ssh start
```

查看ssh状态

```bash
service ssh status
```

先设置容器root用户密码，没有密码外部无法登陆。

```bash
passwd
```

查看22端口是否处于监听状态。

```bash
netstat -ap | grep ssh
```

若不是，`service ssh restart`重启一下SSH



- 设置 MobaXterm，Host 地址是 WSL 的 IPV4 地址，需要上面设置的账号和密码

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202210141732073.png" style="zoom:80%;" />





> [Docker容器使用MobaXterm连接_wooyang2018的博客-CSDN博客_docker mobaxterm](https://blog.csdn.net/wooyang2018/article/details/113090465)
