# PointMVS

## Abstract

1. 将深度图转换为点云来进行场景优化。
2. 采用了由粗糙到精细的深度图生成策略。
3. 将三维几何先验知识和纹理信息融入到点云中生成增强点云。

![image-20230521235931007](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230521235931007.png)



## 方法

### 1. 初始深度图生成

![img](https://raw.githubusercontent.com/Overmind7/images/main/img/c7e7016d8fc54d1eb9bae54e08df5f83.png)

 使用预训练好的MVSNet生成低分辨率的初始深度图。



### 2. 2D-3D 特征融合

![img](https://raw.githubusercontent.com/Overmind7/images/main/img/6a4b8ecd5f1a48aeb3a26e1264211454.png)

#### 2.1 特征提取

使用步幅为 2 的二维卷积网络对特征图进行下采样

#### 2.1 动态特征融合



源视图表示为 $\{I_i\}_{i=1}^N$

 参考视图表示为 $I_0$

经过特征提取网络获取得多尺度深度特征表示为 $\{F_i\}=[F_i^1,F_i^2,F_i^3]$

其中 $1,2,3$ 表示不同尺度，$i$ 表示不同视图。
  参照MVSNet，将源视图的特征图经过相机参数warp到参考视图，然后基于方差求匹配代价：
$$
C^{j}=\frac{\sum_{i=1}^{N}\left(F_{i}^{j}-\bar{F}^{j}\right)^{2}}{N},(j=1,2,3)\tag{1}
$$
  其中  $j $ 表示不同尺度，$i$ 表示不同视图。




将图像特征和3D点云坐标进行拼接得到增广点云特征点如式2所示：
$$
\mathbf{C}_{p}=\text { concat }\left[\mathbf{C}_{p}^{j}, \mathbf{X}_{p}\right],(j=1,2,3)\tag{2}
$$

> 正如在下一节中看到的那样，由于我们是迭代地预测深度残差，因此我们在每次迭代后更新点位置 $X_p$ 并从图像特征金字塔中获取点特征 $C^k_p$，我们将此操作称为动态特征获取。请注意，此步骤不同于基于成本体积的方法，后者在每个体素处获取的特征由场景的固定空间分区确定。相比之下，我们的方法可以根据更新的点位置动态地从图像的不同区域获取特征。因此，我们可以专注于特征图中感兴趣的区域，而不是统一对待它们。

### 3. 点云优化

#### 3.1 假设点生成

将初始深度图经过相机参数映射到点云空间中，因为在图像空间中像素点间的邻近信息不能很好地反应三维欧几里得空间中的邻近关系。

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230522002011815.png" alt="" style="zoom: 50%;" />

对于每一个点云，沿着参考相机的方向生成 $2m+1$ 个假设点：
$$
\tilde{\mathbf{p}}_{k}=\mathbf{p}+k s \mathbf{t}, \quad k=-m, \ldots, m\tag{3}
$$
其中 t 表示参考相机的法线方向， s 表示单位距离。


#### 3.2 边缘卷积



#### 3.3 残差生成

![image-20230522005607408](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230522005607408.png)



### 4. 上采样与迭代优化

由于网络结构的巧妙，可以使用迭代优化的思想来继续优化点云的精度。相比于使用3D代价体的重建方法而言，这种点云优化的方法更加灵活。PointFlow中可以对其上采样，然后进行流预测得到优化后的深度图。在此过程中可以减小深度单位间隔 s ，得到更加精细的深度图。



## 损失函数

采用L1损失，并将所有迭代过程中的深度预测图都考虑进去：
$$
L o s s=\sum_{i=0}^{l}\left(\frac{\lambda^{(i)}}{s^{(i)}} \sum_{p \in \mathbf{P}_{\mathrm{valid}}}\left\|\mathbf{D}_{\mathrm{GT}}(p)-\mathbf{D}^{(i)}(p)\right\|_{1}\right)\tag{6}
$$


其中$P_{valid} $表示有效的标签像素点集， $l$ 表示迭代的轮次，$\lambda^{(i)}$在训练过程中设置为1，i 表示不同的尺度；


## 实验结果



