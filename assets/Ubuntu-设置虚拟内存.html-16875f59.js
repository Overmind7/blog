import{_ as s,o as a,c as n,e}from"./app-04b0d2b0.js";const i={},l=e(`<h1 id="ubuntu-设置虚拟内存" tabindex="-1"><a class="header-anchor" href="#ubuntu-设置虚拟内存" aria-hidden="true">#</a> Ubuntu 设置虚拟内存</h1><p>什么是swap？</p><blockquote><p>swap 简单的说就是将硬盘当内存用，用于解决内存容量不足的情况。</p></blockquote><h2 id="设置-swap" tabindex="-1"><a class="header-anchor" href="#设置-swap" aria-hidden="true">#</a> 设置 swap</h2><ol><li>查看当前系统是否设置了swap</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">free</span> <span class="token parameter variable">-m</span>
<span class="token comment">#swap栏都是 0 0 0 表示没有设置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://raw.githubusercontent.com/Overmind7/images/main/image-20230322201925248.png" alt="image-20230322201925248"></p><ol start="2"><li>创建 swap 文件</li></ol><p>使用下面命令创建交换文件。因为要分配硬盘空间，需要一点时间。count=4096 表示创建 4GB 的虚拟内存，单位是 M</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>/swapfile <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">4096</span> <span class="token assign-left variable">bs</span><span class="token operator">=</span>1M
<span class="token comment">#查看swap文件是否创建好了</span>
<span class="token function">ls</span> / <span class="token operator">|</span> <span class="token function">grep</span> swapfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li><p>激活 Swap 文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">600</span> /swapfile
<span class="token comment"># 获得文件权限</span>
<span class="token function">sudo</span> <span class="token function">mkswap</span> /swapfile
<span class="token comment"># 设置为 swapfile</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>挂载 swapfile</p></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">swapon</span> /swapfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>设置开机自启</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="删除-swap" tabindex="-1"><a class="header-anchor" href="#删除-swap" aria-hidden="true">#</a> 删除 swap</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#首先输入以下命令停用 SWAP 空间：</span>
<span class="token function">sudo</span> swapoff <span class="token parameter variable">-v</span> /swapfile

<span class="token comment">#在 /etc/fstab 文件中删除有效 swap 的行</span>

<span class="token comment">#最后执行以下命令删除 swapfile 文件：</span>
<span class="token function">sudo</span> <span class="token function">rm</span> /swapfil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),t=[l];function c(p,d){return a(),n("div",null,t)}const r=s(i,[["render",c],["__file","Ubuntu-设置虚拟内存.html.vue"]]);export{r as default};
