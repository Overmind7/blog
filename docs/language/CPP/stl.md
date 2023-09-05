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



`to_string` 函数

函数的主要作用是将数字转换为字符串。

> [C++ to_string函数详解_笔记大全](https://www.python100.com/html/93357.html)







## Vector

[C++vector容器无敌详细_c++创建vector_拒绝摆烂的博客-CSDN博客](https://blog.csdn.net/qq_45577081/article/details/115752585)

[C++：vector小指南（附带一些新手错误） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/336492399?utm_id=0)

::: warning

对于二维vector变量，vv.size()的值vector的行数，vv[i].size()的值是vector的列数

:::



使用vector容器的头文件是`#include< vector >`

### 概念

vector容器常被成为向量容器(据说是线性代数中的一维数组就是叫做向量)

vector是一个动态大小数组的顺序容器,可以认为vector是存放任意类型的动态数组

vector的特性:

顺序序列：vector容器是按照严格的线性序列排序

动态数组：vector容器支持对序列中元素快速访问元素通过下标的方式,也可在首尾快速的删除或增加元素，当vector的元素数量超过他的容量时,容量会增倍(vetcor.capacity());

### vector构造函数

`vetcor()`：创建一个空的vector容器。

`vector(int n)`：创建一个size()为n的vector容器,元素值为0。

`vector(int n,const T& t)`：创建一个size()为n的vector容器且每个元素值为t。

`vector(const vector&)`：复制另一个vector容器内容到该容器中

`vector(begin,end)`：复制一个数组区间为 [begin,end)(注意是左开右闭?) 的值到vector中

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main(){
    int s[3]={1,2,3};
    vector<int> temp(3);
    //temp容器元素为0,0,0
    vector<int> p(5,3);
    //p容器元素为3,3,3,3,3
    vector<int> q(p);
    //q容器元素为3,3,3,3,3
    vector<int> tmp(s,s+3);
    //tmp容器元素为1,2,3
    return 0;
}

```



### vector增加函数

`void push_back(const T& t)`：往vector容器最后一个元素位置后添加元素t。

`iterator insert(iterator iter,const T& t)`：往iter迭代器指向元素前添加元素t。

`iterator insert(iterator iter,int n,const T& t)`：往iter迭代器指向元素前添加n个值为t的元素。

`iterator insert(iterator iter,iterator first,iterator last)`：往iter迭代器指向元素前插入另一个相同类型vector容器的 [first,last) 间的元素。

`iterator emplace (const_iterator position, Args&&… args)`;往position迭代器指定位置前插入一个元素，并返回当前位置。(c++11新增函数)

`void emplace_back (Args&&… args)`;往vector容器后插入一个元素，效率高于push_back()函数。

::: tip 注

vector容器中没有`push_front()`函数

:::

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main(){
    vector<int> s(2,4);
    vector<int> p;
    p.push_back(1);
    //p容器内元素为1
    p.insert(p.begin(),2);
    //p容器内元素为2,1;
    p.insert(p.end(),2,3);
    //因为end()是指最后一个元素再下一个位置 p容器内元素为2,1,3,3;
    p.insert(p.begin(),s.begin(),s.end());
    //p容器值为4,4,2,1,3,3
    return 0;
}
```

### vector删除函数

void pop_back()：删除容器最后一个元素。

iterator erase(iterator iter)：删除iter位置的元素。

iterator erase(iterator first,iterator last)：删除容器内[first,last)的元素。

iterator clear()：清除容器内所有元素。



::: tip 注

很多同学在使用迭代器遍历vector删除指定元素时,会出现野指针问题,

原因在于erase(iterator iter)删除一个元素时会返回下一个元素的迭代器，而再++iter,则会出现指针指向错误,

删除最后一个元素是返回end()，此时在++会出现段错误。

:::

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main(){
    vector<int> s(2,4);
    s.push_back(1);
    s.push_back(3);
    s.push_back(2);
    vector<int>::iterator iter=s.begin();
    //遍历+删除指定元素正确用法
    while(iter!=s.end()){
          if(*iter==5)
          s.erase(iter);
          else iter++;
    }
    s.pop_back();
    //s容器内元素为4,4,1,3
    s.erase(s.begin());
    //s容器内元素为4,1,3
    s.erase(s.begin(),s.end());
    //s容器为空
    s.push_back(1);
    s.clear();
    //s容器为空
    return 0;
}
```



### vector遍历函数

`at(int pos)` ：返回pos位置处元素的引用，如果超出范围会返回异常错误,所以相对于[]更安全。

`front()`：返回首元素的引用

`back()`：返回尾元素的应用

`iterator begin()`：返回向量vector容器的头指针,指向第一个元素

`iterator end()`：返回向量vector容器的尾指针,指向最后一个元素的下一个位置

`reverse_iterator rbegin()`：反向迭代器，指向最后一个元素

`reverse_iterator rend()`：反向迭代器，指向第一个元素之前的位置

::: tip 注

反向迭代器与正向迭代器声明时不同需要改为reverse_iterator

:::

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main(){
    vector<int> s(2,4);
    s.push_back(1);
    s.push_back(3);
    s.push_back(2);
    vector<int>::iterator iter1=s.begin();
    while(iter1!=s.end()){
        cout << *iter1;
        iter1++;
    }
    //输出为4,4,1,3,2
    vector<int>::reverse_iterator iter2=s.rbegin();
    while(iter2!=s.rend()){
        cout << *iter2;
        iter2++;
    }
    //输出为2,3,1,4,4
    return 0;
}
```



### vector关于元素数量函数

`void reserve (size_type n)`：申请n个元素个数的内存空间，一次性分配效率较高.

`int size()`：返回vector容器元素个数。

`int capacity()`：返回vector容器容量。

`resize()`：设置vector容器大小。

`bool empty()`：判断vector容器是否为空,为空返回`true`,否则返回`false`。

::: tip 注

当vector内元素超过开始设定的size()大小,vector的容量会翻倍增加(1->2,2->4…)
:::

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main(){
    vector<int> s;
    s.resize(5);
    cout <<s.size();
    //输出size()为5
    for(int i=0;i<s.size();i++)
        s[i]=i;
    cout << s.capacity();
    //s的容量为5
    s.push_back(1);
    cout << s.capacity();
    //s的容量为10
    cout << s.empty();
    //输出为0,flase
    s.clear();
    cout << s.empty();
    //输出为1,true
    return 0;
}

```

### vector其他函数

void swap(vector&)：交换两个同类型向量的数据 ??

void assign(int n,const T& x)：设置向量中前n个元素的值为x

void assign(const_iterator first,const_iterator last)：向量中[first,last)中元素设置成当前向量元素

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main(){
    vector<int> s(5,2);
    vector<int> p(4,3);
    s.swap(p);
    //s容器内元素为3,3,3,3 p容器内元素为2,2,2,2,2
    s.assign(2,1);
    //s容器内元素为1,1,3,3
    p.assign(s.begin(),s.end());
    //p容器内元素为1,1,3,3
    return 0;
}
```



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



### deque

> [C++中的deque 用法_c++ dequeue__刘小雨的博客-CSDN博客](https://blog.csdn.net/qq_39486027/article/details/116244660)

deque（双端队列）是由一段一段的定量连续空间构成，可以向两端发展，因此不论在尾部或头部安插元素都十分迅速。 在中间部分安插元素则比较费时，因为必须移动其它元素。

#### 初始化

```cpp
#include<deque>  // 需使用 using std::deque;
```

定义的实现代码

```cpp
deque<int> a; // 定义一个int类型的双端队列a
deque<int> a(10); // 定义一个int类型的双端队列a，并设置初始大小为10
deque<int> a(10, 1); // 定义一个int类型的双端队列a，并设置初始大小为10且初始值都为1
deque<int> b(a); // 定义并用双端队列a初始化双端队列b
deque<int> b(a.begin(), a.begin()+3); // 将双端队列a中从第0个到第2个(共3个)作为双
// 端队列b的初始值

// 除此之外，还可以直接使用数组来初始化向量：
int n[] = { 1, 2, 3, 4, 5 };
// 将数组n的前5个元素作为双端队列a的初值
// 说明：当然不包括arr[4]元素，末尾指针都是指结束元素的下一个元素，
// 这个主要是为了和deque.end()指针统一。
deque<int> a(n, n + 5); 
deque<int> a(&n[1], &n[4]); // 将n[1]、n[2]、n[3]作为双端队列a的初值

```



#### 操作函数
容量函数
容器大小：deq.size();

容器最大容量：deq.max_size();

更改容器大小：deq.resize();

容器判空：deq.empty();

减少容器大小到满足元素所占存储空间的大小：deq.shrink_to_fit();

添加函数

头部添加元素：`deq.push_front(const T& x);`

末尾添加元素：`deq.push_back(const T& x);`

任意位置插入一个元素：`deq.insert(iterator it, const T& x);`

任意位置插入 n 个相同元素：`deq.insert(iterator it, int n, const T& x);`

插入另一个向量的 [forst,last] 间的数据：deq.insert(iterator it, iterator first, iterator last);

删除函数

头部删除元素：`deq.pop_front();`

末尾删除元素：`deq.pop_back();`

任意位置删除一个元素：deq.erase(iterator it);

删除 `[first,last]` 之间的元素：`deq.erase(iterator first, iterator last);`

清空所有元素：`deq.clear();`

访问函数

下标访问：`deq[1];` // 并不会检查是否越界

at 方法访问：`deq.at(1); `// 以上两者的区别就是 at 会检查是否越界，是则抛出 out of range 异常

访问第一个元素：`deq.front();`

访问最后一个元素：`deq.back();`

其他函数

多个元素赋值：deq.assign(int nSize, const T& x); // 类似于初始化时用数组进行赋值

交换两个同类型容器的元素：swap(deque&);

#### 迭代器算法

迭代器

开始迭代器指针：deq.begin();

末尾迭代器指针：deq.end(); // 指向最后一个元素的下一个位置

指向常量的开始迭代器指针：deq.cbegin(); // 意思就是不能通过这个指针来修改所指的内容，但还是可以通过其他方式修改的，而且指针也是可以移动的。

指向常量的末尾迭代器指针：deq.cend();

反向迭代器指针，指向最后一个元素：deq.rbegin();

反向迭代器指针，指向第一个元素的前一个元素：deq.rend();

#### 算法

遍历元素

```cpp
deque<int>::iterator it;
for (it = deq.begin(); it != deq.end(); it++)
    cout << *it << endl;
// 或者
for (int i = 0; i < deq.size(); i++) {
    cout << deq.at(i) << endl;
}
```


元素翻转

```cpp
#include <algorithm>
reverse(deq.begin(), deq.end());
```


元素排序

```cpp
#include <algorithm>
sort(deq.begin(), deq.end()); // 采用的是从小到大的排序

// 如果想从大到小排序，可以采用先排序后反转的方式，也可以采用下面方法:
// 自定义从大到小的比较器，用来改变排序方式
bool Comp(const int& a, const int& b) {
    return a > b;
}

sort(deq.begin(), deq.end(), Comp);
```


#### 总结
可以看到，`deque`与 `vector`的用法基本一致，除了以下几处不同：

- `deque` 没有 `capacity()` 函数，而 `vector`有；
- `deque` 有 `push_front()` 和 `pop_front()` 函数，而 `vector`没有；
- `deque` 没有 `data()` 函数，而 `vector`有。

::: warning 栈里面的元素在内存中是连续分布的么?

- 栈是容器适配器，底层容器使用不同的容器，导致栈内数据在内存中不是连续分布。
- 缺省情况下，默认底层容器是deque，那么deque的在内存中的数据分布是什么样的呢？ 答案是：不连续的
    - 我们用deque作为单调队列的底层数据结构，C++中deque是stack和queue默认的底层实现容器，deque是可以两边扩展的，而且deque里元素并不是严格的连续分布的。

:::





### priority_queue

> [优先队列(priority_queue)总结_行止AC的博客-CSDN博客](https://blog.csdn.net/xingzi201/article/details/119884227?ops_request_misc=%7B%22request%5Fid%22%3A%22169356240716800188595394%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=169356240716800188595394&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-119884227-null-null.142^v93^control&utm_term=priority_queue&spm=1018.2226.3001.4187)
