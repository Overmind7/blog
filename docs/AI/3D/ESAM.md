# ESAM

## 1 引言

具身任务，如机器人操作和导航[20; 3; 36; 35]，要求智能体理解3D场景，推理人类指令，并结合自身行动做出决策。在这一流程中，具身视觉感知是各种下游任务的基础。在具身场景中，我们希望3D感知模型能够：(1) 在线。输入数据是流式的RGB-D视频，而不是预先收集的数据，视觉感知应该与数据收集同步进行；(2) 实时。需要高推理速度；(3) 细粒度。它应该能够识别场景中出现的几乎所有物体；(4) 高度泛化。一个模型可以应用于不同种类的场景，并且能够适应不同的传感器参数，如相机内参。由于高质量的3D数据有限，纯粹在3D中训练这样的模型几乎是不可能的。

受到大型语言模型（LLMs）[38; 4; 1]伟大成就的启发，一系列视觉基础模型（VFMs），如SAM[12]和SEEM[40]，已经出现。VFMs正在通过其细粒度、准确和泛化分割能力，彻底改变2D计算机视觉领域。

然而，对于3D领域，进行的研究较少。由于3D视觉领域中的高质量标注数据比2D领域要少得多，因此探索现有2D VFMs的适应或扩展到具身3D感知具有很大的前景[25; 33; 31; 34]。最近，有一些工作[33; 34; 17]采用SAM在3D场景的多视图图像上自动生成掩码，并通过投影和迭代合并在3D中合并掩码。虽然这些方法在细粒度3D实例分割方面取得了高泛化能力，但它们仍然面临一些严重问题，这些问题阻碍了它们的应用：(1) 它们在单独的图像上应用SAM，并将2D掩码直接投影到3D点云上。因此，预测结果不具备几何意识，可能会在不同视图间产生不一致的结果；(2) 它们使用手工策略在3D中合并每帧掩码预测。例如，计算所有掩码对之间的几何相似性，并根据阈值合并它们，这既不准确也非常慢；(3) 它们大多数是基于预先收集的RGB-D帧和3D重建的离线方法。

在本文中，我们提出了一个名为EmbodiedSAM（ESAM）的VFM辅助3D实例分割框架，利用SAM的力量在在线设置中实时分割3D场景中的任何物体，具有高精度、快速度和强大的泛化能力。如图1所示，与之前的3D SAM方法[33; 31; 34]不同，它们将2D掩码投影到3D并用手工策略合并，ESAM将2D掩码提升为3D查询，并通过迭代查询细化来预测时间和几何一致的3D掩码。得益于3D查询表示，ESAM还能够使用简单的矩阵操作快速合并不同帧中的3D掩码。具体来说，我们从深度图像投影的点云中提取点级特征。然后我们将SAM生成的2D掩码视为超点，它用于通过我们提出的几何感知池化模块引导掩码级聚合，生成与SAM掩码一一对应的3D查询。我们进一步提出了一个双层查询解码器来迭代细化3D查询，这使得查询能够高效地与超点级特征进行交叉注意力并生成细粒度的点级掩码。由于每个3D实例掩码都与一个查询相关联，我们可以通过并行的高效矩阵乘法计算新预测的3D掩码与先前掩码之间的相似性，并准确合并它们。为了增强查询特征的区分能力，我们设计了三个代表性的辅助任务，用于估计几何、对比和语义相似性。我们在ScanNet、ScanNet200、SceneNN和3RScan数据集上进行了广泛的实验。与之前的VFM辅助3D实例分割方法相比，我们在准确性和速度上都有了显著的提高，同时仍然保持着强大的泛化能力。此外，ESAM可以轻松扩展到**开放词汇分割**。它在数据高效设置中也显示出巨大潜力，即使是用有限的数据训练也是如此。



## 2 相关工作

**VFM辅助的3D场景分割**：在2D领域，视觉基础模型（VFM）[23; 12; 15]已经迅速发展。得益于大量标注的视觉数据，2D VFM展现出了极高的准确性和强大的泛化能力，使它们在零样本场景中也能表现良好。由于3D视觉领域的高质量标注数据比2D领域要少得多，利用2D VFM辅助3D场景感知成为一个有前景的方向[25; 33; 31; 34]。UnScene3D [25] 考虑了来自DINO [23]的2D自监督特征来生成初始的伪掩码，然后通过自训练进行迭代细化。SAM3D [33] 采用了SAM [12]来生成2D实例掩码，这些掩码随后通过深度和相机参数投影到3D空间并根据几何形状合并。SAMPro3D [31] 将3D场景中的点映射到多视图2D图像作为3D提示，这些提示用于对齐由SAM生成的2D掩码，并将3D点聚类成实例掩码。SAI3D [34] 在重建的3D网格上生成3D原语。然后它采用语义SAM来获取带有语义分数的2D掩码，这些掩码与3D原语连接，并通过基于图的区域增长策略合并。我们的方法也利用SAM辅助3D实例分割。不同之处在于，我们使2D到3D的投影过程和3D掩码合并过程可学习且在线进行。通过这种方式，我们的ESAM能够预测更准确的3D掩码，并应用于实际的实时在线任务。

