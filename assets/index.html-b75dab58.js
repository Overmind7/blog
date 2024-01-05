import{_ as d,r,o as c,c as l,a as e,b as n,w as t,d as a,e as i}from"./app-04b0d2b0.js";const u={},p=e("hr",null,null,-1),h=e("h2",{id:"ubuntu",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ubuntu","aria-hidden":"true"},"#"),a(" Ubuntu")],-1),b={id:"解决qt-qpa-xcb-could-not-connect-to-display问题",tabindex:"-1"},m=e("a",{class:"header-anchor",href:"#解决qt-qpa-xcb-could-not-connect-to-display问题","aria-hidden":"true"},"#",-1),v={id:"ubuntu设置虚拟内存",tabindex:"-1"},_=e("a",{class:"header-anchor",href:"#ubuntu设置虚拟内存","aria-hidden":"true"},"#",-1),k={id:"screen安装与使用",tabindex:"-1"},f=e("a",{class:"header-anchor",href:"#screen安装与使用","aria-hidden":"true"},"#",-1),g=i(`<h3 id="修改文件夹权限" tabindex="-1"><a class="header-anchor" href="#修改文件夹权限" aria-hidden="true">#</a> 修改文件夹权限</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span> /media/john/diskname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>777 代表 修改，读取，执行</p><p>一般用 chown ，那个是更改所有者，添加权限就行了</p>`,4),E={href:"https://www.runoob.com/linux/linux-comm-chmod.html",target:"_blank",rel:"noopener noreferrer"},x={href:"https://blog.csdn.net/qq_43577613/article/details/122422292",target:"_blank",rel:"noopener noreferrer"},A={id:"重装ubuntu-的-nvidia-驱动",tabindex:"-1"},B=e("a",{class:"header-anchor",href:"#重装ubuntu-的-nvidia-驱动","aria-hidden":"true"},"#",-1),q={id:"ubuntu挂载多个硬盘并赋予权限",tabindex:"-1"},D=e("a",{class:"header-anchor",href:"#ubuntu挂载多个硬盘并赋予权限","aria-hidden":"true"},"#",-1),y=i(`<hr><hr><h4 id="批量修改-jpeg-文件后缀" tabindex="-1"><a class="header-anchor" href="#批量修改-jpeg-文件后缀" aria-hidden="true">#</a> 批量修改 JPEG 文件后缀</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rename</span>  <span class="token string">&#39;s/\\.JPG/.jpg/&#39;</span>  *.JPG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><hr><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h2>`,7),N=i(`<h3 id="使用-docker-创建-conda-环境" tabindex="-1"><a class="header-anchor" href="#使用-docker-创建-conda-环境" aria-hidden="true">#</a> 使用 Docker 创建 conda 环境</h3><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>直接从在线的容器列表中找别人配好的容器吧，别浪费自己的时间了！</p></div><p>搜索镜像 ：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> search anaconda
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>拉取镜像 ：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull continuumio/anaconda3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行镜像 ：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span>:8888 continuumio/anaconda3 /bin/bash
<span class="token comment"># 上面把宿主的 8888 绑定到容器的8888 端口，jupyter notebook 一般用 8888 端口</span>
<span class="token function">docker</span> run <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-p</span> <span class="token number">50022</span>:22 continuumio/anaconda3 /bin/bash
<span class="token comment"># ssh 端口默认是 22 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行完会直接进入容器</p>`,9),j={href:"https://blog.csdn.net/qq_42494445/article/details/117443809",target:"_blank",rel:"noopener noreferrer"},G=e("h3",{id:"importerror-libgl-so-1-cannot-open-shared-object-file-no-such-file-or-directory",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#importerror-libgl-so-1-cannot-open-shared-object-file-no-such-file-or-directory","aria-hidden":"true"},"#"),a(" ImportError: libGL.so.1: cannot open shared object file: No such file or directory")],-1),U={href:"http://t.zoukankan.com/devilmaycry812839668-p-13852644.html",target:"_blank",rel:"noopener noreferrer"},w=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> libgl1-mesa-glx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果容器内没有 <code>sudo</code> 指令，可以：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">sudo</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> GIT</h2><h3 id="git-强制更新覆盖本地代码" tabindex="-1"><a class="header-anchor" href="#git-强制更新覆盖本地代码" aria-hidden="true">#</a> Git 强制更新覆盖本地代码</h3><p>当从git上下拉了代码，做了一些测试修改，远程分支有更新时，又不想提交本地代码到远程仓库，只想以最新的代码覆盖本地修改的代码。可以这样做</p><p><strong>提醒，此方法任何本地修改都将会丢失</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> fetch <span class="token parameter variable">--all</span>
 
<span class="token comment"># 然后，你有两个选择：</span>
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> origin/main
 
<span class="token comment"># 或者如果你在其他分支上：</span>
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> origin/<span class="token operator">&lt;</span>branch_name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明： <code>git fetch</code>从远程下载最新的，不会合并或rebase任何代码。</p><p>然后<code>git reset</code>将主分支重置为您刚刚获取的内容。 <code>--hard</code>选项更改工作树中的所有文件以匹配<code>origin/main</code>中的文件</p>`,10);function C(L,I){const s=r("RouterLink"),o=r("ExternalLinkIcon");return c(),l("div",null,[e("p",null,[n(s,{to:"/problems/bash%E8%84%9A%E6%9C%AC%E9%97%AE%E9%A2%98.html"},{default:t(()=>[a("bash脚本问题")]),_:1})]),p,h,e("h3",b,[m,a(),n(s,{to:"/problems/%E8%A7%A3%E5%86%B3qt-qpa-xcb-could-not-connect-to-display%E9%97%AE%E9%A2%98.html"},{default:t(()=>[a("解决qt-qpa-xcb-could-not-connect-to-display问题")]),_:1})]),e("h3",v,[_,a(),n(s,{to:"/problems/Ubuntu-%E8%AE%BE%E7%BD%AE%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98.html"},{default:t(()=>[a("Ubuntu设置虚拟内存")]),_:1})]),e("h3",k,[f,a(),n(s,{to:"/problems/screen%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8.html"},{default:t(()=>[a("screen安装与使用")]),_:1})]),g,e("blockquote",null,[e("p",null,[e("a",E,[a("Linux chmod 命令 | 菜鸟教程 (runoob.com)"),n(o)])]),e("p",null,[e("a",x,[a("Ubuntu下重命名硬盘以及修改权限"),n(o)])])]),e("h3",A,[B,a(),n(s,{to:"/problems/%E9%87%8D%E8%A3%85Ubuntu-%E7%9A%84-Nvidia-%E9%A9%B1%E5%8A%A8.html"},{default:t(()=>[a("重装Ubuntu-的-Nvidia-驱动")]),_:1})]),e("h3",q,[D,a(),n(s,{to:"/problems/Ubuntu%E6%8C%82%E8%BD%BD%E5%A4%9A%E4%B8%AA%E7%A1%AC%E7%9B%98%E5%B9%B6%E8%B5%8B%E4%BA%88%E6%9D%83%E9%99%90.html"},{default:t(()=>[a("Ubuntu挂载多个硬盘并赋予权限")]),_:1})]),y,e("p",null,[n(s,{to:"/problems/%E4%BD%BF%E7%94%A8-MobaXterm-%E8%BF%9E%E6%8E%A5-Docker-%E5%86%85%E7%8E%AF%E5%A2%83.html"},{default:t(()=>[a("使用-MobaXterm-连接-Docker-内环境")]),_:1})]),N,e("blockquote",null,[e("p",null,[e("a",j,[a("docker安装anaconda3_docker anaconda3_felix小康的博客-CSDN博客"),n(o)])])]),G,e("blockquote",null,[e("p",null,[e("a",U,[a("【转载】 ImportError: libGL.so.1: cannot open shared object file: No such file or directory——docker容器内问题报错 - 走看看 (zoukankan.com)"),n(o)])])]),w])}const V=d(u,[["render",C],["__file","index.html.vue"]]);export{V as default};
