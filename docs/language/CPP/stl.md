---
sidebar: auto
---

[[TOC]]

# C++ STL 部分用法



## String



push_back 函数

上述代码输出的结果为："Hello!"

请注意，push_back函数仅适用于向字符串添加一个字符。如果要添加一个字符串，可以使用字符串的加号运算符（+）或者append函数



`substring` 函数

```cpp
substr(int index,int len)
```

表示从下标为index的地方开始算，截取len长度的字符。

如果只有一个参数则表示截取从该位置到末尾。



`split` 函数

标准库里没有，要自己实现。

例如，分割以空格隔开的字符串，可能在前后和中间含有多个空格。

```cpp
vector<string> splitString(string sen){
    vector<string> vec;
    while (sen.find(" ") != sen.npos) {
        if(sen.find(" ") == 0 ){
            sen = sen.substr(sen.find(" ") + 1, sen.length());
            continue;
        }else{
            vec.push_back(sen.substr(0, sen.find(" ")));
            sen = sen.substr(sen.find(" ") + 1, sen.length());
        }

    } 
    if(sen == "")return vec;
    else {
        vec.push_back(sen);		   
        return vec;
    }
}
```



`find` 函数

使用`string`类的`find`成员函数可以找到一个字符串在另一个字符串中的位置。`find`函数返回目标字符串在源字符串中的第一个匹配位置的索引，如果找不到则返回`string::npos`

```cpp
size_t pos = sourceString.find(targetString);
```



### 字符串类型转换函数

`stoi`： `string`型变量转换为`int`型变量
`stol`： `string`型变量转换为`long`型变量
`stoul`：`string`型变量转换为`unsigned long`型变量
`stoll`： `string`型变量转换为`long long`型变量(常用)
`stoull`：`string`型变量转换为`unsigned long long`型变量
`stof`： `string`型变量转换为`float`型变量
`stod`： `string`型变量转换为`double`型变量(常用)
`stold`：`string`型变量转换为`long double`型变量

::: tip 技巧
在日常使用中， 最常用的是stoll和stod这两个函数， stoll可以兼容stoi，stol； 而stod可以兼容stof。

:::

例：

```cpp
#include<iostream>
#include<string> 
using namespace std;
int main() {
	string s = "11.11";
	double a = stod(s);
	cout << a;
return 0; }
```



