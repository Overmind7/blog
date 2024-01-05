import{_ as o,r as t,o as r,c as p,a as s,d as a,b as n,w as m,e as l}from"./app-04b0d2b0.js";const c={},h=s("h1",{id:"clips",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#clips","aria-hidden":"true"},"#"),a(" CLIPS")],-1),u=s("blockquote",null,[s("p",null,"Learning Transferable Visual Models From Natural Language Supervision")],-1),d=s("p",null,"26 Feb 2021",-1),g={href:"https://openai.com/research/clip",target:"_blank",rel:"noopener noreferrer"},f={href:"https://inmeta.medium.com/clip-from-openai-what-is-it-and-how-you-can-try-it-out-yourself-6f9a870efe00",target:"_blank",rel:"noopener noreferrer"},_=l(`<h2 id="出发点" tabindex="-1"><a class="header-anchor" href="#出发点" aria-hidden="true">#</a> 出发点</h2><ul><li>传统的图像分类模型无法对类别进行拓展，想要保证准确率只能从头开始训练，费时费力。</li><li>CLIP模型就可以用来解决这种问题，预训练后的模型就可以直接进行zero-shot</li></ul><h2 id="成果" tabindex="-1"><a class="header-anchor" href="#成果" aria-hidden="true">#</a> 成果</h2><ul><li><strong>将图像和任意的文本联系起来</strong>，只需要简单地提供包含新类别的文本描述就可以使用该模型来识别新类别。</li><li>CLIP在完全不使用ImageNet中所有训练数据的前提下直接Zero-shot得到的结果与ResNet在128W ImageNet数据训练效果一致</li><li>CLIP使用4亿个配对的数据和文本来进行训练，不标注直接爬取（没有解决transformer训练所需数据量大的缺点）</li></ul><hr><h2 id="train" tabindex="-1"><a class="header-anchor" href="#train" aria-hidden="true">#</a> Train</h2><p>以一个batch size为N的输入为例，</p><ul><li>首先，N张图像和N个文本分别被各自模态的Encoder编码成高维向量。</li><li>然后，用它们的向量表示建立一个相似度矩阵（图中，I*T表示两模态向量的内积）。值得注意的是，在训练过程中，<strong>矩阵对角线上的内积是匹配图文的内积</strong>（即当前batch内，文本T1和图像I1是匹配的图文对，而文本T1和图像I2是不匹配的图文对）。我们知道内积越大，相似度越高，因此匹配的图文对的相似度（内积）必须高于同一行/列中其他图文对的相似度（内积）才合理。</li><li>于是，训练的目标可以看作是在进行对比，对比的目的是使同一行/列中匹配图文的内积尽可能大，不匹配图文的内积尽可能小。我们也可以用更通俗的方式来理解：每一行都是一个分类任务，给定一个输入图像I，预测匹配的那个文本是谁。同理，每一列都是一个分类任务：给定输入文本T，预测匹配的那张图像是谁。</li><li>在训练期间，Open AI使用了非常大规模的batch size（32768），这可以充分发挥这种对比训练的潜力。</li></ul><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230603105521598.png" alt="image-20230603105521598" style="zoom:50%;"><blockquote><p>标准图像模型联合训练图像特征提取器和线性分类器来预测某些标签，而 CLIP 联合训练图像编码器和文本编码器来预测一批（图像、文本）训练示例的正确配对。在测试时，学习的文本编码器通过嵌入目标数据集类的名称或描述来合成零样本线性分类器。</p></blockquote><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># image_encoder - ResNet or Vision Transformer</span>
<span class="token comment"># text_encoder  - CBOW or Text Transformer</span>
<span class="token comment"># I[n, h, w, c] - minibatch of aligned images</span>
<span class="token comment"># T[n, l]       - minibatch of aligned texts</span>
<span class="token comment"># W_i[d_i, d_e] - learned proj of image to embed</span>
<span class="token comment"># W_t[d_t, d_e] - learned proj of text to embed</span>
<span class="token comment"># t             - learned temperature parameter</span>

<span class="token comment"># 分别提取图像特征和文本特征</span>
I_f <span class="token operator">=</span> image_encoder<span class="token punctuation">(</span>I<span class="token punctuation">)</span> <span class="token comment">#[n, d_i]</span>
T_f <span class="token operator">=</span> text_encoder<span class="token punctuation">(</span>T<span class="token punctuation">)</span> <span class="token comment">#[n, d_t]</span>

<span class="token comment"># 对两个特征进行线性投射，得到相同维度的特征，并进行l2归一化</span>
I_e <span class="token operator">=</span> l2_normalize<span class="token punctuation">(</span>np<span class="token punctuation">.</span>dot<span class="token punctuation">(</span>I_f<span class="token punctuation">,</span> W_i<span class="token punctuation">)</span><span class="token punctuation">,</span> axis<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
T_e <span class="token operator">=</span> l2_normalize<span class="token punctuation">(</span>np<span class="token punctuation">.</span>dot<span class="token punctuation">(</span>T_f<span class="token punctuation">,</span> W_t<span class="token punctuation">)</span><span class="token punctuation">,</span> axis<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment"># 计算缩放的余弦相似度：[n, n]</span>
logits <span class="token operator">=</span> np<span class="token punctuation">.</span>dot<span class="token punctuation">(</span>I_e<span class="token punctuation">,</span> T_e<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>exp<span class="token punctuation">(</span>t<span class="token punctuation">)</span>

<span class="token comment"># 对称的对比学习损失：等价于N个类别的cross_entropy_loss</span>
labels <span class="token operator">=</span> np<span class="token punctuation">.</span>arange<span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token comment"># 对角线元素的labels</span>
loss_i <span class="token operator">=</span> cross_entropy_loss<span class="token punctuation">(</span>logits<span class="token punctuation">,</span> labels<span class="token punctuation">,</span> axis<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
loss_t <span class="token operator">=</span> cross_entropy_loss<span class="token punctuation">(</span>logits<span class="token punctuation">,</span> labels<span class="token punctuation">,</span> axis<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
loss <span class="token operator">=</span> <span class="token punctuation">(</span>loss_i <span class="token operator">+</span> loss_t<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="infer" tabindex="-1"><a class="header-anchor" href="#infer" aria-hidden="true">#</a> infer</h2><p>在推理过程中，使用者可以按照prompt（提示词）的格式自定义新文本。将新文本和图像送入CLIP模型后，通过内积值的大小来判断新文本和图像是否是匹配的。如下图所示，提示词是a photo of a {object}.，我们只需要将我们想判断的类别跟{object}进行替换即可。例如，我想判断这个图片是不是狗，我的新文本就是a photo of a dog.</p><p>经典的分类训练只关心模型是否可以正确预测图像的分类标签。如果模型预测成功了狗，那么它不在乎图像是一张狗的照片，还是一张狗的素描。而CLIP模型在大规模数据集上完成的训练，这使得CLIP模型还学习到了图像的各方面信息。</p><p>例如，<strong>CLIP模型对用于图像描述的单词很敏感</strong>。文本“a photo of a bird”、“a photo of a bird siting near bird feeder”或“an image of a bird”与相同的图像匹配产生的概率是不同的。</p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/1IrZpxiICRN-SXmpryhLNtA.png" alt="img" style="zoom:67%;"><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230603114018949.png" alt="image-20230603114018949"></p><h1 id="clip损失引导生成" tabindex="-1"><a class="header-anchor" href="#clip损失引导生成" aria-hidden="true">#</a> CLIP损失引导生成</h1><h2 id="diffusioncllp" tabindex="-1"><a class="header-anchor" href="#diffusioncllp" aria-hidden="true">#</a> DiffusionCLlP</h2>`,20),v={href:"https://paperswithcode.com/paper/diffusionclip-text-guided-image-manipulation",target:"_blank",rel:"noopener noreferrer"},b=s("p",null,"CVPR 2022",-1),k=s("p",null,"过使扩散生成时的图像和目标文本的多模态CLIP损失尽可能小。",-1),y=s("p",null,"CLIP Loss",-1),x=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",{mathvariant:"script"},"L"),s("mrow",null,[s("mi",null,"d"),s("mi",null,"i"),s("mi",null,"r"),s("mi",null,"e"),s("mi",null,"c"),s("mi",null,"t"),s("mi",null,"i"),s("mi",null,"o"),s("mi",null,"n")])]),s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"x"),s("mrow",null,[s("mi",null,"g"),s("mi",null,"e"),s("mi",null,"n")])]),s("mo",{separator:"true"},","),s("msub",null,[s("mi",null,"y"),s("mrow",null,[s("mi",null,"t"),s("mi",null,"a"),s("mi",null,"r")])]),s("mo",{separator:"true"},";"),s("msub",null,[s("mi",null,"x"),s("mrow",null,[s("mi",null,"r"),s("mi",null,"e"),s("mi",null,"f")])]),s("mo",{separator:"true"},","),s("msub",null,[s("mi",null,"y"),s("mrow",null,[s("mi",null,"r"),s("mi",null,"e"),s("mi",null,"f")])]),s("mo",{stretchy:"false"},")"),s("mo",null,":"),s("mo",null,"="),s("mn",null,"1"),s("mo",null,"−"),s("mfrac",null,[s("mrow",null,[s("mo",{fence:"true"},"⟨"),s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"I"),s("mo",{separator:"true"},","),s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"T"),s("mo",{fence:"true"},"⟩")]),s("mrow",null,[s("mrow",null,[s("mo",{fence:"true"},"∥"),s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"I"),s("mo",{fence:"true"},"∥")]),s("mrow",null,[s("mo",{fence:"true"},"∥"),s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"T"),s("mo",{fence:"true"},"∥")])])])]),s("annotation",{encoding:"application/x-tex"}," \\mathcal{L} _{direction}(x_{gen},y_{tar};x_{ref},y_{ref}):=1-\\frac{\\left \\langle \\Delta I,\\Delta T \\right \\rangle }{\\left \\| \\Delta I \\right \\| \\left \\| \\Delta T \\right \\| } ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.0361em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathcal"},"L"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3361em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"d"),s("span",{class:"mord mathnormal mtight"},"i"),s("span",{class:"mord mathnormal mtight"},"rec"),s("span",{class:"mord mathnormal mtight"},"t"),s("span",{class:"mord mathnormal mtight"},"i"),s("span",{class:"mord mathnormal mtight"},"o"),s("span",{class:"mord mathnormal mtight"},"n")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"x"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"g"),s("span",{class:"mord mathnormal mtight"},"e"),s("span",{class:"mord mathnormal mtight"},"n")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2806em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0359em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"t"),s("span",{class:"mord mathnormal mtight"},"a"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.02778em"}},"r")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mpunct"},";"),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"x"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3361em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"re"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.10764em"}},"f")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3361em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0359em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"re"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.10764em"}},"f")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mclose"},")"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},":="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.363em","vertical-align":"-0.936em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.427em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"minner"},[s("span",{class:"mopen delimcenter",style:{top:"0em"}},"∥"),s("span",{class:"mord"},"Δ"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I"),s("span",{class:"mclose delimcenter",style:{top:"0em"}},"∥")]),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"minner"},[s("span",{class:"mopen delimcenter",style:{top:"0em"}},"∥"),s("span",{class:"mord"},"Δ"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),s("span",{class:"mclose delimcenter",style:{top:"0em"}},"∥")])])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"minner"},[s("span",{class:"mopen delimcenter",style:{top:"0em"}},"⟨"),s("span",{class:"mord"},"Δ"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I"),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},"Δ"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),s("span",{class:"mclose delimcenter",style:{top:"0em"}},"⟩")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.936em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})])])])])])],-1),I=s("p",null,[a("其中 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"I")]),s("annotation",{encoding:"application/x-tex"},"\\Delta I")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord"},"Δ"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I")])])]),a(" 是图像编码器对生成图和原图的编码向量差，"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",{mathvariant:"normal"},"Δ"),s("mi",null,"T")]),s("annotation",{encoding:"application/x-tex"},"\\Delta T")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord"},"Δ"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T")])])]),a("是文本编码器对目标文本和原文本的编码向量的差。")],-1),w=s("img",{src:"https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230603133758788.png",alt:"image-20230603133758788",style:{zoom:"67%"}},null,-1),C=s("h1",{id:"vq-vae",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vq-vae","aria-hidden":"true"},"#"),a(" VQ-VAE")],-1),L={href:"https://zhuanlan.zhihu.com/p/496148378",target:"_blank",rel:"noopener noreferrer"},N={href:"https://zhuanlan.zhihu.com/p/463043201",target:"_blank",rel:"noopener noreferrer"},T={href:"https://kexue.fm/archives/5253",target:"_blank",rel:"noopener noreferrer"},z={href:"https://kexue.fm/archives/5343",target:"_blank",rel:"noopener noreferrer"},P=s("p",null,[s("img",{src:"https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230603141158999.png",alt:"image-20230603141158999"})],-1),V=s("h1",{id:"vqgan",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vqgan","aria-hidden":"true"},"#"),a(" VQGAN")],-1),A=s("p",null,"Taming Transformers for High-Resolution Image Synthesis",-1),D={href:"https://paperswithcode.com/conference/cvpr-2021-1",target:"_blank",rel:"noopener noreferrer"},q=l('<p>驯化transformer来生成高解析度图像</p><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><p>图像的序列长度远比自然语言高。自然语言模型往往将生成序列的长度控制在1024或512内，但如果将自然语言模型里的transformer用来自回归式逐位生成像素的话，1024的长度只能生成32*32大小的图像。并且，attention的计算复杂度是随着序列长度的增长以平方级增长的，这样就限制了能生成图像的大小。虽然相比于CNN，transformer并不对输入进行任何先验的假设（例如平移不变性，局部性等）并且因此能够很好地拟合输入间复杂的关系，但这种普适泛化性也意味着你需要更充足的训练和更广泛的搜索范围。</p><p>**有没有办法既兼具CNN的先验偏置，又兼具transformer建模序列的泛化性？**这篇文章主要在探讨如何解决这个问题。作者提出了以下洞见：<strong>CNN的归纳偏置可以很好地概括图像的底层结构特性（例如它的局部性），但这种偏置对于语义层面（即图像的整体理解，全局把握）的建模用处不大。</strong></p><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2><p>提出了一种CNN+GAN+Transformer的结构来生成高精度图像。</p><ul><li>第一个步骤先训练一个VQVAE模型，其中CNN负责作为编码器，将图像编码成一个个具体且感知丰富（由感知损失Perceptual loss和GAN共同完成）的离散编码向量，再由解码器（也是CNN架构）还原原图像。</li><li>而在得到了编解码器后采样生成的第二个步骤时，训练一个transformer来学习第一步里的离散编码向量序列间的关系。</li></ul><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230603140606220.png" alt="image-20230603140606220"></p><p><strong>VQGAN或者DALL-E都使用了Transformer架构将潜在空间里的离散索引序列的建模问题转化为了一维的序列生成问题。</strong> ？？？？</p><h1 id="vqgan-clip" tabindex="-1"><a class="header-anchor" href="#vqgan-clip" aria-hidden="true">#</a> VQGAN-CLIP</h1>',10),M={href:"https://paperswithcode.com/paper/vqgan-clip-open-domain-image-generation-and",target:"_blank",rel:"noopener noreferrer"},S=s("p",null,"用一个多模态的编码器来计算文和图的编码向量的余弦相似度，并将该相似度以损失的形式传递给图像生成器，不断迭代直到收敛。而这种流程对于用文本引导从零生成和以图生图的区别仅在于输入是随机噪声还是给定图像。",-1),O=s("p",null,[s("img",{src:"https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230603145014579.png",alt:"image-20230603145014579"})],-1),E=s("h1",{id:"stable-diffusion",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#stable-diffusion","aria-hidden":"true"},"#"),a(" Stable-Diffusion")],-1),G={href:"https://github.com/CompVis/stable-diffusion",target:"_blank",rel:"noopener noreferrer"},R=s("p",null,"CVPR 2022",-1),Q=s("p",null,"Disco-Diffusion：diffusion + clip，在全图像素上进行扩散，训练一个这样的模型需要数百个V100卡满载天数，而且下游推理同样费时费力。",-1),W=s("h2",{id:"总结",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),a(" 总结")],-1),j=s("ul",null,[s("li",null,[s("p",null,"最本质来说，SD相当于VQGAN里的Transformer被替换成了diffusion model。")]),s("li",null,[s("p",null,"论文的另一个核心贡献是探索了使用cross-attention做多模态的条件扩散生成。")])],-1);function B(F,Z){const e=t("ExternalLinkIcon"),i=t("RouterLink");return r(),p("div",null,[h,u,s("blockquote",null,[d,s("p",null,[s("a",g,[a("CLIP: Connecting text and images (openai.com)"),n(e)])]),s("p",null,[s("a",f,[a("CLIP from OpenAI: what is it and how you can try it out yourself | by Inmeta | Medium"),n(e)])])]),_,s("blockquote",null,[s("p",null,[s("a",v,[a("DiffusionCLIP: Text-Guided Diffusion Models for Robust Image Manipulation | Papers With Code"),n(e)])]),b]),k,y,x,I,w,C,s("blockquote",null,[s("p",null,[s("a",L,[a("VQVAE原理解读 - 知乎 (zhihu.com)"),n(e)])]),s("p",null,[s("a",N,[a("生成模型之VQ-VAE - 知乎 (zhihu.com)"),n(e)])]),s("p",null,[s("a",T,[a("变分自编码器（一）：原来是这么一回事 - 科学空间|Scientific Spaces (kexue.fm)"),n(e)])]),s("p",null,[s("a",z,[a("变分自编码器（二）：从贝叶斯观点出发 - 科学空间|Scientific Spaces (kexue.fm)"),n(e)])])]),P,V,s("blockquote",null,[A,s("p",null,[s("a",D,[a("CVPR 2021"),n(e)])])]),q,s("blockquote",null,[s("p",null,[s("a",M,[a("VQGAN-CLIP: Open Domain Image Generation and Editing with Natural Language Guidance | Papers With Code"),n(e)])])]),S,O,E,s("blockquote",null,[s("p",null,[s("a",G,[a("CompVis/stable-diffusion: A latent text-to-image diffusion model (github.com)"),n(e)])]),R]),Q,s("p",null,[n(i,{to:"/AI/generate/diffusion/StableDiffusion.html"},{default:m(()=>[a("StableDiffusion")]),_:1})]),W,j])}const X=o(c,[["render",B],["__file","CLIP引导生成.html.vue"]]);export{X as default};
