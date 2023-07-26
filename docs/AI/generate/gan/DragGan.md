# Drag GAN



![image-20230610121650716](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230610121650716.png)

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230610121706201.png" alt="image-20230610121706201" style="zoom:50%;" />



## Motion Supervision

GAN 生成的中间 feature 具有很强的语义性

Handle Point

Target Point

> 如何监督 GAN 生成图像的点运动之前还没有太多探索。在这项工作中，我们提出了一种不依赖于任何额外神经网络的运动监督损失。关键思想是生成器的中间特征非常有辨别力，因此简单的损失就足以监督运动。具体来说，我们考虑了 StyleGAN2 第 6 个块之后的特征图 F，由于分辨率和判别力之间的良好权衡，它在所有特征中表现最好。我们通过双线性插值调整 F 的大小，使其具有与最终图像相同的分辨率。 	





## Point Tracking

> The insight is that the discriminative features of GANs well capture dense correspondence and thus tracking can be effectively performed via nearest
> neighbor search in a feature patch. 

更新 handle point



