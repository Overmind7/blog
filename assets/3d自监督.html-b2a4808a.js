import{_ as s,r as a,o as p,c as l,a as e,d as t,b as n,w as h,e as o}from"./app-04b0d2b0.js";const c={},d=e("h1",{id:"点云自监督",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#点云自监督","aria-hidden":"true"},"#"),t(" 点云自监督")],-1),g={class:"custom-container warning"},u=e("p",{class:"custom-container-title"},"InfoNCE Loss",-1),m={href:"https://zhuanlan.zhihu.com/p/569764236",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/taoqick/article/details/124781102",target:"_blank",rel:"noopener noreferrer"},f=e("img",{src:"https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027110002097.png",alt:"image-20231027110002097",style:{zoom:"50%"}},null,-1),b=e("h2",{id:"pointcontrast",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#pointcontrast","aria-hidden":"true"},"#"),t(" PointContrast")],-1),k=e("p",null,"ECCV 2020",-1),v={href:"https://paperswithcode.com/paper/pointcontrast-unsupervised-pre-training-for",target:"_blank",rel:"noopener noreferrer"},C={href:"https://zhuanlan.zhihu.com/p/317256053",target:"_blank",rel:"noopener noreferrer"},P=o('<h3 id="motivation" tabindex="-1"><a class="header-anchor" href="#motivation" aria-hidden="true">#</a> Motivation</h3><p>目前点云领域的自监督学习并没有取得很好的成果。作者认为原因可能是以下几点：</p><p>1、相较于2D领域，3D领域<strong>缺少高质量、大规模的数据集</strong>，这是由于收集3D数据的成本更高</p><p>2、缺乏<strong>统一的Backbone</strong>，目前点云特征提取的框架仍在快速发展</p><p>3、缺乏高层次的评价方式</p><p>基于以上几个问题，作者的研究主要涵盖了以下几个重要因素：</p><p>1、选择了一个<strong>大型数据集</strong>用于预训练</p><p>2、选用了一个<strong>可以用于多种下游任务</strong>的backbone</p><p>3、评估预训练效果的方法</p><p>4、定义了一组用于不同下游任务的评估办法</p><p>总的来说，作者认为这篇工作的<strong>贡献</strong>可以被总结为以下几点：</p><p>1、首次评估了3D点云的高级表达在不同场景中的转移性</p><p>2、实验结果表明，无监督预训练可以<strong>有效提高不同下游任务、数据集的性能</strong></p><p>3、在无监督学习的加持下，在6种不同的评价基准上<strong>取得了最佳效果</strong></p><p>4、本文的成功可以推动更多在相关方面的研究</p><h3 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h3><h4 id="shapenet-有监督预训练测试" tabindex="-1"><a class="header-anchor" href="#shapenet-有监督预训练测试" aria-hidden="true">#</a> shapenet 有监督预训练测试</h4><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027103511142.png" alt="image-20231027103511142"></p><blockquote><p>预训练几乎没有给下游任务带来任何收益，反倒看上去有一定的反作用。</p></blockquote><ul><li><p>源数据与目标数据之间的<strong>域差距</strong>(Domain gap)。预训练是在ShapNet上进行的，这个数据集本身是经过了归一化，对齐的干净数据集，并且缺乏场景信息。这导致了<strong>预训练数据集</strong>和<strong>微调数据集</strong>在数据分布上有较大的差距。</p></li><li><p><strong>点级别(Point-level)<strong>的表示很重要。在3D点云的深度学习中，局部的特征表示是</strong>非常重要</strong>。所以直接进行instance level的全局级别的表示是不够的。(这里额外提一下，DepthContrast同样认为局部特征的学习比较重要，选择使用了<strong>随机丢弃</strong>的方式来强迫网络学习到局部特征)</p></li></ul><p>基于以上的思考，以下两个点将是预训练过程中需要着重考虑的。</p><ol><li>针对Domain gap，可以在<strong>具有复杂场景的</strong>数据集中训练，而不是ShapeNet那样的&quot;干净&quot;的数据集</li><li>为了捕获点级别的信息，需要相应的任务和框架，这个框架不仅仅是<strong>基于实例/全局表示的</strong>，而且可以在点级别捕获<strong>密集/局部的特征</strong></li></ol><h4 id="算法" tabindex="-1"><a class="header-anchor" href="#算法" aria-hidden="true">#</a> 算法</h4><p>对一个点云进行两种变换（旋转、平移和尺度缩放），然后使用contrastive loss对两种视角下点云的点进行对比学习，最小化匹配的点对之间的距离，同时最大化不匹配的点之间的距离，网络需要学习到几何变换下的不变性。</p><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027105510579.png" alt="image-20231027105510579"></p><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027103239818.png" alt="image-20231027103239818"></p><p>算法流程如下:</p><ul><li>对一个点云x，从两个不同的相机视角生成两个视角下的点云x1和x2（<strong>这一步是算法有效的关键</strong>），</li><li>然后分别对x1和x2进行随机刚体变换T1和T2，进一步将两个点云变成不同的视角加大任务的难度，</li><li>然后分别对两个点云进行编码，进行对比学习训练。</li></ul><h3 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h3><p>关于监督预训练？</p><blockquote><p>We deem this a very encouraging signal that suggests that the gap between supervised and unsupervised representation learning in 3D has been mostly closed (cf. years of effort in 2D).</p></blockquote><p>预训练是否可以被拉长训练回合替代？</p><blockquote><p>在迭代次数分别为20K和30K的时候，分割任务的mIoU分别为66.7%和66.1%。</p><p>This suggests that potentially many of the 3D datasets could fall into the “breakdown regime”[24] where network pre-training is essential for good performance.</p></blockquote><p>单视角设定下PointContrast是否也可以发挥作用？</p><blockquote><p>单视角+数据增强：在S3DIS上最好的mIoU为68.35%，仅仅比不进行预训练的68.17%</p><p>作者认为，<strong>这可能是因为multi-view可以让训练样本更多样，相机不稳定而产生的自然噪声让模型变得更加鲁棒。</strong></p></blockquote><hr><h2 id="depthcontrast" tabindex="-1"><a class="header-anchor" href="#depthcontrast" aria-hidden="true">#</a> DepthContrast</h2>',37),x=e("p",null,"ICCV 2021",-1),w={href:"https://paperswithcode.com/paper/self-supervised-pretraining-of-3d-features-on",target:"_blank",rel:"noopener noreferrer"},S=o('<p>四个贡献点：</p><p>1、该方法证明了，仅仅使用<strong>单视图的</strong>三维深度扫描信息就足以使用自监督学习获得有效的特征表示了(因为前面性能最好的算法是PointContrast，其使用了Mutil View的视图)</p><p>2、发现使用不同的输入表示，比如<strong>点云和体素，<strong>进行</strong>联合训练</strong>会有一个比较好的结果，远优于使用单个输入表示。</p><p>3、该算法适用于不同的模型框架，室内/室外的3D数据，单视角/多视角的3D数据。同时该算法可以用于预训练高容量的3D框架，并应用于检测、分割等下游任务。</p><p>4、该算法在多个下游任务上取得了最佳的表现效果</p><h3 id="方法-1" tabindex="-1"><a class="header-anchor" href="#方法-1" aria-hidden="true">#</a> 方法</h3><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027104724617.png" alt="image-20231027104724617"></p><ul><li><p>获取单帧深度图 ，转换为点云信息，使用<strong>数据增强</strong>获得两个增强视图</p></li><li><p>分别使用Voxel-based的网络和Point-based的网络<strong>为两个增强视图提取特征</strong>，得到4个特征</p></li><li><p>将这4个特征互相之间视为Positive pair，两两取出来使用Info-nce loss计算损失。</p></li></ul><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Point-based的方法下作者选用了<strong>PointNet++</strong></p><p>Voxel-based的方法下作者选用了<strong>U-Net</strong></p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027111151225.png" alt="image-20231027111151225" style="zoom:67%;"></div><div class="custom-container tip"><p class="custom-container-title">新的增强方法</p><ul><li>random crop</li><li>random drop patches 。</li></ul><p>这两个方法灵感来源于图像领域。其中random crop指随机从视图中<strong>挖出一块</strong>作为正样本，rondom drop paches指随机<strong>丢弃视图中的一部分</strong>(这样可以强迫网络关注<strong>局部形状特征</strong>)。</p></div><h3 id="结果-1" tabindex="-1"><a class="header-anchor" href="#结果-1" aria-hidden="true">#</a> 结果</h3><p>略，取得了sota</p><p>无分割任务，本文针对检测</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><ul><li>未考虑分割任务。</li><li>与 pointcontrast 相比，无需多视图信息，(无需相机位置)</li><li><strong>跨输入格式</strong>，将Voxel-based额 Point-based的方法结合了起来。</li></ul><hr><h2 id="masked-scene-contrast" tabindex="-1"><a class="header-anchor" href="#masked-scene-contrast" aria-hidden="true">#</a> Masked Scene Contrast</h2>',17),D=e("p",null,"A Scalable Framework for Unsupervised 3D Representation Learning",-1),M=e("p",null,"CVPR 2023",-1),A={href:"https://paperswithcode.com/paper/masked-scene-contrast-a-scalable-framework",target:"_blank",rel:"noopener noreferrer"},q=o('<h3 id="approch" tabindex="-1"><a class="header-anchor" href="#approch" aria-hidden="true">#</a> Approch</h3><h4 id="对比学习" tabindex="-1"><a class="header-anchor" href="#对比学习" aria-hidden="true">#</a> 对比学习</h4><p>我们的对比学习框架直接对点云数据进行操作。给定一个点云，对比学习框架可以总结如下：</p><ul><li>视图生成。对于给定的点云 X，我们使用一系列随机数据增强（包括光度、空间和采样增强）生成原始点云的查询视图 Xr 和关键视图 Xk。</li><li>特征提取。使用 U-Net 风格的主干 ζ(·) 将点云特征 Fr 和 Fk 分别编码为 ˆFr 和 ˆFk。</li><li>点匹配。对比学习的正样本是两个视图中空间位置接近的点对。对于属于查询视图的每个点，我们计算到关键视图的点的对应映射 P，如果 (i, j) ∈ P 则点 (pi, ci) 和点 (pj, cj) 在两个视图上构造一对。</li><li>损失计算。计算两个视图 ^Fr 和 ^Fk 的表示以及对应映射 P 的对比学习损失。编码的查询视图应该与其关键视图相似。</li></ul><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027113037643.png" alt="image-20231027113037643"></p><h5 id="数据增强" tabindex="-1"><a class="header-anchor" href="#数据增强" aria-hidden="true">#</a> 数据增强</h5><p>详见论文，</p><h4 id="重建学习" tabindex="-1"><a class="header-anchor" href="#重建学习" aria-hidden="true">#</a> 重建学习</h4><p>点云的特征由两部分组成，决定几何结构的坐标和表示纹理特征的颜色。我们分别为这两组特征建立重建目标。点云纹理的重建很直接，我们用线性投影预测每个点的光度值。我们计算重建的颜色和原始颜色之间的均方误差（MSE）作为颜色重建损失</p><p>点坐标在描述点云的几何结构中起着重要的作用，值得注意的是，直接重建掩蔽点的坐标是不合理的，因为掩蔽点只是从3D物体表面而不是连续表面本身采样的。重建点坐标会导致过拟合的表示。为了克服这个挑战，我们引入了surfel重建的概念。<strong>Surfel</strong>？？？是离散拓扑文献[26]和基元渲染[36]中的表面元素或表面体素的缩写。对于每个掩蔽点，我们重建相应surfel的法向量，并计算估计值和surfel法向量之间的平均余弦相似性作为对比损失</p><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027122545761.png" alt="image-20231027122545761"></p><hr><h2 id="macarons" tabindex="-1"><a class="header-anchor" href="#macarons" aria-hidden="true">#</a> MACARONS</h2>',13),O=e("p",null,"CVPR 2023",-1),N=e("p",null,"Mapping And Coverage Anticipation with RGB Online Self-Supervision",-1),E={href:"https://paperswithcode.com/paper/macarons-mapping-and-coverage-anticipation",target:"_blank",rel:"noopener noreferrer"},V=e("p",null,"未开源",-1),I=e("p",null,"NBV 问题，有点不相关",-1),z=e("p",null,"学习如何有效地探索场景并仅使用 RGB 传感器重建",-1),R=e("hr",null,null,-1),T=e("h2",{id:"point-m2ae",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#point-m2ae","aria-hidden":"true"},"#"),t(" Point-M2AE:")],-1),F=e("p",null,"NeurIPS 2022",-1),y=e("p",null,"Multi-scale Masked Autoencoders for Hierarchical Point Cloud Pre-training",-1),B={href:"https://paperswithcode.com/paper/point-m2ae-multi-scale-masked-autoencoders",target:"_blank",rel:"noopener noreferrer"},G=o('<p>一种用于对 3D 点云进行自监督预训练的多尺度掩码自编码器</p><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027123324673.png" alt="image-20231027123324673"></p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027124721885.png" alt="image-20231027124721885" style="zoom:67%;"><p>token emebeding：pointnet++</p><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027123607228.png" alt="image-20231027123607228"></p><hr><h2 id="geomae" tabindex="-1"><a class="header-anchor" href="#geomae" aria-hidden="true">#</a> GeoMAE</h2>',7),U=e("p",null,"CVPR 2023",-1),W=e("p",null,"Masked Geometric Target Prediction for Self-supervised Point Cloud Pre-Training",-1),L={href:"https://paperswithcode.com/paper/geomae-masked-geometric-target-prediction-for",target:"_blank",rel:"noopener noreferrer"},j=e("p",null,[e("strong",null,"引入点统计和表面属性预测目标来指导模型学习点云的几何特征。")],-1),X=e("p",null,"我们应该利用什么好的信号来从没有注释的点云中学习特征？为了回答这个问题，我们引入了基于几何特征重建的点云表示学习框架。与最近直接采用掩模自动编码器（MAE）并仅从掩模点云预测原始坐标或占用率的论文相比，我们的方法重新审视图像和点云之间的差异，并识别点云特有的三个自监督学习目标，即质心预测、法线估计和曲率预测。这三个目标相结合，产生了一项重要的自监督学习任务，并相互促进模型更好地推理点云的细粒度几何形状。",-1),H=e("p",null,[e("img",{src:"https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027125859553.png",alt:"image-20231027125859553"})],-1),K=e("p",null,[e("img",{src:"https://raw.githubusercontent.com/Overmind7/images/main/img/image-20231027130105291.png",alt:"image-20231027130105291"})],-1),J={href:"https://paperswithcode.com/paper/embracing-single-stride-3d-object-detector",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://zhuanlan.zhihu.com/p/476056546",target:"_blank",rel:"noopener noreferrer"},Y=e("p",null,"fix",-1),Z=e("hr",null,null,-1),$=e("hr",null,null,-1),ee=e("hr",null,null,-1),te={id:"返回",tabindex:"-1"},ne=e("a",{class:"header-anchor",href:"#返回","aria-hidden":"true"},"#",-1);function re(oe,ae){const r=a("ExternalLinkIcon"),i=a("RouterLink");return p(),l("div",null,[d,e("div",g,[u,e("p",null,[e("a",m,[t("10.文本相似度/语义相似度/文本匹配之对比学习和SimCSE以及InfoNCE loss - 知乎 (zhihu.com)"),n(r)])]),e("p",null,[e("a",_,[t("InfoNCE loss与交叉熵损失的联系，以及温度系数的作用-CSDN博客"),n(r)])]),f]),b,e("blockquote",null,[k,e("p",null,[e("a",v,[t("PointContrast: Unsupervised Pre-training for 3D Point Cloud Understanding | Papers With Code"),n(r)])]),e("p",null,[e("a",C,[t("FCGF-基于稀疏全卷积网络的点云特征描述子提取(ICCV2019) - 知乎 (zhihu.com)"),n(r)])])]),P,e("blockquote",null,[x,e("p",null,[e("a",w,[t("Self-Supervised Pretraining of 3D Features on any Point-Cloud | Papers With Code"),n(r)])])]),S,e("blockquote",null,[D,M,e("p",null,[e("a",A,[t("Masked Scene Contrast: A Scalable Framework for Unsupervised 3D Representation Learning | Papers With Code"),n(r)])])]),q,e("blockquote",null,[O,N,e("p",null,[e("a",E,[t("MACARONS: Mapping And Coverage Anticipation with RGB Online Self-Supervision | Papers With Code"),n(r)])]),V]),I,z,R,T,e("blockquote",null,[F,y,e("p",null,[e("a",B,[t("Point-M2AE: Multi-scale Masked Autoencoders for Hierarchical Point Cloud Pre-training | Papers With Code"),n(r)])])]),G,e("blockquote",null,[U,W,e("p",null,[e("a",L,[t("GeoMAE: Masked Geometric Target Prediction for Self-supervised Point Cloud Pre-Training | Papers With Code"),n(r)])])]),j,X,H,K,e("blockquote",null,[e("p",null,[e("a",J,[t("Embracing Single Stride 3D Object Detector with Sparse Transformer | Papers With Code"),n(r)])]),e("p",null,[e("a",Q,[t("SST：单步长稀疏Transformer 3D物体检测器 - 知乎 (zhihu.com)"),n(r)])])]),Y,Z,$,ee,e("h2",te,[ne,t(),n(i,{to:"/AI/3D/"},{default:h(()=>[t("返回")]),_:1})])])}const se=s(c,[["render",re],["__file","3d自监督.html.vue"]]);export{se as default};
