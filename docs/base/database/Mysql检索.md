# 检索数据

## 1. SELECT 语句

Mysql检索：为了使用SELECT检索表数据，必须至少给出两条信息-

- 想选择什么，
- 从什么地方选择。



## 2. 检索单个列

从 product 表中选择3列

```sql
select prode_name from products;
```

- 未排序数据：如果没有明确排序查询结果，返回的数据顺序不定？
- 多条SQL语句以分号间隔

- SQL语句不区分大小写



## 3. 检索多个列

select 关键字后给出多个列名，以逗号分隔

```sql
select prod_id, prod_name, prod_price 
from products;
```



## 4. 检索所有列

使用通配符 `*`，返回表中所有列，顺序一般是列在表定义中出现的顺序

- 使用通配符可以检索出名字未知的列，但是慎用，降低性能

```sql
select * 
from products;
```



## 5. 检索不同的行

`select` 返回所有匹配的行，如何检索不同的值

解决办法是使用`DISTINCT`关键字，顾名思义，此关键字指示MySQL只返回不同的值。

```sql
select DISTINCT vend_id 
from products;
```

::: warning 不能部分使用distinct

DISTINCT关键字应用于所有列而不仅是前置它的列

:::

## 6. 限制结果

`select` 返回所有匹配的行，如何返回第一行或前几行，用 LIMIT

```sql
select prod_name
from products
LIMIT 5;
```

此语句使用SELECT语句检索单个列。`LIMIT 5`指示MySQL返回不多于5行。

得到下一个5行：

```sql
select prod_name
from products
LIMIT 5,5;
```

从行5开始的5行，第一个参数为开始的位置

::: warning 行0

第一行为行0而不是行1，从0开始计数。

:::



## 7. 使用完全限定的表名

上面使用列名引用列，也可以用完全限定的名字引用列

- **完全限定的名字：同时使用表名和列字**

```sql
select products.prod_name
from products;
```

