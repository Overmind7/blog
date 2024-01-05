import{_ as l,o as n,c as e,e as t,a as s,d as a}from"./app-04b0d2b0.js";const i={},m=t('<h1 id="mvsnet-depth-inference-for-unstructured-multi-view-stereo" tabindex="-1"><a class="header-anchor" href="#mvsnet-depth-inference-for-unstructured-multi-view-stereo" aria-hidden="true">#</a> MVSNet: Depth Inference for Unstructured Multi-view Stereo</h1><blockquote><p>ECCV 2018</p></blockquote><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230513135723835.png" alt="image-20230513135723835"></p><h2 id="训练" tabindex="-1"><a class="header-anchor" href="#训练" aria-hidden="true">#</a> 训练</h2><h3 id="特征提取" tabindex="-1"><a class="header-anchor" href="#特征提取" aria-hidden="true">#</a> 特征提取</h3><p>与传统三维重建方法类似，第一步是提取图像特征（SIFT等特征子），不同点在于本文使用8层的卷积网络从图像当中提取更深层的图像特征表示，网络结构如下图所示：</p><blockquote><p>输入：N张3通道的图像，宽高为W,H 输出：N组32通道图，每通道尺度为,H/4,W/4</p></blockquote><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230513135923212.png" alt="image-20230513135923212"></p><blockquote><p>目标：提取每幅输入图像的特征，输入1个参考图像+N个原图像，输出N+1个32通道的特征图。 1.参数共享：与常见的匹配任务类似，参数在所有特征图间共享，即对所有视角的输入图像，用同一网络提取特征。 2.每个输入图像输出一个1/4原尺寸，32通道的特征图：将每个剩余像素的原始邻域信息编码到32通道的像素描述符中，<mark>与直接对原始图像稠密匹配相比，在特征空间中进行稠密匹配提高了重建质量。</mark></p></blockquote><h3 id="构建特征体-feature-volume" tabindex="-1"><a class="header-anchor" href="#构建特征体-feature-volume" aria-hidden="true">#</a> 构建特征体 Feature Volume</h3><h4 id="differentiable-homography" tabindex="-1"><a class="header-anchor" href="#differentiable-homography" aria-hidden="true">#</a> Differentiable Homography</h4>',11),p=s("p",null,[a("两个平面的变换矩阵，可以由两个视角的相机参数，深度d计算得到 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"H")]),s("annotation",{encoding:"application/x-tex"},"H")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.08125em"}},"H")])])])],-1),r=s("blockquote",null,[s("p",null,[a("目标：将所有特征图变换到参考相机的锥形立体空间，形成 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"N"),s("mo",null,"+"),s("mn",null,"1")]),s("annotation",{encoding:"application/x-tex"},"N+1")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7667em","vertical-align":"-0.0833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"N"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"1")])])]),a(" 个特征体"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"V"),s("mi",null,"i")])]),s("annotation",{encoding:"application/x-tex"},"V_i")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.22222em"}},"V"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3117em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.2222em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"i")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),a("。")])],-1),c=s("blockquote",null,[s("p",null,"单应性变换简单来说，对于3D空间的点X，我们通过相机1拍照，得到照片1上的对应二维像素点P（x,y）；"),s("p",null,"在另一个位置用相机2拍照，得到照片2上的对应二维像素点P’（x’,y’）——通过一个正确的单应矩阵H（包含相机1,2的位置转换参数R,T、相机1到点X的距离d），可以实现P’ = HP。"),s("p",null,"即在已经提前获取相机的内外参数前提下，因此只需要一个深度值变量，就可以找到ref图像上点P对应在src图像上点P’的位置。")],-1),h=s("p",null,[a("若我们已知两个位姿的相机参数（相机1,2的位置转换参数），现在设置一个深度区间"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"["),s("msub",null,[s("mi",null,"d"),s("mn",null,"1")]),s("mo",{separator:"true"},","),s("msub",null,[s("mi",null,"d"),s("mn",null,"2")]),s("mo",{stretchy:"false"},"]")]),s("annotation",{encoding:"application/x-tex"},"[d_1,d_2]")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"["),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mclose"},"]")])])]),a("，并设置分辨率为"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"d")]),s("annotation",{encoding:"application/x-tex"},"Δd")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord"},"Δ"),s("span",{class:"mord mathnormal"},"d")])])]),a("，由此得到"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"D"),s("mo",null,"="),s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"d"),s("mn",null,"2")]),s("mo",null,"−"),s("msub",null,[s("mi",null,"d"),s("mn",null,"1")]),s("mo",{stretchy:"false"},")"),s("mi",{mathvariant:"normal"},"/"),s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"d")]),s("annotation",{encoding:"application/x-tex"},"D=(d_2-d_1)/Δd")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mclose"},")"),s("span",{class:"mord"},"/Δ"),s("span",{class:"mord mathnormal"},"d")])])]),a("个平面，那么每个"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"d")]),s("annotation",{encoding:"application/x-tex"},"d")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"d")])])]),a("都对应了一个单应变换矩阵"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"h")]),s("annotation",{encoding:"application/x-tex"},"h")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"h")])])]),a("。 如果对一张图片上每个像素点，使用 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"d"),s("mi",null,"i")])]),s("annotation",{encoding:"application/x-tex"},"d_i")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3117em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"i")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),a(" 对应的矩阵 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"h"),s("mi",null,"i")]),s("annotation",{encoding:"application/x-tex"},"hi")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"hi")])])]),a(" 进行变换可以得到一张变换后的图片，意义为假设各个像素点真实深度都为 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"d")]),s("annotation",{encoding:"application/x-tex"},"d")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"d")])])]),a(" 时，在另一位姿下各像素点的应有的对应特征值。 而我们假设了 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"D")]),s("annotation",{encoding:"application/x-tex"},"D")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")])])]),a(" 个深度，也即将得到D幅变换后的图像，各图代表了其像素点真实深度为当前深度时变换对应的特征值，即可理解为上图中各层蓝色由深变浅的图层。")],-1),o=t('<blockquote><p>为什么是“<strong>锥形视锥</strong>”，因为当单应矩阵对应的真实深度不同时，由近大远小原理可知能被当前位置的相机看到的特征点数量随着深度减小而减小，因而出现锥形。（在下一步构建特征体时使用了<strong>双线性插值</strong>来保证所有深度的特征图尺寸一致）</p></blockquote><h4 id="特征体构建" tabindex="-1"><a class="header-anchor" href="#特征体构建" aria-hidden="true">#</a> 特征体构建</h4><blockquote><p>N,32,H,W -&gt; N,D,32,H,W</p></blockquote><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230513141511309.png" alt="image-20230513141511309" style="zoom:50%;"><blockquote><p>Ref的特征图则是直接在每个深度下复制，因为多个Src都是要变换到这个参考图下的</p></blockquote><h3 id="生成代价体-cost-volume" tabindex="-1"><a class="header-anchor" href="#生成代价体-cost-volume" aria-hidden="true">#</a> 生成代价体 cost volume</h3><blockquote><p>N,D,32,H,W -&gt; D,32,H,W</p></blockquote>',7),u=s("p",null,[a("假设深度为 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"d"),s("mn",null,"1")])]),s("annotation",{encoding:"application/x-tex"},"d_1")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),a(" 时，各特征图上各像素经过变换后的特征值——若某个像素真实深度接近 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"d"),s("mn",null,"1")])]),s("annotation",{encoding:"application/x-tex"},"d_1")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),a(" 的话，那变换后该列该处的特征值应该是近似的。 基于这样的想法，对每一列书的每一页上的每个像素计算方差，代表了假设深度为 $d_i $时，各图像特征图的各通道各特征点的差异情况，方差越小，越相似，该特征点真实深度就越可能是 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"d"),s("mi",null,"i")])]),s("annotation",{encoding:"application/x-tex"},"d_i")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3117em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"i")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),a("。")],-1),g=s("blockquote",null,[s("p",null,"采用方差的方法，解决了任意输入N个输入的问题")],-1),d=s("h3",{id:"代价体正则化",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#代价体正则化","aria-hidden":"true"},"#"),a(" 代价体正则化")],-1),v=s("blockquote",null,[s("p",null,"D,32,H,W -> D,H,W")],-1),x=s("p",null,[a("第3步中得到了代价体，但论文说 “The raw cost volume computed from image features could be noise-contaminated” ，即这个代价体由于非朗伯面、遮挡等原因是包含噪声的，要通过正则化来得到一个"),s("strong",null,"概率体"),a(),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"P")]),s("annotation",{encoding:"application/x-tex"},"P")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"P")])])]),a("（probability volume）")],-1),y=t('<p>具体采用了一个类似UNet(3D CNN)的网络结构，对原 代价体 进行编码和解码，并最终将各通道数压缩为1，即将一摞书变成了一本书</p><blockquote><p>网络:类似于3D-UNet，使用编码器-解码器结构，以相对较低的内存和计算成本，从一个大的感受野聚集相邻的信息。</p><p>把深度的取值集中起来</p></blockquote><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230513142443796.png" alt="" style="zoom:50%;"><h3 id="深度图初始估计" tabindex="-1"><a class="header-anchor" href="#深度图初始估计" aria-hidden="true">#</a> 深度图初始估计</h3><blockquote><p>D,H,W -&gt; H,W</p></blockquote><p>利用上一步的概率体，沿深度d方向求期望，就得到对应像素点的初始深度值； 对每个像素点求期望，即将概率体变成了一张概率图。</p><blockquote><p>soft argmin</p><p>使用期望的优势： 1.相比于argmax，过程可微 2.可以产生连续的深度估计</p></blockquote><p>###　深度图优化</p><ol><li>将参考图像缩小1/4，使其和初始深度图尺寸相同</li><li>将深度图 H,W,1 归一化</li><li>两图通道拼接 H,W,3+1 输入四层残差卷积网络进行信息融合</li><li>输出单通道特征图 H,W,1，并还原到深度加深区间（逆归一化），与初始深度图逐元素相加，得到优化的深度图</li></ol><blockquote><p>目的：利用ref图的边界信息优化深度图</p><p>初始深度图由于正则化，感受野变大，重建的边界可能过度平滑</p><p>自然场景的ref图包含边界信息<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230513143002691.png" alt="image-20230513143002691"></p></blockquote><h3 id="损失计算" tabindex="-1"><a class="header-anchor" href="#损失计算" aria-hidden="true">#</a> 损失计算</h3><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230513144219611.png" alt="image-20230513144219611" style="zoom:50%;"><ul><li><p>使用 L1 损失，分别对init 和 refined 进行损失计算，加权相加</p></li><li><p>只考虑GT中有深度信息的像素点</p></li></ul><h2 id="后处理" tabindex="-1"><a class="header-anchor" href="#后处理" aria-hidden="true">#</a> 后处理</h2><h3 id="深度图滤波" tabindex="-1"><a class="header-anchor" href="#深度图滤波" aria-hidden="true">#</a> 深度图滤波</h3><p>depth map fliter</p><h4 id="几何约束" tabindex="-1"><a class="header-anchor" href="#几何约束" aria-hidden="true">#</a> 几何约束</h4><p>几何约束测量多个视图之间的深度一致性。类似于立体的左右视差检查</p>',18),b=s("ul",null,[s("li",null,"将参考像素 p1 通过其深度 d1 投影到另一个视图中的像素 pi，"),s("li",null,"然后通过 pi 的深度估计 di 将 pi 重新投影回参考图像。"),s("li",null,[a("如果重投影坐标 $p_{reproj} $和重投影深度 $d_{reproj} $满足 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",{mathvariant:"normal"},"∣"),s("msub",null,[s("mi",null,"p"),s("mrow",null,[s("mi",null,"r"),s("mi",null,"e"),s("mi",null,"p"),s("mi",null,"r"),s("mi",null,"o"),s("mi",null,"j")])]),s("mo",null,"−"),s("msub",null,[s("mi",null,"p"),s("mn",null,"1")]),s("mi",{mathvariant:"normal"},"∣"),s("mo",null,"<"),s("mn",null,"1")]),s("annotation",{encoding:"application/x-tex"},"|p_{reproj} − p_1| < 1")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.0361em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},"∣"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"p"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3117em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"re"),s("span",{class:"mord mathnormal mtight"},"p"),s("span",{class:"mord mathnormal mtight"},"ro"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05724em"}},"j")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"p"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord"},"∣"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"<"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"1")])])]),a(" 和 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",{mathvariant:"normal"},"∣"),s("msub",null,[s("mi",null,"d"),s("mrow",null,[s("mi",null,"r"),s("mi",null,"e"),s("mi",null,"p"),s("mi",null,"r"),s("mi",null,"o"),s("mi",null,"j")])]),s("mo",null,"−"),s("msub",null,[s("mi",null,"d"),s("mn",null,"1")]),s("mi",{mathvariant:"normal"},"∣"),s("mi",{mathvariant:"normal"},"/"),s("msub",null,[s("mi",null,"d"),s("mn",null,"1")]),s("mo",null,"<"),s("mn",null,"0.01")]),s("annotation",{encoding:"application/x-tex"},"|d_{reproj} − d_1|/d_1 < 0.01")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.0361em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},"∣"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3117em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"re"),s("span",{class:"mord mathnormal mtight"},"p"),s("span",{class:"mord mathnormal mtight"},"ro"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.05724em"}},"j")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord"},"∣/"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"d"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"<"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"0.01")])])]),a("，我们说 p1 的深度估计 d1 是双视图一致的。")]),s("li",null,"在实验中，所有深度至少应在三个视图中保持一致。")],-1),w=t('<h4 id="光度约束" tabindex="-1"><a class="header-anchor" href="#光度约束" aria-hidden="true">#</a> 光度约束</h4><p>光度约束，其实是在通过概率体得到初始深度图的同时计算了一个概率图</p><blockquote><p>D,H,W -&gt; H,W</p></blockquote><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230513145148583.png" alt="image-20230513145148583"></p><blockquote><p>内点像素(上)和离群点像素(下)的概率分布，其中x轴为深度指数假设，y轴为概率，红线为软边界结果;(d)概率图。如(c)所示，离群值分布分散，导致(d)的概率估计较低</p></blockquote><ul><li>对 H,W 平面的每个点沿 d 方向计算四个邻域的概率和，再沿 d 方向取最大的概率和</li></ul><p>各像素点的深度越集中在某个深度附近，则该点深度判断的准确概率越高，最后过滤掉概率小于0.8的点。</p><blockquote><p>虽然多尺度 3D CNN 具有很强的将概率正则化为单一模态分布的能力，但我们注意到对于那些错误匹配的像素，它们的概率分布是分散的并且不能集中到一个峰值（见图 2（c）） ).基于这一观察，我们将深度估计的质量定义为地面真实深度在估计附近的一个小范围内的概率。由于深度假设是沿着相机平截头体离散采样的，我们简单地对四个最近的深度假设进行概率和来衡量估计质量。请注意，此处也可以使用标准偏差或熵等其他统计测量值，但在我们的实验中，我们观察到这些测量值对深度图过滤没有显着改善。此外，我们的概率和公式可以更好地控制异常值过滤的阈值参数。</p></blockquote><h3 id="深度图融合" tabindex="-1"><a class="header-anchor" href="#深度图融合" aria-hidden="true">#</a> 深度图融合</h3><ul><li><p>将不同视点的深度图融合到统一的点云表示中，使用基于可见性的融合算法，把遮挡，光照等影响降到了最低，使得不同视点之间的深度遮挡和冲突最小化。</p></li><li><p>为了进一步抑制重建噪声，在滤波步骤中确定每个像素的可见视图，</p></li><li><p>并将所有重投影深度的平均值作为像素的最终深度估计。</p></li></ul><p>融合后的深度图直接投影到空间，生成三维点云。</p><p>[TOC]</p>',12),k=[m,p,r,c,h,o,u,g,d,v,x,y,b,w];function f(_,M){return n(),e("div",null,k)}const q=l(i,[["render",f],["__file","MVSNet.html.vue"]]);export{q as default};
