# DateExt 功能扩展的日期类

为日期对象扩展了一些属性和方法，以便更快捷地获取日期的信息。

>   
>   更新：
>   
>   #### 2016-11-30
>   * 重写代码为 ES6 格式。
>   * 添加 tenDays 属性，返回日期所在的旬。值为 0、1、2，分别代表上、中、下旬。
>   * 添加 quarter 属性，返回日期所在的季度。值为 0、1、2、3，分别代表四个季度。
>   * 删除返回星期、月份、年份首尾两日期的属性，改用以下对象和方法实现。
>   * 定义 dateRange 对象，表示日期范围，包含两个日期类型的属性：f 和 l，分别代表日期范围的第一天（first）和最后一天（last）
>   * 添加 getWeekRange 方法，返回日期对象所在星期的 dateRange 日期范围对象
>   * 添加 getTenDaysRange 方法，返回日期对象所在旬的 dateRange 日期范围对象
>   * 添加 getMonthRange 方法，返回日期对象所在月的 dateRange 日期范围对象
>   * 添加 getQuarterRange 方法，返回日期对象所在季度的 dateRange 日期范围对象
>   * 添加 getYearRange 方法，返回日期对象所在年的 dateRange 日期范围对象
>   
>   2011-6-10
>   * 完成主要功能
>   

-------------------------------------------------------------------
## window.now : DateExt
为 window 对象添加一个 now 属性，返回调用该属性时的时间
```js
console.log(now);
```
-------------------------------------------------------------------

## 属性

### date : DateExt
返回返回此实例所表示日期的年月日部分（时分秒等为0）

```js
console.log(now.date);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.date);   //2016-11-30 00:00:00
```

### year : number
返回此实例所表示日期的年份部分。
```js
console.log(now.year);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.year);   //2016
```

### quarter : number
返回此实例所表示日期所属的季度。为 0、1、2、3 中的一个值，分别代表四个季度。
```js
console.log(now.quarter);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.quarter);   //3
```

### month : number
返回此实例所表示日期的月份部分。为 1 和 12 之间的一个值。
```js
console.log(now.month);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.month);   //11
```

### tenDays : number
返回此实例所表示的日期所属的旬。为 0、1、2 中的一个值，分别代表上、中、下旬。
```js
console.log(now.tenDays);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.tenDays);   //2
```

### day : number
返回此实例所表示的日期为该月中的第几天。为 1 和 31 之间的一个值。
```js
console.log(now.day);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.day);   //30
```

### hour : number
返回此实例所表示日期的小时部分。 为 0 和 23 之间的一个值。
```js
console.log(now.hour);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.hour);   //8
```

### minute : number
返回此实例所表示日期的分钟部分。 为 0 和 59 之间的一个值。
```js
console.log(now.minute);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.minute);   //0
```

### second : number
返回此实例所表示日期的秒部分。 为 0 和 59 之间的一个值。
```js
console.log(now.second);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.second);   //0
```

### millisecond : number
返回此实例所表示日期的毫秒部分。为 0 和 999 之间的一个值。
```js
console.log(now.millisecond);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.millisecond);   //0
```

### dayOfWeek : number
返回此实例所表示的日期是星期几。从 0（表示星期日）到 6（表示星期六）之间的一个值。 
```js
console.log(now.dayOfWeek);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.dayOfWeek);   //3
```

### daysInMonth : number
返回对象所在月的天数
>例如，如果是二月，则返回值为 28 或 29，具体取决于 year 是否为闰年。
```js
console.log(now.daysInMonth);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.daysInMonth);   //30
```

### isLeapYear : boolean
返回对象的年份是否为闰年
```js
console.log(now.isLeapYear);
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.isLeapYear);   //true
```

-------------------------------------------------------------------

## 方法

### fromJSON(s : string) : DateExt
静态方法。返回一个类似于“/Date(000000000000+0800)/”这样的json日期字符串转换的日期对象
```js
DateExt.fromJSON("/Date(1234567890000+0800)/");  //2009-02-14 07:31:30
```

### getWeekRange : { f : DateExt , l : DateExt }
返回对象所在星期的日期范围，返回值是包含了星期第一天和最后一天的日期范围对象
```js
console.log(now.getWeekRange());
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.getWeekRange());   //{ f : 2016-11-27 , l : 2016-12-03}
```

### getTenDaysRange : { f : DateExt , l : DateExt }
返回对象所在旬的日期范围，返回值是包含了旬第一天和最后一天的日期范围对象
```js
console.log(now.getTenDaysRange());
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.getTenDaysRange());   //{ f : 2016-11-21 , l : 2016-11-30}
```

### getMonthRange : { f : DateExt , l : DateExt }
返回对象所在月的日期范围，返回值是包含了月份第一天和最后一天的日期范围对象 
```js
console.log(now.getMonthRange());
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.getMonthRange());   //{ f : 2016-11-01 , l : 2016-11-30}
```

