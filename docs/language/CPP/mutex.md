# C++ mutex



## 1. 锁：mutex

锁，是生活中应用十分广泛的一种工具。锁的本质属性是为事物提供“访问保护”，例如：大门上的锁，是为了保护房子免于不速之客的到访；自行车的锁，是为了保护自行车只有owner才可以使用；保险柜上的锁，是为了保护里面的合同和金钱等重要东西……

在c++等高级编程语言中，锁也是用来提供“访问保护”的，不过被保护的东西不再是房子、自行车、金钱，而是内存中的**各种变量。此外，计算机领域对于“锁”有个响亮的名字——mutex（互斥量）**，学过操作系统的同学对这个名字肯定很熟悉。

Mutex，互斥量，就是互斥访问的量。这种东东只在**多线程编程**中起作用，在单线程程序中是没有什么用处的。从c++11开始，c++提供了std::mutex类型，对于多线程的加锁操作提供了很好的支持。下面看一个简单的例子，对于mutex形成一个直观的认识。

#### Demo1——无锁的情况

假定有一个全局变量counter，启动两个线程，每个都对该变量自增10000次，最后输出该变量的值。在第一个demo中，我们不加锁，代码文件保存为：mutex_demo1_no_mutex.cpp

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <chrono>
#include <stdexcept>

int counter = 0;
void increase(int time) {
    for (int i = 0; i < time; i++) {
        // 当前线程休眠1毫秒
        std::this_thread::sleep_for(std::chrono::milliseconds(1));
        counter++;
    }
}

int main(int argc, char** argv) {
    std::thread t1(increase, 10000);
    std::thread t2(increase, 10000);
    t1.join();
    t2.join();
    std::cout << "counter:" << counter << std::endl;
    return 0;
}
```

为了显示多线程竞争导致结果不正确的现象，在每次自增操作的时候都让当前线程休眠1毫秒

如果没有多线程编程的相关经验，我们可能想当然的认为最后的counter为20000，如果这样想的话，那就大错特错了。下面是两次实际运行的结果：

```cpp
[root@2d129aac5cc5 demo]# ./mutex_demo1_no_mutex
counter:19997
[root@2d129aac5cc5 demo]# ./mutex_demo1_no_mutex
counter:19996
```

出现上述情况的原因是：自增操作"counter++"不是[原子操作](https://so.csdn.net/so/search?q=原子操作&spm=1001.2101.3001.7020)，而是由多条汇编指令完成的。多个线程对同一个变量进行读写操作就会出现不可预期的操作。以上面的demo1作为例子：假定counter当前值为10，线程1读取到了10，线程2也读取到了10，分别执行自增操作，线程1和线程2分别将自增的结果写回counter，不管写入的顺序如何，counter都会是11，但是线程1和线程2分别执行了一次自增操作，我们期望的结果是12！！！！！

轮到mutex上场。

#### Demo2——加锁的情况

定义一个std::mutex对象用于保护counter变量。对于任意一个线程，**如果想访问counter，首先要进行"加锁"操作，如果加锁成功，则进行counter的读写，读写操作完成后释放锁（重要!!!）； 如果“加锁”不成功，则线程阻塞，直到加锁成功**。

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <chrono>
#include <stdexcept>

int counter = 0;
std::mutex mtx; // 保护counter

void increase(int time) {
    for (int i = 0; i < time; i++) {
        mtx.lock();
        // 当前线程休眠1毫秒
        std::this_thread::sleep_for(std::chrono::milliseconds(1));
        counter++;
        mtx.unlock();
    }
}

int main(int argc, char** argv) {
    std::thread t1(increase, 10000);
    std::thread t2(increase, 10000);
    t1.join();
    t2.join();
    std::cout << "counter:" << counter << std::endl;
    return 0;
}
```

上述代码保存文件为：mutex_demo2_with_mutex.cpp。先来看几次运行结果：

```cpp
[root@2d129aac5cc5 demo]# ./mutex_demo2_with_mutex
counter:20000
[root@2d129aac5cc5 demo]# ./mutex_demo2_with_mutex
counter:20000
[root@2d129aac5cc5 demo]# ./mutex_demo2_with_mutex
counter:20000
```

这次运行结果和我们预想的一致，原因就是“利用锁来保护共享变量”，在这里共享变量就是counter（多个线程都能对其进行访问，所以就是共享变量啦）。

简单总结一些std::mutex：

- 1. 对于std::mutex对象，任意时刻最多允许一个线程对其进行上锁
- 1. mtx.lock()：调用该函数的线程尝试加锁。如果上锁不成功，即：其它线程已经上锁且未释放，则当前线程block。如果上锁成功，则执行后面的操作，操作完成后要调用mtx.unlock()释放锁，否则会导致死锁的产生
- 1. mtx.unlock()：释放锁
- 1. std::mutex还有一个操作：mtx.try_lock()，字面意思就是：“尝试上锁”，与mtx.lock()的不同点在于：如果上锁不成功，当前线程不阻塞。

