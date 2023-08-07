## 安装自定义显卡驱动版本号

[官方驱动 | NVIDIA](https://www.nvidia.cn/Download/index.aspx?lang=cn)

在英伟达官网找到合适的驱动版本

禁用系统自带的 nouveau 驱动：

```bash
sudo vim /etc/modprobe.d/blacklist-nouveau.conf
```

添加黑名单：写上 `blacklist nouveau`

然后更新

```bash
sudo update-initramfs -u
```

但是有些人禁用后，输入

`lsmod | grep nouveau`

检查，还是有输出
那就改写成下面这样：

```bash
blacklist nouveau
blacklist lbm-nouveau
options nouveau modeset=0
alias nouveau off
alias lbm-nouveau off
```

重启后`ctrl` + `alt` + `F1`进入命令行，开始操作

```bash
$sudo service lightdm stop

# 进入驱动目录 ---- 第三步的作用
# username是你自己的用户名/down是上面建立的，放我们下载的驱动文件
$cd /home/username/down

# 更改权限，tab补全名字
$sudo chmod a+x NVIDIA-Linux-x86_64-430.34.run

''' 安装 非常重要*****'''
|||||||||||||||||||||||||||||||||||||||||||||||||||||
$sudo ./NVIDIA-Linux-x86_64-390.77.run
	'''这里开始就很骚了,大概率会提示你'''
	the distribution-provided pre-install scipt failed，是否继续安装？
	'''如果你从来没有安装过nvidia驱动，甚至方法一都没有安装过，就走如下流程：'''
	# 1.按“continue”；
	# 2.问你装32-bit库吗？按'NO' ，如果没问就是‘Warning...’无视它，点`OK`
	# 3.问你“would you like to run the nvidia-xconfig ...”  按'NO'
	# 4.一般会让你确认细节，点`ok`
|||BUT||BUT|||||BUT|||||BUT||||BUT||||BUT||||||BUT||||
	'''如果你安装过驱动，请按'取消安装'，按以下流程走：'''
$sudo apt-get remove --purge nvidia*	 # 1.删除以前安装的文件
$sudo ./Nvidiaxxxx你下载的驱动具体名字.run -uninstall 	 # 2.卸载文件内容
	''' 3. 回到上面的第六步和第七步，重新弄一遍'''
$sudo reboot  # 重启

$sudo ./NVIDIA-Linux-x86_64-390.77.run # 4. 再安装
	# 还是会提醒的，遇到警告也不怕
		# 5.按“continue”；
		# 6.问你装32-bit库吗？按'NO'
		# 7.问你“would you like to run the nvidia-xconfig .......”  按'NO'

# 开机～
$sudo service lightdm start
```

