# 使用 tensorboard 可视化

```python
from tensorboardX import SummaryWriter
from torch.autograd import Variable
# 模拟输入
dummy_input = Variable(torch.rand(5,1,64,64))
dummy_input2 = Variable(torch.rand(5,1,1,3))
# print(dummy_input)
model = pos_est(5,"cpu").to("cpu")
pred = model.forward(dummy_input,dummy_input,dummy_input2)
print(pred.shape)
with SummaryWriter(comment='pos') as w:
    w.add_graph(model, (dummy_input, dummy_input,dummy_input2))
```

在终端输入

```bash
tensorboard --logdir=./runs
```

<img src="https://raw.githubusercontent.com/Overmind7/images/main/img/202210101513287.png" alt="image-20221010151255237" style="zoom:50%;" />





## 如何关闭Tensorboard服务器

获取正在运行的tensorboard进程详情
ps -ef|grep tensorboard

样本输出 *：uzzal_x+ 4585 4413 0 02:46 pts/4 00:00:01 bin/python /bin/tensorboard --logdir=runs/
使用pid**（进程id）杀死进程**

```bash
kill -9 <pid>
```

第一个数字4585是我当前的tensorflow的pid
————————————————
版权声明：本文为CSDN博主「shuaiqidexiaojiejie」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/shuaiqidexiaojiejie/article/details/131000622
