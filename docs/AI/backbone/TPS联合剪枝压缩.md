# Joint Token Pruning and Squeezing Towards More Aggressive Compression of Vision Transformers

> 论文名称：Joint Token Pruning and Squeezing Towards More Aggressive Compression of Vision Transformers
> 论文地址：https://arxiv.org/abs/2304.10716
> 代码地址：https://github.com/megvii-research/tps-cvpr2023
>
> 旷视，清华

## Intro

Transformers 模型仍然需要相当高的计算预算，主要在于计算和内存成本随 tokens 长度呈平方关系。一些方法提出裁剪 tokens 策略来平衡成本与性能，此外类似知识蒸馏等技术则进一步降低了性能代沟。但随着裁剪比例增加，性能下降无可避免，因为丢掉了一些关键信息和辅助的上下文，特别是当保留下来的 tokens 数量低于 10 时。此外，一些激进的裁剪策略可能会导致目标不完整或者背景上下文信息丢失，如下图所示：

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230702103331682.png" alt="" style="zoom:50%;" />

本文认为被裁剪的 tokens 信息值得更好的利用。解决 `由修剪策略引起的错误可能导致重大的信息丢失` 的问题。

- 首先，TPS通过`剪枝`得到保留子集和剪枝子集。
- 其次，TPS通过`单向最近邻匹配`和`基于相似性`的`融合`步骤，将被修剪的令牌信息压缩为部分保留token。





## Related Work

### 原始 ViTs

  DeiT、LV-ViT、T2T-ViT、PS-ViT。

### 混合 ViTs

  Swin Transformer、CVT、PVT。

### Token裁剪

  虽有 DynamicViT、AdaViT、A-ViT、ATS，但主流的深度学习框架并不太能支持这些推理时会发生 token 长度变化的模型。且最大的缺点在于裁剪的信息损失会使得精度下降，并且限制更激进的 token 裁剪。于是 Evo-ViT、EViT、SPViT 将裁剪的 tokens 塌缩进一个 token 来重新组织数量，这一操作记为 token 重组。尽管 token 重组缓解了一部分信息损失，但还是导致性能下降。

> EViT、Evo-ViT 提出将这些裁剪掉的 tokens 聚合为一个 token，但忽略了这些被裁剪 tokens 的不一致性，从而导致特征的坍缩或者更加激进的 token 裁剪。

SPViT、IA-RED2 在训练计划上下功夫，但引入了太多的超参数且优化困难。而本文引入一种新的方法 joint token Pruning & Squeezing，仅需要简单地微调预训练模型。



## Method

![image-20230702105229086](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230702105229086.png)

> 令牌剪枝丢弃被剪枝的令牌；令牌重组将修剪后的令牌聚合为一个，而不考虑它们之间的差异。为了更有效地缩小令牌，我们的TPS挖掘隐藏在保留子集中的主机令牌，并将相似的修剪令牌压缩到相应的主机令牌中。

图（a）表示令牌修剪的方法，通过计算各个 token 的重要性，选择其中最为重要的 k kk 个进行保留，删除余下的 token ；图（b）表示令牌重组的方法，在计算各个 token 的重要性后，将最重要的 k 个进行保留的同时，将需要删除的 token 合并成第 k + 1 个 token 进行保存；图（c）表示 TPS 方法，TPS 采用令牌修剪和压缩两步来压缩 ViTs。在TPS 方法中，在计算各个 token 的重要性后，将需要删除的 token 与保留的 token 计算相似性，将需要删除的 token 中存在的信息压缩到最相似的保留的 token 中。
因此，从上述介绍中可知：TPS 方法可以与任意 令牌修剪 的方法相合并，从而得到保留子集 $S^r$ 和修剪子集 $S^p$



### TPS

![image-20230702105444986](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230702105444986.png)

本文引入两种变体：dTPS、eTPS，使得 TPS 能够和任意的裁剪技术相融合。

dTPS 采用 dynamicViT 中可学习的 token 得分预测头，并通过直通式 Gumbel-Softmax 对二值化掩码进行采样来达到可微分的目的，而 eTPS 采用 EViT 中的类别 token 注意力值来衡量 token 的重要性。

在推理阶段，采用固定比例 $\rho$ 的 Top-K 操作来实施 token 选择策略，同时确保 token 的尺寸不变以完成并行推理。用 $S^r$ 表示保留下来的 tokens，用 $S^p$  表示将被裁剪的 tokens。

> 具体而言：
>
> - dTPS 采用dynamicViT 中的可学习令牌分数预测头，通过直通Gumbel Softmax对二值决策掩码进行可微性采样（ 利用Gumbel Softmax,可以使目标函数对于该mask参数可微）;
> - eTPS使用 cls token关注值来衡量令牌作为EViT的重要性；
> - 在两种变体的推理阶段，基于token分数，使用给定固定token压缩比 $ρ$ 的 Top-k 操作设计token选择策略；
> - 这两种变体都保证了恒定的形状，从而从计算图的推理优化中获益。



