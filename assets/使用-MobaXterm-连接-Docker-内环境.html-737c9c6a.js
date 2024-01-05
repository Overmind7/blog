import{_ as n,r as e,o as t,c as i,a as s,d as l,b as c,e as r}from"./app-04b0d2b0.js";const o={},d=r(`<h1 id="使用-mobaxterm-连接-docker-内环境" tabindex="-1"><a class="header-anchor" href="#使用-mobaxterm-连接-docker-内环境" aria-hidden="true">#</a> 使用 MobaXterm 连接 Docker 内环境</h1><h2 id="创建容器" tabindex="-1"><a class="header-anchor" href="#创建容器" aria-hidden="true">#</a> 创建容器</h2><p>SSH 默认端口是22，将宿主机器的空闲端口映射到容器端口 22，比如 50022</p><p>此时在外部访问宿主机 50022 端口就相当于在访问容器的 22 端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull ubuntu:latest
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token parameter variable">-p</span> <span class="token number">50022</span>:22 <span class="token parameter variable">--name</span> ubuntu  ubuntu <span class="token function">bash</span>

<span class="token comment"># 在容器中安装某些大型软件，如matlab时可能需要让--privileged=true, </span>
<span class="token comment"># -p后跟端口映射，--name后跟你喜欢的容器名，-v后跟地址映射，根据你的需求来指定文件夹</span>
<span class="token comment"># -v /d/docker/ubuntu_fsl_disp:/shared_data</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装常用软件" tabindex="-1"><a class="header-anchor" href="#安装常用软件" aria-hidden="true">#</a> 安装常用软件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">vim</span>
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">git</span>
<span class="token function">apt-get</span> <span class="token function">install</span> net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-ssh-链接" tabindex="-1"><a class="header-anchor" href="#配置-ssh-链接" aria-hidden="true">#</a> 配置 SSH 链接</h2><p>容器中安装 SSH Server</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt-get</span> <span class="token function">install</span> openssh-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改sshd_config，开放22端口，并允许密码登录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;Port 22&quot;</span><span class="token operator">&gt;&gt;</span>/etc/ssh/sshd_config
<span class="token builtin class-name">echo</span> <span class="token string">&quot;PermitRootLogin yes&quot;</span><span class="token operator">&gt;&gt;</span>/etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动ssh服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">service</span> <span class="token function">ssh</span> start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看ssh状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">service</span> <span class="token function">ssh</span> status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>先设置容器root用户密码，没有密码外部无法登陆。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">passwd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看22端口是否处于监听状态。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-ap</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">ssh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>若不是，<code>service ssh restart</code>重启一下SSH</p><ul><li>设置 MobaXterm，Host 地址是 WSL 的 IPV4 地址，需要上面设置的账号和密码</li></ul><img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202210141732073.png" style="zoom:80%;">`,23),p={href:"https://blog.csdn.net/wooyang2018/article/details/113090465",target:"_blank",rel:"noopener noreferrer"};function u(m,v){const a=e("ExternalLinkIcon");return t(),i("div",null,[d,s("blockquote",null,[s("p",null,[s("a",p,[l("Docker容器使用MobaXterm连接_wooyang2018的博客-CSDN博客_docker mobaxterm"),c(a)])])])])}const b=n(o,[["render",u],["__file","使用-MobaXterm-连接-Docker-内环境.html.vue"]]);export{b as default};
