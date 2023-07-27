---
title: Score based Diffusion model
date: 2023-03-10 16:07:37
tags:
    - 扩散模型
categories:
    - 扩散模型
---

> [ [生成模型新方向\]: score-based generative models_sooner高的博客-CSDN博客](https://blog.csdn.net/g11d111/article/details/118026427)
>
> [Generative Modeling by Estimating Gradients of the Data Distribution | Yang Song (yang-song.net)](https://yang-song.net/blog/2021/score/)

------------------------------



## 生成模型分类：

1. likelihood based models
    - 直接队数据分布进行你和
        - VAE
        - normalizing flow models
    - 缺点：对于网络结构设计有很大限制
2. implicit generative models
    - 间接对数据分布进行拟合
        - GANs
    - 缺点：往往需要对抗学习，不容易训练




## 方法

score based model 不是直接学习概率分布，而是学习 score

<img src="https://raw.githubusercontent.com/Overmind7/images/main/image-20230311121629593.png" alt="" style="zoom:67%;" />

- 假设我们通过某种方法（score match）得到了 score 模型：$s_{\theta}(x)\approx \nabla_x\log p(x)$

- 通过郎之万动力学的迭代过程从任意一个分布走到目标分布：
    $$
    x_{i+1}\gets x_i +\epsilon\nabla_x\log  p(x)+\sqrt{2\epsilon}z_i,~~~~i=0,1,...,k,
    $$

- 上式给出了一种从随机采样噪声出发一步步逼近目标数据的方法

    - $\epsilon$ 步长



### 问题

#### 在数据密度较低的位置，score的估计往往是不准确的

- 导致在推理的早期，模型容易根据错误的梯度二脱轨

    ![Estimated scores are only accurate in high density regions.](https://raw.githubusercontent.com/Overmind7/images/main/pitfalls.jpg)



- 解决方法

对数据加噪声，扩大数据范围，增加可以准确估计score的区域

![](https://raw.githubusercontent.com/Overmind7/images/main/single_noise.jpg)

#### 要加少强度的噪声？

- 较弱的噪声——避免损害原本的数据分布——无法在大多数区域准确估计score
- 较强的噪声——损害原本的数据分布——更多区域可以准确估计score

- 解决方法：
    - 在推理的不同阶段加不同强度的噪声，从大到小

<img src="https://raw.githubusercontent.com/Overmind7/images/main/image-20230311124303779.png" alt="" style="zoom:50%;" />

#### 求 score

 DDPM的噪声假设：$x_t \sim N(\sqrt{\bar{\alpha_t}}x_0,(1-\bar{\alpha_t})I)$

密度分布函数：$p(x_t)\propto\exp\{-\frac{(x_t-\sqrt{\bar{\alpha_t}}x_0)^\top (x_t-\sqrt{\bar{\alpha_t}}x_0)}{2(1-\bar\alpha_t)}\}$

score: $\nabla_{x_t}\log  p(x_t)$

推导：$\nabla_{x_t}\log  p(x_t)=-\frac{x_t-\sqrt{\bar{\alpha_t}}x_0}{1-\bar\alpha_t}$

score 和加在原图上的噪声仅仅相差一个系数的关系，可以用一个噪声估计网络来估计





-------------------------

### 目标函数：

$$
\begin{equation} \sum_{i=1}^L \lambda(i) \mathbb{E}_{p_{\sigma_i}(\mathbf{x})}[\| \nabla_\mathbf{x} \log p_{\sigma_i}(\mathbf{x}) - \mathbf{s}_\theta(\mathbf{x}, i) \|_2^2], \end{equation}
$$

- 不同噪声尺度的加权结果



### image inpainting



![](https://raw.githubusercontent.com/Overmind7/images/main/image-20230311131402747.png)

![](https://raw.githubusercontent.com/Overmind7/images/main/image-20230311131716940.png)



## 总结

> 为什么要加噪声：
>
> 增加扰动，扩大数据范围，增加可以准确估计score的区域
>
> 为什么要估计噪声：
>
> 估计噪声就是估计score，也就是估计数据分布的对数梯度