### getQuarterRange : { f : DateExt , l : DateExt }
返回对象所在季度的日期范围，返回值是包含了季度第一天和最后一天的日期范围对象 
```js
console.log(now.getQuarterRange());
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.getQuarterRange());   //{ f : 2016-10-01 , l : 2016-12-31}
```

### getYearRange : { f : DateExt , l : DateExt }
返回对象所在年的日期范围，返回值是包含了年份第一天和最后一天的日期范围对象
```js
console.log(now.getYearRange());
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.getYearRange());   //{ f : 2016-01-01 , l : 2016-12-31}
```

### addDays(v : number) : DateExt
返回一个添加了指定天数的新 DateExt 实例
#### 参数
  * v 由整数组成的天数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
```js
console.log(now.addDays(10));
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.addDays(10));   //2016-12-10 08:00:00
```

### addWeeks(v : number) : DateExt
返回一个添加了指定星期数的新 DateExt 实例
#### 参数
  * v 由整数组成的星期数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
```js
console.log(now.addWeeks(10));
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.addWeeks(10));   //2017-02-08 08:00:00
```

### addMonths(v : number) : DateExt
返回一个添加了指定月份数的新 DateExt 实例
#### 参数
  * v 由整数组成的月份数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
```js
console.log(now.addMonths(10));
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.addMonths(10));   //2017-09-30 08:00:00
```

### addYears(v : number) : DateExt
返回一个添加了指定年数的新 DateExt 实例
#### 参数
  * v 由整数组成的年数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
```js
console.log(now.addYears(10));
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.addYears(10));   //2026-11-30 08:00:00
```

### addHours(v : number) : DateExt
返回一个添加了指定小时数的新 DateExt 实例
#### 参数
  * v 由整数组成的小时数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
```js
console.log(now.addHours(10));
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.addHours(10));   //2016-11-30 18:00:00
```

### addMinutes(v : number) : DateExt
返回一个添加了指定分钟数的新 DateExt 实例
#### 参数
  * v 由整数组成的分钟数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
```js
console.log(now.addMinutes(10));
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.addMinutes(10));   //2016-11-30 08:10:00
```

### addSeconds(v : number) : DateExt
返回一个添加了指定秒数的新 DateExt 实例
#### 参数
  * v 由整数组成的秒数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
```js
console.log(now.addSeconds(10));
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.addSeconds(10));   //2016-11-30 18:00:10
```

### dateDiff(interval : string , d : DateExt | Date) : Number
返回两个日期之间的时间间隔。相同日期间隔为 0。
#### 参数
  * interval : 间隔类型，"d" 为天数（默认），"y" 为年数, "m" 为月数
  * * d : 间隔的天数
  * * m : 间隔的月数，忽略日期，即使是月末与次月初间隔为一天，也返回 1
  * * y : 间隔的年数，忽略月份和日期，即使是12月31日和1月1日，也返回 1
  * d : 所比较的日期
```js
console.log(now.dateDiff("d",new Date()));  //0
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.dateDiff("d",new Date("2016-11-29")));   //1
```

### toString(?formatString : string) : String
转换为字符串
### 参数
  * formatString : 可选。格式化模板字符串，将调用 toFormatString 方法格式化输出（见 toFormatString 方法）。如省略则调用父类 Date 的 toString 方法
```js
console.log(now.toString());
---------------------------------
let _d = new DateExt("2016-11-30 08:00:00");
console.log(_d.toString());   //Wed Nov 30 2016 08:00:00 GMT+0800 (中国标准时间)
console.log(_d.toString("yyyy年M月dd日h点m分"));   //2016年11月30日8点0分
console.log(_d.toFormatString("时间是yyyy年M月d日h点m分s秒，www，ww，yyyy年qqqM月tt"));   //时间是2016年11月30日8点0分0秒，星期三，周三，2016年四季度11月下旬
```

### toFormatString(formatString : string) : String
自定义格式化日期输出
### 参数
  * formatString : 格式化模板字符串，可用的定义字符有：
     * yyyy :   四位数年份
     * yy :     两位数年份
     * MM :     两位数月份（不足两位补0）
     * M :      一位数月份
     * dd :     两位数日期（不足两位补0）
     * d :      一位数日期
     * hh :     两位数小时（不足两位补0）
     * h :      一位数小时
     * mm :     两位数分钟（不足两位补0）
     * m :      一位数分钟
     * ss :     两位数秒数（不足两位补0）
     * s :      一位数秒数
     * www :    三汉字星期
     * ww :     两汉字星期
     * w :      单汉字星期
     * qqq:     三汉字季度
     * qq:      两汉字季度
     * q:       单汉字季度
     * tt :     两汉字旬
     * t :      单汉字旬
