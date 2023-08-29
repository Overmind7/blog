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

