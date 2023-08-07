---
sidebar: auto
---

# screen安装与使用

## 1.检查是否已安装 screen

```bash
screen -ls
```

输出显示 

```
bash: screen: command not found
```

 说明容器内没有安装 screen。

<!--more-->

## 2.安装 screen

```bash
apt-get install screen
```



## 3.创建一个 screen 会话

```bash
screen -S your_screen_name
```

此时可以输入命令，列出所有的 screen：

```bash
screen -ls
```



## 4.断开与当前 screen 连接

断开连接，让服务器端继续运行任务：`ctrl + a + d`



## 5.恢复某 screen 会话

输入命令回到 screen 会话

```bash
screen -r [会话ID|会话名称]
```

回到指定会话，可以是会话名称，也可以是会话ID



## 6.删除不需要的 screen

查看所有的 screen：`screen -ls`

现在想要删除名叫 invalid_screen 的 screen 会话

输入命令： 

```bash
screen -S invalid_screen -X quit
```





> 主要参考：[ 学习记录：Screen的安装与使用方法（Ubuntu）_linbai_6.6的博客-CSDN博客_screen ubuntu](https://blog.csdn.net/weixin_42282335/article/details/119113298?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-2-119113298-blog-78475013.pc_relevant_multi_platform_whitelistv2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-2-119113298-blog-78475013.pc_relevant_multi_platform_whitelistv2&utm_relevant_index=3)