> [【最贴心】C++字符串转换(stoi；stol；stoul；stoll；stoull；stof；stod；stold)_来老铁干了这碗代码的博客-CSDN博客](https://zhanglong.blog.csdn.net/article/details/110290292?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-110290292-blog-131157099.235^v38^pc_relevant_sort_base3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-110290292-blog-131157099.235^v38^pc_relevant_sort_base3&utm_relevant_index=1)



## Vector



## Map

> [unordered_map和map的区别_unordered_map map_美丽心灵的永恒阳光的博客-CSDN博客](https://blog.csdn.net/weixin_39690454/article/details/108354997)





::: warning

使用count，返回的是被查找元素的个数。如果有，返回1；否则，返回0。

- 注意，map中不存在相同元素，所以返回值只能是1或0。

使用find，返回的是被查找元素的位置，没有则返回map.end()。

:::



## unordered_map

 在C++中，存在一种简单申请哈希表的函数：`unordered_map<element type> name {{},{}}`



一.对该函数的简要介绍：

1、`unordered_map `是存储`<key, value>`键值对的关联式容器，其允许通过 `key `快速的索引到与其对应的`value（hashmap<key> == value）`
2、`unordered_map `中，键值通常用于唯一的标识元素，而映射值是一个对象，其内容与此键关联，键和映射的类型可以不同
3、在内部，`unordered_map `没有对`<key, value>`进行排序，`unordered_map `将相同哈希值的键值对放在对应的桶中
4、`unordered_map `容器通过key访问单个元素比map快，但它遍历元素子集的范围和迭代方面效率较低
5、`unordered_map `实现了直接访问操作符（`operator[]`）允许通过 `key `作为参数访问 `value`
6、`unordered_map `的迭代器至少是前向迭代器

二. unordered_map 迭代器

| 功能               | 成员方法                                                     |
| ------------------ | ------------------------------------------------------------ |
| `begin()`          | 返回指向容器中第一个键值对的正向迭代器。                     |
| `end()`            | 返回指向容器中最后一个键值对之后位置的正向迭代器。           |
| `cbegin()`         | 和 begin() 功能相同，只不过在其基础上增加了 const 属性，即该方法返回的迭代器不能用于修改容器内存储的键值对。 |
| `cend()`           | 和 end() 功能相同，只不过在其基础上，增加了 const 属性，即该方法返回的迭代器不能用于修改容器内存储的键值对。 |
| `find(key)`        | 查找以 key 为键的键值对，如果找到，则返回一个指向该键值对的正向迭代器；反之，则返回一个指向容器中最后一个键值对之后位置的迭代器（如果 end() 方法返回的迭代器）。 |
| `equal_range(key)` | 返回一个 pair 对象，其包含 2 个迭代器，用于表明当前容器中键为 key 的键值对所在的范围。 |





```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;
int main()
{
    //创建 umap 容器
    unordered_map<string, string> umap{
        {"Python教程","http://python/"},
        {"Java教程","http://java/"},
        {"Linux教程","http://linux/"} };
    cout << "umap 存储的键值对包括：" << endl;
    //遍历输出 umap 容器中所有的键值对
    for (auto iter = umap.begin(); iter != umap.end(); ++iter) {
        cout << "<" << iter->first << ", " << iter->second << ">" << endl;
    }
    //获取指向指定键值对的前向迭代器
    unordered_map<string, string>::iterator iter = umap.find("Java教程");
    cout <<"umap.find(\"Java教程\") = " << "<" << iter->first << ", " << iter->second << ">" << endl;
    return 0;
}
```

```
umap 存储的键值对包括：
<Python教程, http://python/>
<Linux教程, http://linux/>
<Java教程, http://java/>
umap.find("Java教程") = <Java教程, http://java/>
```



[^1]: [C++中申请哈希表的函数：unordered_map讲解_FightingCSH的博客-CSDN博客_unordered_map 哈希函数](https://blog.csdn.net/FightingCSH/article/details/121385477)



## unordered_set 

unordered_set 容器，可直译为“无序 set 容器”。即 unordered_set 容器和 set 容器很像，唯一的区别就在于 set 容器会自行对存储的数据进行排序，而 unordered_set 容器不会。（去重容器）

几个特性

> 1. 不再以键值对的形式存储数据，而是直接存储数据的值 ；
> 2. 容器内部存储的各个元素的值都互不相等，且不能被修改；
> 3. 不会对内部存储的数据进行排序



C++ STL 中的 unordered_set 容器类模板中未提供 at() 成员函数，也未对 `[]` 运算符进行重载。因此，要想访问 unordered_set 容器中存储的元素，只能借助 unordered_set 容器的迭代器。



### 头文件

```cpp
#include <unordered_set>
```



### 初始化

```cpp
unordered_set<int> set1; //创建空set
unordered_set<int> set2(set1);    //拷贝构造
unordered_set<int> set3(set1.begin(), set1.end());    //迭代器构造
unordered_set<int> set4(arr,arr+5);    //数组构造
unordered_set<int> set5(move(set2));    //移动构造
unordered_set<int> set6 {1,2,10,10};//使用initializer_list初始化
```



#### 创建空的set

```cpp
unordered_set<int> set1;
```

#### 拷贝构造

```cpp
unordered_set<int> set2(set1);
```

####　使用迭代器构造

```cpp
unordered_set<int> set3(set1.begin(), set1.end());
```

#### 使用数组作为初值构造

```cpp
unordered_set<int> set4(arr,arr+5);
```

#### 移动构造

```cpp
unordered_set<int> set4(arr,arr+5);
```

#### 使用待处置的列表构造

```cpp
unordered_set<int> set6 {1,2,10,10};
```



### unordered_set 常用函数

#### empty()

判断是否为空

```cpp
set1.empty();	//若容器为空，则返回 true；否则 false
```

#### find()

查找

::: warning

**失败返回end()**

:::

```cpp
set1.find(2);	//查找2，找到返回迭代器，失败返回end()
```

#### count()

出现次数

```cpp
set1.count(2);	//返回指2出现的次数，0或1
```

#### insert()

插入元素

```cpp
//插入元素，返回pair<unordered_set<int>::iterator, bool>
set1.insert(3);
//使用initializer_list插入元素
set1.insert({1,2,3});
//指定插入位置，如果位置正确会减少插入时间，返回指向插入元素的迭代器
set1.insert(set1.end(), 4);
//使用范围迭代器插入
set1.insert(set2.begin(), set2.end());
```

`insert()` 函数返回值

- insert()只传入单个参数（待插入元素）

    > 1. 会返回一个 pair 对象
    > 2. 这个 pair 对象包含一个迭代器，以及一个附加的布尔值用来说明插入是否成功
    > 3. 如果元素被插入，返回的迭代器会指向新元素
    > 4. 如果没有被插入，迭代器指向阻止插入的元素

    ```cpp
    auto pr = words.insert("ninety"); // Returns a pair - an iterator & a bool value
    ```

- insert()传入两个参数（迭代器+待插入元素）

    > 1. 可以用一个迭代器作为insert()的第一个参数，它指定了元素被插入的位置
    > 2. 在这种情况下，只会返回一个迭代器

    ```cpp
    auto iter = words.insert (pr.first, "nine"); // 1st arg is a hint. Returns an iterator
    ```

- insert()传入初始化列表

    > 1. 插入初始化表中的元素
    > 2. 在这种情况下，什么都没有返回

    ```cpp
    words.insert({"ten", "seven", "six"});  // Inserting an initializer list
    ```



> 由于unordered_set底层实现为hash，故set内不会出现重复元素。根据这个性质，结合insert函数，可以==**验证插入元素是否重复**==。





#### emplace()

插入元素（转移构造）

```cpp
//使用转移构造函数添加新元素3，比insert效率高
set1.emplace(3);
```



#### erase()

删除元素

```cpp
//删除操作，成功返回1，失败返回0
set1.erase(1);
//删除操作，成功返回下一个pair的迭代器
set1.erase(set1.find(1));
//删除set1的所有元素，返回指向end的迭代器
set1.erase(set1.begin(), set1.end());
```

#### bucket_count()

篮子数目

```cpp
//返回容器中的篮子总数
set1.bucket_count();
```



## Stack 栈

栈提供push 和 pop 等等接口，所有元素必须符合先进后出规则，所以栈不提供走访功能，也不提供迭代器(iterator)。 不像是set 或者map 提供迭代器iterator来遍历所有元素。

**栈是以底层容器完成其所有的工作，对外提供统一的接口，底层容器是可插拔的（也就是说我们可以控制使用哪种容器来实现栈的功能）。**

所以STL中栈往往不被归类为容器，而被归类为container adapter（容器适配器）。

那么问题来了，STL 中栈是用什么容器实现的？

从下图中可以看出，栈的内部结构，栈的底层实现可以是vector，deque，list 都是可以的， 主要就是数组和链表的底层实现。

**我们常用的SGI STL，如果没有指定底层实现的话，默认是以deque为缺省情况下栈的底层结构。**

deque是一个双向队列，只要封住一段，只开通另一端就可以实现栈的逻辑了。

**SGI STL中 队列底层实现缺省情况下一样使用deque实现的。**

我们也可以指定vector为栈的底层实现，初始化语句如下：

```cpp
std::stack<int, std::vector<int> > third;  // 使用vector为底层容器的栈
```

### 定义

```cpp
stack<int> s; //表示定义一个类型为int名字为s的栈
```

### 压入

插入的函数是push，例如插入3：

```cpp
s.push(3)
```

### 弹出

弹出的函数是pop，且弹出的是顶部元素，示例：

```cpp
s.pop();
```

无返回值，如果需要栈顶元素，需要在 `pop` 之前 `top`

### 栈顶元素

顶部元素是top，例如输出栈顶元素：

```cpp
cout<<s.top();
```

和 `pop` 一样，栈不能为空，否则报错。

### 是否为空

函数为`empty`，为空则返回1，反之返回0，示例：

```cpp
if(s.empty()) cout<<"栈为空";
else cout<<"栈不为空";
```



## 队列

### queue

|      | 函数原型：push、pop、back、front | 解释             |
| ---- | -------------------------------- | ---------------- |
| 1    | `push(elem)`                     | 向队尾添加元素   |
| 2    | `emplace()`                      | 向队尾添加元素   |
| 3    | `pop()`                          | 移除当前队首元素 |
| 4    | `back()`                         | 返回队尾元素     |
| 5    | `front()`                        | 返回队首元素     |


::: warning 注意

- `push`与`emplace`区别详见 :[栈(stack)的使用及push与emplace异同点](https://blog.csdn.net/AAADiao/article/details/130850283?spm=1001.2014.3001.5501)
- `std::queue` 不提供迭代器访问元素，只能通过 front() 和 back() 来访问队列的第一个和最后一个元素。
- `std::queue` 不支持随机访问，不能通过索引访问队列中的元素。

- `std::queue` 的底层容器可以在创建时指定，例如使用 `std::list` 作为底层容器：`std::queue<int, std::list<int>> myQueue;`
    - 默认 `dequeue`

:::

#### queue 其他操作

|      | 函数原型：empty、size、swap | 解释                            |
| ---- | --------------------------- | ------------------------------- |
| 1    | `empty()`                   | 判断队列是否为空                |
| 2    | `size()`                    | 返回队列的大小                  |
| 3    | `swap(queue<T> & que)`      | 将当前队列中元素和que中元素交换 |

**注意：** `swap()`交换的两个队列中包含元素的类型必须相同。

