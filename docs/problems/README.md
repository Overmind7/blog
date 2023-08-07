---
sidebar: auto
---



[bash脚本问题](./bash脚本问题.md)





-----------

## Ubuntu

### [解决qt-qpa-xcb-could-not-connect-to-display问题](./解决qt-qpa-xcb-could-not-connect-to-display问题.md)

### [Ubuntu设置虚拟内存](./Ubuntu-设置虚拟内存.md)





### [screen安装与使用](./screen安装与使用.md)



### 修改文件夹权限

```bash
sudo chmod 777 /media/john/diskname
```

777 代表 修改，读取，执行



一般用 chown ，那个是更改所有者，添加权限就行了

> [Linux chmod 命令 | 菜鸟教程 (runoob.com)](https://www.runoob.com/linux/linux-comm-chmod.html)
>
> [Ubuntu下重命名硬盘以及修改权限](https://blog.csdn.net/qq_43577613/article/details/122422292)



### [重装Ubuntu-的-Nvidia-驱动](./重装Ubuntu-的-Nvidia-驱动.md)

### [Ubuntu挂载多个硬盘并赋予权限](./Ubuntu挂载多个硬盘并赋予权限.md)







-----------

----------------------------------------



#### 批量修改 JPEG 文件后缀

```bash
rename  's/\.JPG/.jpg/'  *.JPG
```





-----------------------------------------------

------------------------------------

## Docker


[使用-MobaXterm-连接-Docker-内环境](./使用-MobaXterm-连接-Docker-内环境.md)

### 使用 Docker 创建 conda 环境

::: warning

直接从在线的容器列表中找别人配好的容器吧，别浪费自己的时间了！

:::



搜索镜像 ：  

```bash
docker search anaconda
```

拉取镜像 ：  

```bash
docker pull continuumio/anaconda3
```

运行镜像 ：  

```bash
docker run -i -t -p 8888:8888 continuumio/anaconda3 /bin/bash
# 上面把宿主的 8888 绑定到容器的8888 端口，jupyter notebook 一般用 8888 端口
docker run -i -t -p 50022:22 continuumio/anaconda3 /bin/bash
# ssh 端口默认是 22 
```

运行完会直接进入容器

> [docker安装anaconda3_docker anaconda3_felix小康的博客-CSDN博客](https://blog.csdn.net/qq_42494445/article/details/117443809)



### ImportError: libGL.so.1: cannot open shared object file: No such file or directory
> [【转载】 ImportError: libGL.so.1: cannot open shared object file: No such file or directory——docker容器内问题报错 - 走看看 (zoukankan.com)](http://t.zoukankan.com/devilmaycry812839668-p-13852644.html)



```bash
sudo apt update
sudo apt install libgl1-mesa-glx
```

如果容器内没有 `sudo` 指令，可以：

```bash
apt-get update
apt-get install sudo
```

