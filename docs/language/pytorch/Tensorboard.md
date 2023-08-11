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



