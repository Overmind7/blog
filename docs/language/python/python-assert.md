# 断言 assert

Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。

断言可以在条件不满足程序运行的情况下直接返回错误，而不必等待程序运行后出现崩溃的情况，例如我们的代码只能在 Linux 系统下运行，可以先判断当前系统是否符合条件。



以下实例判断当前系统是否为 Linux，如果不满足条件则直接触发异常，不必执行接下来的代码：

```python
import sys
assert ('linux' in sys.platform), "该代码只能在 Linux 下执行"
```





[Python3 assert（断言） | 菜鸟教程 (runoob.com)](https://www.runoob.com/python3/python3-assert.html)
