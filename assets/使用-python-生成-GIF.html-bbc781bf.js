import{_ as a,r as t,o as e,c as p,a as n,d as o,b as i,e as c}from"./app-04b0d2b0.js";const l={},u=c(`<h1 id="使用-python-生成-gif" tabindex="-1"><a class="header-anchor" href="#使用-python-生成-gif" aria-hidden="true">#</a> 使用 python 生成 GIF</h1><p>有一串图片，要生成 GIF 动画</p><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202210101545058.gif" alt="传统方法" style="zoom:80%;"><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> imageio
<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path


<span class="token keyword">def</span> <span class="token function">imgs2gif</span><span class="token punctuation">(</span>imgPaths<span class="token punctuation">,</span> saveName<span class="token punctuation">,</span> duration<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> loop<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> fps<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    生成动态图片 格式为 gif
    :param imgPaths: 一系列图片路径
    :param saveName: 保存gif的名字
    :param duration: gif每帧间隔， 单位 秒
    :param fps: 帧率
    :param loop: 播放次数（在不同的播放器上有所区别）， 0代表循环播放
    :return:
    &quot;&quot;&quot;</span>
    <span class="token keyword">if</span> fps<span class="token punctuation">:</span>
        duration <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">/</span> fps
    images <span class="token operator">=</span> <span class="token punctuation">[</span>imageio<span class="token punctuation">.</span>imread<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>img_path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> img_path <span class="token keyword">in</span> imgPaths<span class="token punctuation">]</span>
    imageio<span class="token punctuation">.</span>mimsave<span class="token punctuation">(</span>saveName<span class="token punctuation">,</span> images<span class="token punctuation">,</span> <span class="token string">&quot;gif&quot;</span><span class="token punctuation">,</span> duration<span class="token operator">=</span>duration<span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>


pathlist <span class="token operator">=</span> Path<span class="token punctuation">(</span><span class="token string">r&quot;E:/Work/SLAM-2D-LIDAR-SCAN/Output&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>glob<span class="token punctuation">(</span><span class="token string">&quot;*.png&quot;</span><span class="token punctuation">)</span>

p_lis <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> n<span class="token punctuation">,</span> p <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>pathlist<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> n <span class="token operator">%</span> <span class="token number">5</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        p_lis<span class="token punctuation">.</span>append<span class="token punctuation">(</span>p<span class="token punctuation">)</span>

imgs2gif<span class="token punctuation">(</span>p_lis<span class="token punctuation">,</span> <span class="token string">&quot;exp.gif&quot;</span><span class="token punctuation">,</span> <span class="token number">0.033</span> <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token comment"># imgs2gif(p_lis, &quot;exp2.gif&quot;, 0.033 * 5, 1)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),r={href:"https://blog.csdn.net/qq_42886289/article/details/115911308",target:"_blank",rel:"noopener noreferrer"};function d(k,m){const s=t("ExternalLinkIcon");return e(),p("div",null,[u,n("blockquote",null,[n("p",null,[n("a",r,[o("python生成gif"),i(s)])])])])}const b=a(l,[["render",d],["__file","使用-python-生成-GIF.html.vue"]]);export{b as default};