## 2. lock_guard

虽然std::mutex可以对多线程编程中的共享变量提供保护，但是直接使用std::mutex的情况并不多。因为仅**使用std::mutex有时候会发生死锁**。回到上边的例子，考虑这样一个情况：假设线程1上锁成功，线程2上锁等待。但是线程1上锁成功后，抛出异常并退出，没有来得及释放锁，导致线程2“永久的等待下去”（线程2：我的心在等待永远在等待……），此时就发生了死锁。给一个发生死锁的 ：

Demo3——死锁的情况（仅仅为了演示，不要这么写代码哦）

为了捕捉抛出的异常，我们重新组织一下代码，代码保存为:mutex_demo3_dead_lock.cpp。

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <chrono>
#include <stdexcept>

int counter = 0;
std::mutex mtx; // 保护counter

void increase_proxy(int time, int id) {
    for (int i = 0; i < time; i++) {
        mtx.lock();
        // 线程1上锁成功后，抛出异常：未释放锁
        if (id == 1) {
            throw std::runtime_error("throw excption....");
        }
        // 当前线程休眠1毫秒
        std::this_thread::sleep_for(std::chrono::milliseconds(1));
        counter++;
        mtx.unlock();
    }
}

void increase(int time, int id) {
    try {
        increase_proxy(time, id);
    }
    catch (const std::exception& e){
        std::cout << "id:" << id << ", " << e.what() << std::endl;
    }
}

int main(int argc, char** argv) {
    std::thread t1(increase, 10000, 1);
    std::thread t2(increase, 10000, 2);
    t1.join();
    t2.join();
    std::cout << "counter:" << counter << std::endl;
    return 0;
}
```

执行后，结果如下图所示：

```cpp
[root@2d129aac5cc5 demo]# ./mutex_demo3_dead_lock
id:1, throw excption....
```

程序并没有退出，而是永远的“卡”在那里了，也就是发生了死锁。

那么这种情况该怎么避免呢？ 这个时候就需要std::lock_guard登场了。std::lock_guard只有构造函数和析构函数。简单的来说：**当调用构造函数时，会自动调用传入的对象的lock()函数，而当调用析构函数时，自动调用unlock()函数（这就是所谓的RAII，读者可自行搜索）**。我们修改一下demo3。

#### Demo4——避免死锁，lock_guard

demo4保存为：mutex_demo4_lock_guard.cpp

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <chrono>
#include <stdexcept>

int counter = 0;
std::mutex mtx; // 保护counter

void increase_proxy(int time, int id) {
    for (int i = 0; i < time; i++) {
        // std::lock_guard对象构造时，自动调用mtx.lock()进行上锁
        // std::lock_guard对象析构时，自动调用mtx.unlock()释放锁
        std::lock_guard<std::mutex> lk(mtx);
        // 线程1上锁成功后，抛出异常：未释放锁
        if (id == 1) {
            throw std::runtime_error("throw excption....");
        }
        // 当前线程休眠1毫秒
        std::this_thread::sleep_for(std::chrono::milliseconds(1));
        counter++;
    }
}

void increase(int time, int id) {
    try {
        increase_proxy(time, id);
    }
    catch (const std::exception& e){
        std::cout << "id:" << id << ", " << e.what() << std::endl;
    }
}

int main(int argc, char** argv) {
    std::thread t1(increase, 10000, 1);
    std::thread t2(increase, 10000, 2);
    t1.join();
    t2.join();
    std::cout << "counter:" << counter << std::endl;
    return 0;
}
```

执行上述代码，结果为：

```cpp
[root@2d129aac5cc5 demo]# ./mutex_demo4_lock_guard
id:1, throw excption....
counter:10000
```

结果符合预期。所以，**推荐使用std::mutex和std::lock_guard搭配使用，避免死锁的发生**。

## 3. std::lock_guard的第二个构造函数

实际上，std::lock_guard有两个构造函数，具体的

```cpp
explicit lock_guard( mutex_type& m );                   (1)      (since C++11)
lock_guard( mutex_type& m, std::adopt_lock_t t ); 	(2)      (since C++11)
lock_guard( const lock_guard& ) = delete;               (3)      (since C++11)
```

在demo4中我们使用了第1个构造函数，第3个为拷贝构造函数，定义为删除函数。这里我们来重点说一下第2个构造函数。

第2个构造函数有两个参数，其中第二个参数类型为：std::adopt_lock_t。这个构造函数假定：当前线程已经上锁成功，所以不再调用lock()函数。
参考[两个参数](https://en.cppreference.com/w/cpp/thread/lock_tag_t)



> [c++之多线程中“锁”（mutex）的用法_one-莫烦的博客-CSDN博客](https://blog.csdn.net/weixin_42127358/article/details/123507748)