# DETR

DETR的思路和传统的目标检测的本质思路有相似之处，但表现方式很不一样。传统的方法比如Anchor-based方法本质上是对预定义的密集anchors进行类别的分类和边框系数的回归。DETR则是将目标检测视为一个集合预测问题（集合和anchors的作用类似）。由于Transformer本质上是一个序列转换的作用，因此，可以将DETR视为一个从图像序列到一个集合序列的转换过程。该集合实际上就是一个可学习的位置编码（文章中也称为object queries或者output positional encoding，代码中叫作query_embed）。

![image-20230722113841803](https://raw.githubusercontent.com/Overmind7/images/main/img/image-20230722113841803.png)



```python
import torch
from torch import nn
from torchvision.models import resnet50

class DETR(nn.Module):

    def __init__(self, num_classes, hidden_dim, nheads,num_encoder_layers, num_decoder_layers):
        super().__init__()
    # We take only convolutional layers from ResNet-50 model
        self.backbone = nn.Sequential(*list(resnet50(pretrained=True).children())[:-2])
        self.conv = nn.Conv2d(2048, hidden_dim, 1)
        self.transformer = nn.Transformer(hidden_dim, nheads, num_encoder_layers, num_decoder_layers)
        self.linear_class = nn.Linear(hidden_dim, num_classes + 1)
        self.linear_bbox = nn.Linear(hidden_dim, 4)
        self.query_pos = nn.Parameter(torch.rand(100, hidden_dim))
        self.row_embed = nn.Parameter(torch.rand(50, hidden_dim // 2))
        self.col_embed = nn.Parameter(torch.rand(50, hidden_dim // 2))

	def forward(self, inputs):
        x = self.backbone(inputs)
        h = self.conv(x)
        H, W = h.shape[-2:]
        pos = torch.cat([
            self.col_embed[:W].unsqueeze(0).repeat(H, 1, 1),
            self.row_embed[:H].unsqueeze(1).repeat(1, W, 1),
        ], dim=-1).flatten(0, 1).unsqueeze(1)
        h = self.transformer(pos + h.flatten(2).permute(2, 0, 1),
							self.query_pos.unsqueeze(1))
        return self.linear_class(h), self.linear_bbox(h).sigmoid()

detr = DETR(num_classes=91, hidden_dim=256, nheads=8, num_encoder_layers=6, num_decoder_layers=6)
detr.eval()
inputs = torch.randn(1, 3, 800, 1200)
logits, bboxes = detr(inputs)
```

> For clarity it uses learnt positional encodings in the encoder instead of fixed, and positional encodings are added to the input only instead of at each transformer layer. Making these changes requires going beyond PyTorch implementation of transformers, which hampers readability. 

> [DETR（整合了Transformer的目标检测框架）](https://blog.csdn.net/qq_53250079/article/details/127457575?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-3-127457575-blog-127982053.235^v38^pc_relevant_sort_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-3-127457575-blog-127982053.235^v38^pc_relevant_sort_base3&utm_relevant_index=4)

