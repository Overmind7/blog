---
sidebar: auto
---





# Shell 脚本问题



## bad interpreter

在我看来，您的文件副本有DOS/Windows风格的行尾(回车符后跟换行符)，而不是unix风格的行尾(仅仅是换行符)；这让shell非常困惑，因为它认为回车符是命令的一部分(导致命令找不到错误)，还会给出乱码错误消息。

您可以通过打印脚本文件来检查，例如`cat -vet /usr/local/app2/aaa.sh` --如果行以`^M$` 结束，则以DOS/Windows结束，如果它们仅以`$`结束，则以unix结束。

您到底是如何复制脚本的？



> 一 概述
>      今天我在执行shell脚本 `./xx.sh` 的时候提示了/bin/bash^M: bad interpreter；
>
> 二 解决过程
>
> 通过vim编辑工具打开文件：
>
> 然后输入：set ff?
>      显示为：fileformat＝dos
>
> 最后输入：set ff = unix即可
>
> 我的大概理解为文件在Windows上编辑过，倒是文档字符与Linux文档字符不匹配导致。
>
> 具体原因后续学习相关知识再来补充。。。
>
> ————————————————
>
> 版权声明：本文为CSDN博主「至学者」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
> 原文链接：https://blog.csdn.net/calm_encode/article/details/122294045



## “-usr-bin-env-bashr-没有那个文件或目录

用 ./ 运行bash脚本文件出现 报错信息 /usr/bin/env: "bash\r": 没有那个文件或目录

错误原因：这主要是因为bash后面多了\r这个字符的原因。

在linux终端下，输出\r会什么都不显示，只是把光标移到行首。于是终端虽然输出了/usr/bin/env bash，但是碰到\r后，光标会被移到行首，接着输出了:No such file or directory把前面的覆盖掉了。于是出现了那个莫名其妙的出错信息了

解决办法：

- 用vim打开sh脚本文件， 重新设置文件的格式

```bash
:set ff #然后回车  再重新设置下文件格式：

:set ff=unix #然后保存退出

:wq! #回车
```

————————————————
版权声明：本文为CSDN博主「程序员小熊」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xiongchun11/article/details/78832947