**在线3D场景感知**：为了追求具身AI，像机器人导航[3; 36]和操纵[20]这样的现实世界应用受到了越来越多的关注。在线3D场景感知，即从流式RGB-D视频中精确理解周围3D场景，成为这些机器人任务的视觉基础。早期的在线3D感知方法分别处理2D图像，并将预测结果投影到3D点云上，随后通过一个融合步骤将不同帧的预测结果合并[18; 21]。然而，2D图像上的预测不具备几何和时间意识，这使得融合步骤变得困难且不准确。Fusion-aware 3D-Conv [37] 和 SVCNN [11] 构建了数据结构来维护先前帧的信息，并进行基于点的3D聚合以融合3D特征进行语义分割。INS-CONV [16] 将稀疏卷积扩展到增量CNN，以高效提取全局3D特征进行语义和实例分割。为了简化在线3D感知模型的设计并利用先进的离线3D架构的力量，MemAda [32] 提出了在线3D场景感知的新范式，通过多模态基于内存的适配器为离线模型赋予在线感知能力。与以往的工作不同，我们的ESAM将SAM生成的2D掩码提升为精确的3D掩码和相应的查询，使我们能够高效地合并每帧的预测结果，并保持高精度。



## 3 方法

给定一系列带有已知姿态的RGB-D图像$X_t = \{x_1, x_2, ..., x_t\}$，我们的目标是对相应的3D场景中的任何实例进行分割。形式上，$x_t = (I_t, P_t)$，其中 $I_t$ 是彩色图像，$P_t$ 是通过将深度图像投影到3D空间并使用姿态参数获得的点云。

我们的方法需要为观察到的3D场景 $S_t = \bigcup_{i=1}^{t} P_i$  预测实例掩码。

此外，我们希望在线解决这个问题；即，在任何时间点 $t$，未来的帧 $x_i, i > t$ 是未知的，应该在每个时间点预测 $S_t$ 的时间一致的3D实例掩码。

**概述**  
我们的方法概述如图2所示。我们以增量方式解决在线3D实例分割问题，以实现实时处理。在时间点 $t$，我们只预测当前帧 $P_t$ 的实例掩码 $M_{cur}^t$。然后我们将 $M_{cur}^t$ 与 $S_{t-1} $的先前实例掩码 $M_{pre}^{t-1}$ 合并，得到 $S_t$ 的更新实例掩码 $M_{pre}^t$ 。

