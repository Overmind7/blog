---
sidebar: auto
---

# Ubuntu挂载多个硬盘并赋予权限

1. 查看自己的硬盘信息

```bash
sudo fdisk -l
```

<!--more-->

2. 创建挂载的目录

其实就是一个文件夹



3. 格式化需要挂载的硬盘

```bash
sudo mkfs.ext4 /dev/sdb
```



4. 记录需要挂载硬盘的 UUID

```bash
sudo blkid
```



5. 编辑/etc/fstab文件

```bash
sudo vim /etc/fstab
```



6. 重启

```bash
reboot
```



7. 查看是否挂载成果

```bash
df -h
```



8. 在挂载成功以后，发现没有权限操作硬盘

无法直接通过右键中的Copy、Move等操作硬盘。只能通过命令行中的sudo move等命令来操作。

> 进入硬盘，右键，打开终端，可以看见硬盘的名字。

```bash
sudo chown -R 用户名 硬盘名字
```

修改名字

```bash
sudo e2label /dev/sdb(位置) 新名字1
```

