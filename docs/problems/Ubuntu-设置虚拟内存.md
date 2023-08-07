---
sidebar: auto
---

# Ubuntu 设置虚拟内存

什么是swap？

> swap 简单的说就是将硬盘当内存用，用于解决内存容量不足的情况。



## 设置 swap

1. 查看当前系统是否设置了swap

```bash
free -m
#swap栏都是 0 0 0 表示没有设置
```

![image-20230322201925248](https://raw.githubusercontent.com/Overmind7/images/main/image-20230322201925248.png)

2. 创建 swap 文件

使用下面命令创建交换文件。因为要分配硬盘空间，需要一点时间。count=4096 表示创建 4GB 的虚拟内存，单位是 M

```bash
sudo dd if=/dev/zero of=/swapfile count=4096 bs=1M
#查看swap文件是否创建好了
ls / | grep swapfile
```



3. 激活 Swap 文件

    ```bash
    sudo chmod 600 /swapfile
    # 获得文件权限
    sudo mkswap /swapfile
    # 设置为 swapfile
    ```

4. 挂载 swapfile

```bash
sudo swapon /swapfile
```

5. 设置开机自启

```

```





## 删除 swap

```bash
#首先输入以下命令停用 SWAP 空间：
sudo swapoff -v /swapfile

#在 /etc/fstab 文件中删除有效 swap 的行

#最后执行以下命令删除 swapfile 文件：
sudo rm /swapfil
```

