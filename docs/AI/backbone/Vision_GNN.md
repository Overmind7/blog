# Vision GNN

> [Vision GNN: An Image is Worth Graph of Nodes | Papers With Code](https://paperswithcode.com/paper/vision-gnn-an-image-is-worth-graph-of-nodes) [![PWC](https://img.shields.io/endpoint.svg?url=https://paperswithcode.com/badge/vision-gnn-an-image-is-worth-graph-of-nodes/image-classification-on-imagenet)](https://paperswithcode.com/sota/image-classification-on-imagenet?p=vision-gnn-an-image-is-worth-graph-of-nodes)
>
> Jun, 2022
>
> ![image-20230722115700550](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230722115700550.png)

## intro

本文提出以一种更加灵活的方式来处理图片：计算机视觉的一个基本任务是识别图像中的物体。由于图片中的物体通常不是形状规则的方形，所以经典的网格表示或者序列表示在处理图片时显得冗余且不够灵活。比如一个对象可以被视为由很多部分的组合：例如，一个人可以粗略地分为头部、上身、手臂和腿，这些由关节连接的部分自然形成一个图结构。

   在网格表示中，像素或小块仅仅通过空间位置排序。在序列表示中，2D 图像被切分成为一系列小块。在图表示中，节点通过其内容链接起来，不受本地位置的约束。网格表示和序列表示都可以视为是图表示的特例。因此，将一张图片视为图是相对于前二者更加灵活且有效。

   本文基于把图片视为图表示的观点，本文提出一种基于图表示的新型通用视觉架构 ViG。将输入图像分成许多小块，并将每个小块视为图中的一个节点。在构建好了输入图片的图表征之后，作者使用 ViG 模型在所有节点之间交换信息。ViG 的基本组成单元包括两部分：用于图形信息处理的 GCN (图形卷积网络) 模块和用于节点特征变换的 FFN (前馈网络) 模块。

![image-20230722115855599](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230722115855599.png)

## Method

在本文中，图网络的前向传播如下：
$$
\mathcal{G}^{\prime}=F(\mathcal{G}, \mathcal{W})=\text { Update }\left(\text { Aggregate }\left(\mathcal{G}, W_{\text {agg }}\right), W_{\text {update }}\right)
$$
这里的 $\mathcal{G}$ 是图网络的节点， $W_{agg}$ 是聚合步骤的网络参数， $W_{update} $ 是聚合后更新步骤的网络参数。上式的聚合函数 $Aggregate (\mathcal{G},W_{update}  )$ 其实包括了转换、聚合、激活3个步骤。而更新函数是额外的，相对于传统卷积。

对于图网络中的一个节点 $x_i$ 的更新，可以把上式子改写成：
$$
\mathbf{x}_{i}^{\prime}=h\left(\mathbf{x}_{i}, g\left(\mathbf{x}_{i}, \mathcal{N}\left(\mathbf{x}_{i}\right), W_{a g g}\right), W_{\text {update }}\right)
$$


$\mathcal{N}\left(\mathbf{x}_{i}\right)$ 代表了中心节点  $x_i$ 相邻节点集合， $g(⋅)$ 是聚合函数， $ℎ(⋅)$ 是更新函数。

- 其中，聚合函数 $g(⋅) $ 有很多种，本文采用了一个较为简单的函数，叫 max-relative graph convolution： $g(⋅)=x^{′′}_i=[x_i,\max (\{x_j−x_i∣j∈\mathcal{N}\left(\mathbf{x}_{i}\right)\}]$ 。也就是计算中心节点 $x_i$ 与相邻所有节点的差，取最大值，再与中心节点 $x_i$ 结合。

- 更新函数 ℎ(⋅) 比较简单，就是 $ℎ(⋅)=x_i^′=x^{′′}W_{update}$ 。值得一提的是，作者借鉴了 Transformer 多头注意力机制，用了多头更新机制： 
    $$
    \mathbf{x}_{i}^{\prime}=\left[\text { head }^{1} W_{u p d a t e}^{1}, \text { head }{ }^{2} W_{u p d a t e}^{2}, \cdots, \text { head }{ }^{h} W_{u p d a t e}^{h}\right]
    $$

> GNN 过度平滑：过度平滑是 GNN 网络的设计的内生问题，因为每个节点的更新都依赖于其相邻的节点，随着网络层数的增加和迭代次数的增加，临近节点的特征会趋向于收敛到同一个值。
>
> 本文作者在设计 ViG Block 时通过更多的特征转化与非线性激活函数来减轻这个现象
>
> $$
> Y=\sigma(\mathsf{Graph~Conv}(XW_{in}))W_{out}+X
> $$
> 
>
> > 为每个更新后的特征加回原来的特征，可以突出原来特征的值，也就是节点本身的特性，从而减轻了相邻节点的影响。
> >
> > W 全连接权重
>
> $$
> Z=\sigma(YW_1)W_2+Y
> $$

![image-20230722131852286](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230722131852286.png)

## Result

![image-20230722120142012](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230722120142012.png)

![image-20230722152411629](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230722152411629.png)



在浅层中，邻居节点往往根据低层和局部特征（例如颜色和纹理）来选择。在深层，中心节点的邻居更加语义化，属于同一类别。

![image-20230722124354404](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230722124354404.png)









## 思考

edge conv 在图像上能用吗？

DGCNN

[论文阅读 点云动态图卷积(DGCNN)_sunny_ckyh的博客-CSDN博客](https://blog.csdn.net/sunny_ckyh/article/details/113067740)



边缘卷积 与 GCN 的差异















