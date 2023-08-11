# 一个Epoch前几个batch正常训练，最后一个batch的数据不足报错

## 问题：
在模型训练过程中，一个epoch的前几轮batch数据可以正常训练输出loss，在最后一轮batch数据报错，大概率就是数据量和epoch不匹配，导致最后一个batch的数据不能被整除，所以导致该问题。

## 解决方案1：
手动将epoch的参数调整一下，保证num-data/ batchz-size= epoch中的所有参数均为整数。

## 解决方案2：
删除最后一个batch的数据，不参与训练，具体的操作是在定义dataloader的时候，设置drop_last参数为True。

```python
torch.utils.data.DataLoader(dataset, batch_size=1, shuffle=None, sampler=None, batch_sampler=None, num_workers=0, collate_fn=None, pin_memory=False, drop_last=False, timeout=0, worker_init_fn=None, multiprocessing_context=None, generator=None, *, prefetch_factor=None, persistent_workers=False, pin_memory_device='')
```

::: tip

drop_last:设置为True表示在数据量与batch_size不能被整除的情况下，删除不完整的batch数据；默认设置为False
drop_last (bool, optional) – set to True to drop the last incomplete batch, if the dataset size is not divisible by the batch size. If False and the size of dataset is not divisible by the batch size, then the last batch will be smaller. (default: False)

:::

参考官网定义：[torch.utils.data — PyTorch 2.0 documentation](https://pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader)
————————————————
版权声明：本文为CSDN博主「zy_destiny」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_38308388/article/details/131041955