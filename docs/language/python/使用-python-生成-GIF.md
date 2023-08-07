---
sidebar: auto
---



#  使用 python 生成 GIF


有一串图片，要生成 GIF 动画

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202210101545058.gif" alt="传统方法" style="zoom:80%;" />

```python
import imageio
from pathlib import Path


def imgs2gif(imgPaths, saveName, duration=None, loop=0, fps=2):
    """
    生成动态图片 格式为 gif
    :param imgPaths: 一系列图片路径
    :param saveName: 保存gif的名字
    :param duration: gif每帧间隔， 单位 秒
    :param fps: 帧率
    :param loop: 播放次数（在不同的播放器上有所区别）， 0代表循环播放
    :return:
    """
    if fps:
        duration = 1 / fps
    images = [imageio.imread(str(img_path)) for img_path in imgPaths]
    imageio.mimsave(saveName, images, "gif", duration=duration, loop=loop)


pathlist = Path(r"E:/Work/SLAM-2D-LIDAR-SCAN/Output").glob("*.png")

p_lis = []
for n, p in enumerate(pathlist):
    if n % 5 == 0:
        p_lis.append(p)

imgs2gif(p_lis, "exp.gif", 0.033 * 5, 0)
# imgs2gif(p_lis, "exp2.gif", 0.033 * 5, 1)

```



> [python生成gif](https://blog.csdn.net/qq_42886289/article/details/115911308)