> [重参数化技巧（Gumbel-Softmax） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/561328468)
>
> 离散采样，解决离散 token 选择问题
>
> > 在神经网络架构搜索或强化学习中，通常涉及离散的选择问题，例如以架构搜索为例，某一个网络层有3个候选操作，需要选择其中最优的一个。
>
> [【简读】EViT: Expediting Vision Transformers Via Token Reorganizations - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/440294002)
>
> EViT：利用[cls] token来决定每个Patch Token对于分类任务的重要性，仅保留一定比率的有价值的Patch Token，对于剩下的token采用简单的fusion操作保留，而不是直接丢弃。
>
> ![](https://raw.githubusercontent.com/Overmind7/images/main/img/v2-217bbb306f39fb67a64d82080f480dc7_1440w.image)

### Token 压缩

为避免生成额外的 token，将裁剪的 tokens 注入相似的保留 tokens 内。方法：应用一种无向的最近邻匹配算法：以多对一的方式将 $S^p$ 映射到 $S^r$ ，之后利用一种基于相似度的融合方式来同化这些新信息。

#### 匹配

给定两个 token 子集：$S^p$ 、$S^r$ ，相应的 tokens 索引分别为 $I^r$、$ I^p$ 。用 $c_{i,j}$  表示所有  $i\in I^p$ ， $j\in I^r$的相似度矩阵。对于每一个裁剪的 token $x_i\in S^p$，从 $S^r$
  中找到其最近邻 token  $x_*^{host}\in S^r$作为主 token：
$$
x_{*}^{\text {host }}=\underset{\boldsymbol{x}_{j} \in S^{r}}{\operatorname{argmax}} c_{i, j}
$$
注意 token 匹配步骤是无向的，即 $S^p$  和 $S^r$  之间无向匹配，同时多个裁剪的 token 也能共享主 token，每个保留下来的 token 也能作为主 token。之后在矩阵 $M \in \mathbb{R}^{N^{p} \times N^{r}}$  中记录每个匹配值：

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230702113026428.png" alt="image-20230702113026428" style="zoom:50%;" />

其中 $N^{p}$ 和 $N^{r}$  分别表示两个子集的 tokens 数量。
  一种高效计算相似度矩阵的方式是采用  $S^p$  和 $S^r$ 之间的余弦相似度：
$$
c_{i, j}=\frac{\boldsymbol{x}_{i}^{T} \boldsymbol{x}_{j}}{\left\|x_{i}\right\|\left\|x_{j}\right\|}, \text { for } i \in I^{p}, j \in I^{r}
$$
在匹配步骤中，相似度矩阵$c_{i,j}$  可以直接生成，因此不需要额外的参数。


#### 融合

EViT 采用 tokens 重要性得分来对聚合的 tokens 重新加权，而本文采用基于相似度的加权计划。通过 mask M 来控制两个子集中所有 tokens 的融合步骤，来确保仅有主 tokens 和裁剪的 tokens 混合。具体来说，通过融合原始特征和裁剪的 tokens 特征来更新保留的 tokens  $x_j$ ：
$$
y_j=w_jx_j+\sum\limits_{x_i\in S^p}w_i x_i
$$
其中 $w_i$为每个被裁减 $x_i\in S^p$的权重，$w_j$ 为保留的 token 权重，$y_j$  为更新的 token 权重。融合的权重 $w_i$  取决于 mask 值  $m_{i,j}$  和相似度矩阵$c_{i,j}$：
$$
w_i=\dfrac{\exp(c_{i,j})m_{i,j}}{\sum_{x_i\in S^p}\exp(c_{i,j})m_{i,j}+\mathrm{e}}
$$
保留下来的 token 总是有着最大的融合权重 $w_j$，因为 $x_j$ 与其自身的相似度才等于 1：
$$
w_j=\dfrac{e}{\sum_{x_i\in S^p}\exp(c_{i,j})m_{i,j}+e}
$$
于是未成为主 token 的那部分的保留 token 保持不变，而那些裁剪的 tokens 将被压缩进入主 tokens 来代替原有的 tokens。
  由于匹配和融合策略确保了被处理的 tokens 数量等于保留下来的 tokens 数量，于是推理过程能够维持并行处理。

## Result

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230702113204646.png" alt="image-20230702113204646" style="zoom:67%;" />

> 应用于多个普通视觉转换器的不同标记修剪方法的比较。 “*”表示我们的方法微调了 100 个 epoch。标有“†”的方法不支持常量形状推理。除非另有说明，上述先前方法默认训练 30 个 epoch。 “Re-impl”是指我们按照官方代码实现该方法。为了与之前的方法进行公平比较，我们利用计算上可比较的修剪设置来通过 TPS 微调主干网。