![pipeline](https://raw.githubusercontent.com/Overmind7/images/main/img/pipeline.png)

### 3.1 查询提升和细化  
考虑模型正在接收第 $t$ 个RGB-D帧 $x_t = (I_t, P_t)$，我们首先采用SAM自动掩码生成从 $I_t$ 获取 **2D实例掩码** $M_{2d}^t$ 。在这一部分，我们忽略下标 $t$ 以便更清晰的陈述。

**几何感知查询提升** 

由于SAM没有利用前一帧的信息，也没有利用深度图像中的3D信息，直接将 $M_{2d}$ 投影到 $P$ 上会产生不准确和时间不一致的3D掩码。相反，我们的目标是将每个2D掩码提升为3D查询特征，这使我们能够进一步细化查询以生成3D实例掩码。

由于2D二进制掩码的信息量较少，我们提出从场景中提取点云特征，然后将2D掩码视为索引以将点云聚类为超点，其中查询可以从超点特征中简单地选择。

假设点云 $P \in \mathbb{R}^{N \times 3}$ 并且 $M_{2d}$ 中有 $M$ 个掩码:

- 我们首先将 $M_{2d}$ 映射到 $P$ 上，根据颜色-深度对应关系获得超点索引 $S \in \mathbb{Z}^N$ ，其中 $S$ 中的每个元素都在$[0, M)$范围内。
- 然后我们将 $P$ 输入到带有**基于内存的适配器**（memory-based adapter）的3D稀疏U-Net\[5\]中，以提取时间感知的3D特征 $F_P \in \mathbb{R}^{N \times C}$ 。
  - 有了 $F_P$ 和 $S$ ，我们可以将点级特征池化到超点特征 $F_S \in \mathbb{R}^{M \times C}$ 。



::: warning Online3d

Memory-based adapter, 见 [Online3d](./Online3d.md)，本文作者的另外一篇文章，CVPR 2024

:::



**几何感知池化（Geo-aware Pooling）**

然而，简单的操作，如最大池化或平均池化，可能会降低 $F_S$ 的表示能力。为了更好地保留每个超点内点的特征，我们考虑了每个超点的几何形状。

对于一个超点 $P_i \subseteq P, i \in [0, M)$ ，我们计算所有点 $p_j \in P_i$ 相对于超点中心 $c_i$ 的归一化相对位置 $p_{rj} = \frac{p_j - c_i}{\max(p_j) - \min(p_j)}$ 。这样，集合 $P_i = \{p_{rj} = \frac{p_j - c_i}{\max(p_j) - \min(p_j)} | p_j \in P_i\}$ 表示这个超点的归一化形状，直径为1，中心为原点。

然后我们为每个点计算局部和全局特征：
$$
z_{\text{global}} = \text{Agg}(z_{\text{local}}) \in \mathbb{R}^C, z_{\text{local}} = \text{MLP}(P_i) \in \mathbb{R}^{|P_i| \times C} 
$$
其中：

- MLP在每个单独的点上执行
- Agg是使用通道最大池化实现的聚合函数。

局部和全局特征表示点与形状之间的相关性，因此我们将两者特征连接起来，并通过另一个MLP来预测点级权重：
$$
w_j = \text{Sigmoid}(\text{MLP}(z_j)) \in \mathbb{R}^{(0,1)}, z_j = [z_{\text{local}}^j, z_{\text{global}}]
$$
最后，我们使用加权平均池化将点特征 $F_{iP}$ 聚合到第 $i$ 个超点：
$$
F_{iS} = G(F_{iP}) + z_{\text{global}}, G(F_{iP}) = \text{mean}(F_{iP} \odot [w_1, ..., w_{|P_i|}])
$$
注意我们通过 $z_{\text{global}}$ 增强了池化的超点特征，以充分结合形状级几何特征和场景级3D U-Net特征。每个超点的计算可以使用点级MLP和Scatter函数[8]并行化，因此这种几何感知池化实际上是高效的。

**双重查询解码器（Dual-level Query Decoder）**

池化后， $M_{2d}$ 中的 $M$ 个2D实例掩码 $M_{2d}$ 被提升为3D超点特征 $F_S$ 。然后我们从 $F_S$ 初始化一系列3D实例查询 $Q_0$ ，这些查询通过几个基于变换器的查询解码层进行迭代细化，并用于预测3D掩码。在训练期间，我们随机采样 $F_S$ 的一部分（比例在0.5到1之间）来构建 $Q_0$ 以进行数据增强。而在推理时，我们简单地设置 $Q_0 = F_S$ 。

每个查询解码器在查询和场景表示之间使用**掩码交叉注意力**来聚合每个查询的实例信息：
$$
\hat{Q}_l = \text{Softmax}(Q \cdot K^T / \sqrt{C} + A_l) \cdot V, A_l(i, j) = \begin{cases} 0 & \text{if } M_{cur,l}(i, j) = \text{True} \\ -\infty & \text{otherwise} \end{cases}, l = 0, 1, 2
$$
其中：

- " · “表示矩阵乘法
-  $Q$ 是 $Q_l$ 的线性投影
-  $K$ 和 $V$ 是场景表示 $F$ 的线性投影
-  $F$ 可以是点级特征 $F_P$ 或超点级特征 $F_S$ 
- $A_l$ 是从第 $l$ 解码器层预测的3D实例掩码 $M_{cur,l}$ 导出的注意力掩码
-  $(i, j)$ 表示第 $i$ 个 query attention 第 $j$ 个点或超点（superpoint）

然后我们将 $\hat{Q}_l$ 输入到自注意力层和前馈网络以获得 $Q_{l+1}$ ，随后通过掩码生成模块预测每个查询的实例掩码：
$$
M_{cur,l} = \text{Sigmoid}(\varphi(Q_l) \cdot F^T) > \varphi, l = 0, 1, 2, 3
$$
其中： $\varphi$ 是线性层。如果 $F = F_P$ ， $M_{cur,l}$ 是点掩码；否则，它是超点掩码。

查询解码器的常见做法是采用相同级别的场景表示进行交叉注意力和掩码生成。然而，由于SAM已经输出了高级语义感知掩码，我们观察到 $M \ll N$ 。如果我们为查询解码器采用点级场景表示 $F_P$ ，交叉注意力操作将因点的数量庞大而变得内存密集。而如果我们使用超点特征 $F_S$ ，预测的3D实例掩码将只是超点的组合，因此无法细化到更细的粒度。

**为了两全其美，我们的查询解码器被设计为双层。**对于交叉注意力的方程(4)，我们设置 $F = F_S$ 以实现高效的交互。而对于掩码预测的方程(5)，我们设置 $F = F_P$ 以实现细粒度掩码生成。为了支持掩码注意力，我们在方程(4)之前将点掩码池化到超点掩码： 
$$
M_{cur,l} \leftarrow G(M_{cur,l}) > \varphi
$$
 其中 $G$ 是方程(3)中的几何感知池化。我们可以重用预先计算的权重在方程(2)中以减少计算。通过这种方式，经过3次查询解码器后，我们获得了准确的点掩码 $M_{cur,3}$ 以及相应的查询 $Q_3$ ，以下小节中将其表示为 $M_{cur}^t$ 和 $Q_t$ 。我们在 $M_{cur}^t$ 上执行掩码NMS以过滤掉冗余掩码以及相应的查询。

### 3.2 高效在线查询合并

> 在 oneformer3d/instance_merge.py 内实现？？？？
>
> - 参数包括掩码、标签、分数、查询、查询特征、语义预测、XYZ坐标列表和边界框。
>
> - 初始化当前掩码、标签、分数、查询、查询特征、语义预测、XYZ坐标和合并计数。
>
> MergeHead
> ScanNetMergeCriterion_Fast
>
> 
>
> ```python
> class OnlineMerge():
> ```
>



一旦将2D掩码 $M_{2d}^t$ 提升为准确的3D掩码 $M_{cur}^t$ ，我们随后将 $M_{cur}^t$ 与先前的实例掩码 $M_{pre}^{t-1}$ 合并，以获得 $M_{pre}^t$ 。注意当 $t = 1$ 时我们有 $M_{pre}^1 = M_{cur}^1$ 作为初始化。

然而，先前工作中合并实例掩码的主流解决方案[33; 34; 16; 21; 17]是遍历 $M_{cur}^t$ 中的所有掩码，并比较 $M_{cur}^t$ 中的每个掩码与 $M_{pre}^{t-1}$ 中的所有先前掩码。这个过程非常慢：

- 因为为了准确地决定一个新掩码是否应该合并到先前掩码中，需要在两个掩码的点云上计算几何相似性，如掩码IoU或CD距离。
- 相似性的计算涉及每个掩码中的所有点，具有高计算复杂性。
- 更糟糕的是，上述操作很难并行计算，因为每个掩码中的点的数量不同，我们需要根据掩码逐个挑选出每个实例的点云。

为此，我们提出**用固定大小的向量表示每个掩码**，并用高效的矩阵操作计算相似性。

得益于我们的架构，对于 $M_{cur}^t$ 和 $M_{pre}^{t-1}$ 中的每个掩码，我们都有相应的查询特征。查询特征本身就是固定大小的向量表示，但简单地计算它们之间的相似性信息量较少，性能非常低。因此，我们设置了几种代表性的辅助任务，基于查询特征学习不同度量的向量表示，用于计算几何、对比和语义相似性。

1. 首先，对于**几何相似性**（geometric similarity），我们观察到模型能够仅通过部分观察就能学习到整个几何形状。然而，由于分割的限制，预测只能对现有点进行，模型无法表达其对整个几何形状的知识。因此，我们通过引入**边界框预测**的辅助任务，使模型能够表达其全部知识。我们采用MLP基于每个查询的中心（即相应超点的中心 $c_i$ ）来预测边界框回归，得到框 $B \in \mathbb{R}^6$ 。然后两个掩码之间的几何相似性可以通过两个框之间的IoU来计算。我们忽略了框的方向，因为两个轴对齐边界框集合之间的IoU矩阵可以通过简单的矩阵操作来计算。

2. 其次，对于**对比相似性**（contrastive similarity），我们的目标是学习一个实例特定的表示，使得来自同一实例的特征应该被拉近，否则被推开。这种表示可以通过相邻帧之间的对比训练学习：我们使用MLP将查询特征 $Q_t$ 映射到对比特征 $f_t$ 。然后对于在第 $t$ 帧和 $(t + 1)$ 帧中出现的实例 $i$ ，我们选择这个实例的两个特征 $(f_i^t, f_i^{t+1})$ 作为正样本对，从其他实例中采样特征 $(f_i^t, f_k^{t+1})$ 作为负样本对。详细的损失函数在下一小节中展示。

3. 最后，对于**语义相似性**，我们简单地采用MLP预测每个预定义类别的概率分布 $S \in \mathbb{R}^K$ ，其中 $K$ 是预定义类别的数量。对于这个任务也有其他选择。例如，如果我们采用语义SAM[15]而不是SAM，我们可以直接利用2D掩码的语义预测作为相应查询的 $S$ 。

通过这种方式， $M_{pre}^{t-1}$ 和 $M_{cur}^t$ 之间的相似性矩阵 $C$ 可以通过它们相应的几何、对比和语义表示高效计算：
$$
C = \text{IoU}(B_{pre}^{t-1}, B_{cur}^t) + \frac{f_{pre}^{t-1}}{\|f_{pre}^{t-1}\|_2} \cdot \left( \frac{f_{cur}^t}{\|f_{cur}^t\|_2} \right)^T + \frac{S_{pre}^{t-1}}{\|S_{pre}^{t-1}\|_2} \cdot \left( \frac{S_{cur}^t}{\|S_{cur}^t\|_2} \right)^T
$$
其中 $\text{IoU}(·, ·)$ 表示两组轴对齐边界框之间的IoU矩阵。

我们通过将小于阈值 $\varepsilon$ 的元素设置为 $-\infty$ 来修剪 $C$ 。

然后在 $M_{pre}^{t-1}$ 和 $M_{cur}^t$ 上执行代价为 $-C$ 的二分图匹配，该匹配将 $M_{cur}^t$ 中的每个掩码分配给 $M_{pre}^{t-1}$ 中的一个掩码。

- 如果一个新掩码未能与任何先前掩码匹配，我们为这个掩码注册一个新实例。否则我们合并这两个掩码以及它们的 $B$ 、 $f$ 和 $S$ 。掩码合并可以通过取并集来简单实现。
- 而其他表示，我们按以下方式加权平均它们： $B_{pre}^t[i] = \frac{n}{n+1}B_{pre}^{t-1}[i]+\frac{1}{n+1}B_{cur}^t[j]$ 等等。我们假设第 $j$ 个新掩码合并到第 $i$ 个先前掩码。 $n$ 是合并的次数，表示已经合并到 $M_{pre}^{t-1}[i]$ 的掩码数量。



### 3.3 损失函数
我们在每个RGB-D帧上都有语义和实例标签。在每个RGB-D视频中，不同帧的实例标签是一致的。

给定注释，我们基于每个查询的预测计算每帧损失。由于查询 $Q_t$ 是从2D SAM掩码一对一提升的，我们忽略了复杂的标签分配步骤，直接利用2D掩码上的注释来监督相应查询的预测。

我们假设一个2D SAM掩码只能属于一个实例，因此我们可以为每个查询获取地面真实语义标签和2D实例掩码。我们利用与深度图像的像素对应关系将2D实例掩码映射到3D点云，并计算基于3D实例掩码的地面真实轴对齐边界框。

有了上述注释，我们计算二元分类损失$L_t^{cls}$，使用交叉熵来区分前景和背景实例。预测的3D掩码由二元交叉熵 $L_t^{bce}$ 和Dice损失 $L_t^{dice}$ 监督。边界框和语义预测的损失定义为IoU损失 $L_t^{iou}$ 和二元交叉熵 $L_t^{sem}$ 。

除了上述每帧损失外，我们还制定了相邻帧之间的对比损失：
$$
L_{cont}^{t \rightarrow t+1} = - \frac{1}{Z} \sum_{i=1}^{Z} \log \frac{e^{\langle f_i^t, f_i^{t+1} \rangle / \tau}}{\sum_{j=i}^{Z} e^{\langle f_i^t, f_j^{t+1} \rangle / \tau} + e^{\langle f_i^t, f_i^{t+1} \rangle / \tau}}
$$

其中 $\langle ·, · \rangle$ 是余弦相似性。因此，最终的总损失公式为：
$$
L = \frac{1}{T} \sum_{t=1}^{T} (\alpha L_t^{cls} + L_t^{bce} + L_t^{dice} + \beta L_t^{iou} + L_t^{sem} + L_{cont}^{t \rightarrow t+1} + L_{cont}^{t \rightarrow t-1})
$$

其中 $L_{cont}^{T \rightarrow T+1}$  和  $L_{cont}^{1 \rightarrow 0}$ 设置为0。



## 4 实验
在这一部分，我们首先描述我们的数据集和实现细节。然后我们将我们的方法与最先进的VFM辅助3D实例分割方法和在线3D分割方法进行比较，以验证其有效性。我们还在开放词汇和数据高效设置中应用ESAM，以展示其应用潜力。最后，我们进行消融研究，以全面分析我们的设计理念。
