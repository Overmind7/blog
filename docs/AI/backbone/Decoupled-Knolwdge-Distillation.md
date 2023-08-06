---

---

# Decoupled Knolwdge Distillation

## KL 散度

### 信息熵

一个离散随机变量 X的可能取值为  $X=x_1,x_2,…,x_n$，对应概率为 $p_i = p(X=x_i )$

则随机变量的熵的定义为：
$$
H(p)=\mathbb{E}_{X\sim p(x)}[-\log p(x)]
$$
若 x 为离散变量：
$$
H(x)=-\sum_{i=1}^{n}p(x_i)\log p(x_i)
$$
熵代表随机变量的平均信息量



“熵代表随机变量的平均信息量” 这个说法还是过于抽象了。

我们引入熵的一个更加数学化的理解，即，

- **熵代表编码随机变量所需的最短平均编码长度**。

换句话说，一个随机变量的平均信息量，等价于编码这个随机变量所需的最短平均编码长度。

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291540905.png"  style="zoom:50%;" />

给定随机变量 X 我们能否预先求得其最短的平均编码长度？

答案就是利用随机变量 $X\sim p(x)$ 的熵 $H(p)$



### 交叉熵

离散变量的概率分布P、Q而言(p为真实分布，q为p的近似），其交叉熵定义为：
$$
H(p,q)=\mathbb{E}_{X\sim p(x)}[-\log q(x)],\\
H(p,q)=\sum_xp(x)\log \frac{1}{q(x)}=-\sum_xp(x)\log q(x)
$$
回顾一下熵的定义：$H(p)=\mathbb{E}_{X\sim p(x)}[-\log p(x)]$

交叉熵和熵的定义长的很像，它们之间的区别可以这样理解：

1. 因为 $𝑿$ 的实际分布为 $𝒑$ 所以计算期望编码长度时，尽管我们可能并不知道 $𝒑$ 但理论上总是基于真实分布 $𝑿\sim 𝒑(𝒙)$ 计算期望。
2. 当我们利用正确的分布 $𝒑(𝒙)$ 进行编码时，$\log$⁡⁡ 里面的真数是 $𝒑(𝒙)$ 最终算出来的就是随机变量 $X$ 的最优期望编码长度，即熵。
3. 当我们利用错误的分布 $𝒒(𝒙)$ 进行编码时，$\log$⁡ 里面的真数是 $𝒒(𝒙)$ 最终算出来的自然不再是熵，而是我们用错误的分布 $𝒒(𝒙)$ 进行编码后，算出来的随机变量 $𝑿$ 的期望编码长度。



从信息论的角度理解，为什么交叉熵可以在机器学习中作为损失函数。

- 我们在最小化交叉熵的时候，事实上是在逼近最优期望编码长度，
- 即利用 $q(x)$ 逼近 $p(x)$ 使得交叉熵尽可能的小，以接近熵的值。



### KL 散度

KL散度（Kullback-Leibler Divergence）一般用于度量两个概率分布函数之间的“距离”，

其定义如下：
$$
D_{KL}(P||Q)=\sum p(x)\log \frac{P(x)}{Q(x)}\\
D_{KL}(P||Q)=\int p(x)\log \frac{P(x)}{Q(x)}dx
$$
$H(x)=-\sum_xp(x)\log p(x)$

$H(p,q)=\sum_x\log \frac{1}{q(x)}=-\sum_x p(x)\log q(x)$

因此，KL散度或相对熵可通过下式得出：
$$
\begin{align}
D_{KL}(p||q)&=H(p,q)-H(p)\\
&=-\sum_xp(x)\log q(x) - \sum_x-p(x)\log(x)\\
&=-\sum_xp(x)[\log q(x) - \log p(x)]\\
&=-\sum_xp(x)\log\frac{q(x)}{p(x)}
\end{align}
$$

**KL散度 = 交叉熵 - 真实概率分布式的熵**

- 倘若我们优化KL散度，即是希望减小所需的额外编码数，使得分布 $𝒑$ 和 $𝒒$ 变得接近。这里有两种情况：
  1. 若真实分布 $𝒑$ 恒定，那么优化KL散度等价于优化交叉熵，其目的是令交叉熵逼近最优期望编码长度，使得 $𝒒$ 尽可能接近 $𝒑$ 。在训练辨别模型时，往往是这种情况。为了简化计算，人们往往直接对交叉熵进行优化。
  2. 若真实分布 $𝒑$ 不恒定，那么优化 KL 散度会同时改变交叉熵和熵的值，使得 $𝒒 $与 $𝒑$ 相互接近。在训练生成模型时，往往是这种情况，为了使分布 $𝒑$ 与 $𝒒$ 相互接近，我们必须直接对KL散度进行优化。



## 基于 Feature 的知识蒸馏

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291559829.png"  style="zoom:67%;" />

具体步骤如下：

1. 选择teacher模型特征提取器的第N 层输出作为hint，从第一层到第N 层的参数对应图(a)中的 $W_{hint} $
2. 选择student模型特征提取器的第M 层输出作为 guided，从第一层到第M 层的参数对应图(a)中的 $W_{guided} $
3. 步骤一与步骤二的特征图维度可能不匹配，因此引入卷积层调整器，记为$W_r$，对guided 的维度进行调整



> [（知识蒸馏）](https://blog.csdn.net/dhaiuda/article/details/103564326)[—— ](https://blog.csdn.net/dhaiuda/article/details/103564326)[FitNets](https://blog.csdn.net/dhaiuda/article/details/103564326)[: Hints for Thin Deep Nets_](https://blog.csdn.net/dhaiuda/article/details/103564326)



## 基于 Logits 的知识蒸馏

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291601213.png"  style="zoom:67%;" />

logits 是未进入softmax的概率，

一般是全连接层的输出，softmax的输入





## Decoupled Knolwdge Distillation

### Notations

对于第 t 类的训练样本，分类概率可以表示为:
$$
p_i=\frac{\exp (z_i)}{\sum_{j=1}^C\exp(z_j)}~,z_i 表示第i类的logit
$$
为了区分与目标类相关和不相关的预测，我们定义了以下符号：

$b=[p_t,p_{\setminus t}]\in \mathbb{R}^{1\times2}$ 表示目标类 $(p_t)$ 和所有其他非目标类 $(p_{\setminus t})$ 的二元概率，其计算公式为：

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291609323.png"  style="zoom: 67%;" />

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291609777.png"  style="zoom: 50%;" />表示非目标类之间的概率（即，不考虑第 t 类）。每个元素通过以下方式计算：

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291610630.png"  style="zoom: 67%;" />



### Reformulation

尝试用二元概率 b 和非目标类之间的概率 ^p 重新表述 KD。 T 和 S 分别表示教师和学生。

经典的KD使用KL-Divergence作为损失函数

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291610305.png"  style="zoom:67%;" />

$\hat{p}_i = p_i / p_{\setminus t}$

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291612669.png"  style="zoom:67%;" />

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291613520.png"  style="zoom:67%;" />

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291613412.png"  style="zoom:67%;" />

最后可以写成：

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291613052.png"  style="zoom:67%;" />

KD 损失被重新表述为两项的加权和。 $KL(b^T ||b^S) $表示教师和学生对目标类的二元概率之间的相似度。因此，我们将其命名为目标类知识蒸馏（TCKD）。

- target class knowledge distillation（TCKD），负责表述是否为top-1的分布

同时，$KL(pT || pS)$ 表示教师和学生在非目标类中的概率之间的相似性，称为非目标类知识蒸馏（NCKD）

- non-target class knowledge distillation （NCKD），负责表述除top-1外，其他dark knowledge的分布

$KD = TCKD + (1-p_t^\tau )NCKD$

显然，NCKD 的权重与 $p_t^\tau$ 相耦合。

> 直观地说，TCKD 专注于与目标类相关的知识，因为相应的损失函数只考虑二进制概率。相反，NCKD 侧重于非目标类别的知识。



### Ablation

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291617179.png"  style="zoom:67%;" />

TCKD 可能对student没有帮助（例如，在 ShuffleNet-V1 上增加 0.02% 和 0.12%）甚至有害（例如，在 WRN-16-2 上下降 2.30% 和在 ResNet8×4 上下降 3.87%）。

然而，NCKD 的蒸馏性能与经典 KD 相当，甚至更好（例如，在 ResNet8×4 上为 1.76% 对 1.13%）。

- 消融结果表明，目标类相关知识不如非目标类中的知识重要。

我们假设教师对训练样本越有信心，它可以提供的知识就越可靠和有价值。然而，这种自信的预测高度抑制了损失权重。

- NCKD 是 logit 蒸馏有效但被大大抑制的突出原因。

有趣的是，我们在表 1 中注意到，当仅应用 NCKD 时，其性能与经典 KD 相当甚至更好。这表明非目标类之间的知识对logit蒸馏至关重要，可以成为突出的“暗知识”。

然而当回顾 KD 的新表达式时，发现 NCKD 对应的 loss 是和权重$(1-p_t^\tau ) $耦合在一起的。换言之，如果 teacher 网络的预测越置信，NCKD 的 loss 权重就更低，其作用就会越小。

- 而本文认为，teacher 更置信的样本能够提供更有益的 dark knowledge，和 NCKD 耦合的$(1-p_t^\tau )$权重会严重抑制高置信度样本的知识迁移，使得知识蒸馏的效率大幅降低。

------------

依据 teacher 模型的置信度，该研究对训练集上的样本做了排序，并将排序后的样本分成置信（置信度 top-50%）和非置信 (剩余) 两个批次： 

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291619683.png"  style="zoom:67%;" />

在前 50% 的样本上使用 NCKD 可以获得更好的性能，

- 这表明预测良好的样本的知识比其他样本更丰富。

- 然而，良好预测样本的损失权重被teacher的高置信度抑制。

-------------

TCKD 传递有关训练样本“难度”的知识。

TCKD 通过二元分类任务传递“暗知识”，这可能与样本“难度”有关。

- 例如，与 $𝑝_𝑡^\tau = 0.75$ 的另一个训练样本相比， $𝑝_𝑡^\tau= 0.99$ 的训练样本对于学生来说可能“更容易”学习。

- 由于 TCKD 传达了训练样本的“难度”，我们假设当训练数据变得具有挑战性时，有效性就会显现出来。
- 但是，CIFAR-100 训练集很容易拟合 。因此，教师提供的“难点”知识并不能提供信息。
- 在这一部分，设计三个角度进行实验来验证：训练数据越困难，TCKD 可以提供的好处越多。

-----------------

更强的数据增广：

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291621581.png" style="zoom:67%;" />

更难的数据集：

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291622171.png"  style="zoom:67%;" />

更 Noisy 的标签

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291622517.png"  style="zoom:67%;" />



### Decoupled Knolwdge Distillation

TCKD 和 NCKD 都有自己的重要作用，然而，研究注意到了在原始的 KD Loss 中，TCKD 和 NCKD 是存在不合理的耦合的：

​                 								$KD = TCKD + (1-p_t^\tau )NCKD$

1. 一方面，NCKD 和 $(1−𝑝_𝑡^\tau) $耦合，会导致高置信度样本的蒸馏效果大打折扣；


2. 另一方面，TCKD 和 NCKD 是耦合的。然而这两个部分传递的知识是不同的，这样的耦合导致了他们各自的重要性没有办法灵活调整。

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291623096.png"  style="zoom:67%;" />

$DKD = \alpha TCKD + \beta NCKD$





### Result

 ResNet32×4 和 ResNet8×4 分别设置为teacher和student

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291624803.png"  style="zoom:67%;" />

1. 解耦 $(1−𝑝_𝑡^\tau)$ 和 NCKD，也就是把 β 设置为 1.0，可以将 top-1 accuracy 从 73.6% 提升至 74.8%；
2. 解耦 NCKD 和 TCKD 的权重，即进一步调节 β 的数值，可以将 top-1 accuracy 从 74.8% 进一步提升至 76.3%；

结果说明 DKD 的解耦确实能带来显著的性能增益，这一方面证明了 KD 确实存在刚才提到的两个问题，另一方面也证明了 DKD 的有效性。

- 此外，这个表格也证明了 α 对超参数是不敏感的，把 α 设置为 1.0 就可以取得令人满意的效果，所以在实际应用中只需要调节 β 即可。
- 同时， β 也不是一个敏感的超参数，在 4.0-10.0 的范围内，都可以取得令人满意的蒸馏效果。



<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291625656.png"  style="zoom:67%;" />

表 6～9 中提供了 DKD 在 CIFAR-100 和 ImageNet-1K 两个分类数据集上的蒸馏效果。和 KD 相比，DKD 在所有数据集和网络结构上都有明显的性能提升。

此外，与过去最好的特征蒸馏方法（ReviewKD）相比，DKD 也取得了接近甚至更好的结果。

DKD 成功使得 logits 蒸馏方法重新回到了 SOTA 的阵营中。

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291625473.png"  style="zoom:67%;" />

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202208291626045.png"  style="zoom:67%;" />

DKD 的结果虽不如特征蒸馏的 SOTA 性能，但是依然稳定地超过了 KD 的性能。而将 DKD 和特征蒸馏方法组合起来，也可以进一步提高 SOTA 结果。

过去的一些工作证明了，Detection 任务非常依赖特征的定位能力，这在 Detector 蒸馏中也是成立的。而 logits 并不能提供 location 相关的信息，无法对 Student 的定位能力产生帮助，因此在 Detection 任务中，特征蒸馏相比 logits 蒸馏存在机制上的优势，这也是 DKD 无法超过特征蒸馏 SOTA 的原因。







### Limitations and future work

DKD 在对象检测任务上无法胜过最先进的基于特征的方法（例如 ReviewKD），因为基于 logits 的方法无法传递有关定位的知识。

蒸馏性能与 β 之间的严格相关性尚未得到充分研究





> [2203.08679\ Decoupled Knowledge Distillation (arxiv.org)](https://arxiv.org/abs/2203.08679)
>
> [CVPR 2022](https://zhuanlan.zhihu.com/p/505213269)
>
> [进阶详解KL散度](https://zhuanlan.zhihu.com/p/372835186)
>
> [KL散度 ](https://zhuanlan.zhihu.com/p/365400000)

