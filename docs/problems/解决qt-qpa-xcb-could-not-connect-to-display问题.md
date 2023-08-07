# 解决qt-qpa-xcb-could-not-connect-to-display问题

## 出现原因

远程调用 Linux GUI 时报错：

```bash
qt.qpa.xcb: could not connect to display
qt.qpa.plugin: Could not load the Qt platform plugin "xcb" in "/root/anaconda3/lib/python3.8/site-packages/cv2/qt/plugins" even though it was found.
This application failed to start because no Qt platform plugin could be initialized. Reinstalling the application may fix this problem.

Available platform plugins are: xcb, eglfs, minimal, minimalegl, offscreen, vnc
```

![](https://raw.githubusercontent.com/Overmind7/images/main/image-20230323150239950.png)



## 解决方法

安装 Xorg

> Xorg是X11的实现，负责连接到Xserver进行输入和输出。

```bash
sudo apt-get install xorg
```

重启 ssh 服务

```bash
service ssh restart
```





[解决qt.qpa.xcb: could not connect to display问题_pycharm中qt.qpa.xcb: could not connect to display 1_](https://blog.csdn.net/qq_42840203/article/details/127935439)
