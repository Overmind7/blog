import{_ as e,r as o,o as p,c as t,a as s,d as n,b as l,e as i}from"./app-04b0d2b0.js";const r={},c=s("h2",{id:"安装自定义显卡驱动版本号",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#安装自定义显卡驱动版本号","aria-hidden":"true"},"#"),n(" 安装自定义显卡驱动版本号")],-1),d={href:"https://www.nvidia.cn/Download/index.aspx?lang=cn",target:"_blank",rel:"noopener noreferrer"},v=i(`<p>在英伟达官网找到合适的驱动版本</p><p>禁用系统自带的 nouveau 驱动：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/modprobe.d/blacklist-nouveau.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加黑名单：写上 <code>blacklist nouveau</code></p><p>然后更新</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> update-initramfs <span class="token parameter variable">-u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是有些人禁用后，输入</p><p><code>lsmod | grep nouveau</code></p><p>检查，还是有输出 那就改写成下面这样：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>blacklist nouveau
blacklist lbm-nouveau
options nouveau <span class="token assign-left variable">modeset</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token builtin class-name">alias</span> nouveau off
<span class="token builtin class-name">alias</span> lbm-nouveau off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启后<code>ctrl</code> + <code>alt</code> + <code>F1</code>进入命令行，开始操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">$sudo</span> <span class="token function">service</span> lightdm stop

<span class="token comment"># 进入驱动目录 ---- 第三步的作用</span>
<span class="token comment"># username是你自己的用户名/down是上面建立的，放我们下载的驱动文件</span>
<span class="token variable">$cd</span> /home/username/down

<span class="token comment"># 更改权限，tab补全名字</span>
<span class="token variable">$sudo</span> <span class="token function">chmod</span> a+x NVIDIA-Linux-x86_64-430.34.run

<span class="token string">&#39;&#39;</span>&#39; 安装 非常重要*****<span class="token string">&#39;&#39;</span>&#39;
<span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span><span class="token operator">|</span>
<span class="token variable">$sudo</span> ./NVIDIA-Linux-x86_64-390.77.run
	<span class="token string">&#39;&#39;</span>&#39;这里开始就很骚了,大概率会提示你<span class="token string">&#39;&#39;</span>&#39;
	the distribution-provided pre-install scipt failed，是否继续安装？
	<span class="token string">&#39;&#39;</span>&#39;如果你从来没有安装过nvidia驱动，甚至方法一都没有安装过，就走如下流程：<span class="token string">&#39;&#39;</span>&#39;
	<span class="token comment"># 1.按“continue”；</span>
	<span class="token comment"># 2.问你装32-bit库吗？按&#39;NO&#39; ，如果没问就是‘Warning...’无视它，点\`OK\`</span>
	<span class="token comment"># 3.问你“would you like to run the nvidia-xconfig ...”  按&#39;NO&#39;</span>
	<span class="token comment"># 4.一般会让你确认细节，点\`ok\`</span>
<span class="token operator">||</span><span class="token operator">|</span>BUT<span class="token operator">||</span>BUT<span class="token operator">||</span><span class="token operator">||</span><span class="token operator">|</span>BUT<span class="token operator">||</span><span class="token operator">||</span><span class="token operator">|</span>BUT<span class="token operator">||</span><span class="token operator">||</span>BUT<span class="token operator">||</span><span class="token operator">||</span>BUT<span class="token operator">||</span><span class="token operator">||</span><span class="token operator">||</span>BUT<span class="token operator">||</span><span class="token operator">||</span>
	<span class="token string">&#39;&#39;</span>&#39;如果你安装过驱动，请按<span class="token string">&#39;取消安装&#39;</span>，按以下流程走：<span class="token string">&#39;&#39;</span>&#39;
<span class="token variable">$sudo</span> <span class="token function">apt-get</span> remove <span class="token parameter variable">--purge</span> nvidia*	 <span class="token comment"># 1.删除以前安装的文件</span>
<span class="token variable">$sudo</span> ./Nvidiaxxxx你下载的驱动具体名字.run <span class="token parameter variable">-uninstall</span> 	 <span class="token comment"># 2.卸载文件内容</span>
	<span class="token string">&#39;&#39;</span>&#39; <span class="token number">3</span>. 回到上面的第六步和第七步，重新弄一遍<span class="token string">&#39;&#39;</span>&#39;
<span class="token variable">$sudo</span> <span class="token function">reboot</span>  <span class="token comment"># 重启</span>

<span class="token variable">$sudo</span> ./NVIDIA-Linux-x86_64-390.77.run <span class="token comment"># 4. 再安装</span>
	<span class="token comment"># 还是会提醒的，遇到警告也不怕</span>
		<span class="token comment"># 5.按“continue”；</span>
		<span class="token comment"># 6.问你装32-bit库吗？按&#39;NO&#39;</span>
		<span class="token comment"># 7.问你“would you like to run the nvidia-xconfig .......”  按&#39;NO&#39;</span>

<span class="token comment"># 开机～</span>
<span class="token variable">$sudo</span> <span class="token function">service</span> lightdm start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function u(m,k){const a=o("ExternalLinkIcon");return p(),t("div",null,[c,s("p",null,[s("a",d,[n("官方驱动 | NVIDIA"),l(a)])]),v])}const g=e(r,[["render",u],["__file","重装Ubuntu-的-Nvidia-驱动.html.vue"]]);export{g as default};
