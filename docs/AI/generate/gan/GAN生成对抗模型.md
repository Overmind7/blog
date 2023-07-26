# GAN

![image-20230610120948850](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230610120948850.png)

GAN 的主要灵感来源于博弈论中零和博弈的思想，应用到深度学习神经网络上来说，就是通过生成网络 G（Generator）和判别网络 D（Discriminator）不断博弈，进而使 G 学习到数据的分布，如果用到图片生成上，则训练完成后，G 可以从一段随机数中生成逼真的图像。

- G 是一个生成网络，其输入为一个随机噪音，在训练中捕获真实数据的分布，从而生成尽可能真实的数据并让 D 犯错
- D 是一个判别网络，判别生成的数据是不是“真实的”。它的输入参数是 x，输出 D(x) 代表 x 为真实数据的概率，如果为 1，就代表 100% 是真实的数据，而输出为 0，就代表不可能是真实的数据



> 训练GAN需要达到**纳什均衡**，有时候可以用梯度下降法做到，但有时候做不到。我们还没有找到很好的达到纳什均衡的方法，所以训练 GAN 相比 VAE 是**不稳定的**

> GAN 的目的是在**高维非凸**的参数空间中找到**纳什均衡点**，GAN 的纳什均衡点是**一个鞍点**，但是 SGD 只会找到局部极小值，因为 SGD 解决的是一个寻找最小值的问题，GAN 是一个博弈问题。
>
> 同时，SGD容易震荡，容易使GAN训练不稳定。因此，GAN 中的优化器不常用 SGD



[GAN 简介_gan简介_Lemon_Yam的博客-CSDN博客](https://blog.csdn.net/steven_ysh/article/details/121964544?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-121964544-blog-122462196.235^v38^pc_relevant_default_base&spm=1001.2101.3001.4242.2&utm_relevant_index=2)