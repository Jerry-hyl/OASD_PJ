# PJ说明文档

## 页面截图

### 主页

![homepage1](D:\hyl\web\project要求\image\homepage1.jpg)

![homepage2](D:\hyl\web\project要求\image\homepage2.jpg)

![hompage3](D:\hyl\web\project要求\image\homepage3.jpg)

### 登录界面

![login](D:\hyl\web\project要求\image\login.jpg)

### 注册界面

![register](D:\hyl\web\project要求\image\register.jpg)

### 搜索界面

![search1](D:\hyl\web\project要求\image\search1.jpg)

![search2](D:\hyl\web\project要求\image\search2.jpg)

### 个人中心

![center](D:\hyl\web\project要求\image\center.jpg)

![center1](D:\hyl\web\project要求\image\center1.jpg)

![center3](D:\hyl\web\project要求\image\center3.jpg)

### 我的购物车

![cart1](D:\hyl\web\project要求\image\cart1.jpg)

### 修改/发布艺术品

![upload](D:\hyl\web\project要求\image\upload.jpg)

![upload2](D:\hyl\web\project要求\image\upload2.jpg)

### 商品详情页面

![detail1](D:\hyl\web\project要求\image\detail1.jpg)

![detail2](D:\hyl\web\project要求\image\detail2.jpg)

## 附加部分说明

1. 注册界面的密码强弱UI提示

   * **实现原理：**用onkeyup属性，实时判断注册时设置密码的强弱，查看有数字，大小写字母，特殊符号中的几种，一种为红色weak，两种为橙色medium，三种为绿色strong
   * **功能截图**
   * ![register](D:\hyl\web\project要求\image\register.jpg)

2. 详情页面的图片局部放大功能

   * **功能截图：**
* ![局部放大图](D:\hyl\web\project要求\image\局部放大图.jpg)
   * 图片局部放大的原理：一共有3个标签，原始图片img，观察窗口Browse，局部放大图magnifierImg。通过DOM事件进行鼠标坐标的获取，从而在magnifierImg中显示左侧图片的局部放大图。

3. 登录界面的随机验证码

   * 在php.ini开启后端php的session功能，以及GD像素画图功能在后端随机生成四位随机数字，并用像素绘制为png图片，同时使用session存储。当极少数情况下出现验证码看不清楚的情况，点击验证码图片可以刷新验证码。发送登录表单之后首先比较输入的验证码和先前在session中保存的是否一致，如果不一致则提前报错
   * **页面截图：**
   * ![login](D:\hyl\web\project要求\image\login.jpg)
4. 密码哈希加盐

   * 为了防止数据库被截获后所有用户的密码全部泄露，选择向用户密码中加盐，每次进行用户验证的时候将用户输入的密码用一种固定的方式进行加盐后，再和数据库中存储的密码进行比较。而且加盐方式必须是一一对应的，不允许出现多个密码字段在加盐后产生一样的加密字段。这样以来即使数据库泄露，入侵者也无法通过密码字段反推出真正的密码，即使侥幸知道加密方式，反推出用户输入的密码也是几乎不可能的；同时考虑到加固定盐十分容易被破解，加随机盐有需要占有比较多的存储空间，因此将用户名的sha1加密作为加的salt值，**数据库截图**如下
   * ![哈希加盐](D:\hyl\web\project要求\image\哈希加盐.jpg)
5. 我的足迹

   * **页面截图：**
   * ![detail2](D:\hyl\web\project要求\image\28.jpg)
   * 考虑到这个功能仅仅需要一个用户存储5个历史数据，所以如果将数据以后端数据库的形式存储有一些杀鸡用牛刀的感觉。而且因为我的足迹这个功能需要在几乎每一个页面上出现，所以不断访问数据库也会大大降低读取加载速度，所以我采用了在访问艺术品详情页面后进行本地客户端缓存的方法来存储，这样客户端只需要存储在一台机器上登录过的用户的足迹，大大减轻了服务器端的压力

6. 评论区功能

   * ![detail2](D:\hyl\web\project要求\image\25.jpg)
   * 由于出现了学期压缩的突发情况，评论区的功能暂时实现了一部分，仅仅将提供的数据库中的review的内容分别展示再每一个艺术品详情页面下方的评论区区域和实现了匿名发布评论的功能
8. 数据库触发器Trigger

   * **设计截图：**
   * ![触发器1](D:\hyl\web\project要求\image\触发器1.jpg)
   * ![触发器 2](D:\hyl\web\project要求\image\触发器 2.jpg)
   * **详细说明：**在自学了数据库触发器的基础上，初步理解了触发器的原理和性质。理解了触发器的工作原理，明白了触发器和普通的sql语句的区别就在于触发器的增删改查的附带功能是通过事件而不是人为的调用实现的，所以触发器的主要功能在于记录日志，以及附带功能实现的作用。在理解了一系列的性质之后，我设置了两个触发器：第一个**deleteobject触发器**是在发布者删除自己的艺术品之后，也会将该艺术品从每一个用户的购物车中清除，从而避免了出现用户清空购物车的时候该艺术品已经下架的情况的发生；第二个**placeorder触发器**的功能是在用户付款的时候自动清空购物车，以及把艺术品的状态设置为已经售出，这样大大减轻了清空购物车操作的时候要根据一条数据修改多个表的情况的发生