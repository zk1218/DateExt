# DateExt 功能扩展的日期类

> 为日期的操作提供了更方便的功能。

>   
>   更新：
>   
>   #### 2016-11-30
>   * 重写代码为 ES6 格式。
>   * 添加 tenDays 属性，返回日期所在的旬。值为 0、1、2，分别代表上、中、下>   旬。
>   * 添加 quarter 属性，返回日期所在的季度。值为 0、1、2、3，分别代表四个季>  度。
>   * 删除返回星期、月份、年份首尾两日期的属性，改用以下对象和方法实现。
>   * 定义 dateRange 对象，表示日期范围，包含两个日期类型的属性：f 和 l，分别> 代表日期范围的第一天（first）和最后一天（last）
>   * 添加 getWeekRange 方法，返回日期对象所在星期的 dateRange 日期范围对象
>   * 添加 getTenDaysRange 方法，返回日期对象所在旬的 dateRange 日期范围对象
>   * 添加 getMonthRange 方法，返回日期对象所在月的 dateRange 日期范围对象
>   * 添加 GetQuarterRange 方法，返回日期对象所在季度的 dateRange 日期范围对>  象
>   * 添加 getYearRange 方法，返回日期对象所在年的 dateRange 日期范围对象
>   
>   2011-6-10
>   * 完成主要功能
>   

-------------------------------------------------------------------

## 属性

### date : DateExt
返回返回此实例所表示日期的年月日部分（时分秒等为0）

```JavaScript
let _d = new DateExt();
_d.date();  // 2000-1-1 0:0:0
```

### year : number
返回此实例所表示日期的年份部分。

### quarter : number
返回此实例所表示日期所属的季度。为 0、1、2、3 中的一个值，分别代表四个季度。

返回此实例所表示日期的月份部分。为 1 和 12 之间的一个值。
### month : number

### tenDays : number
返回此实例所表示的日期所属的旬。为 0、1、2 中的一个值，分别代表上、中、下旬。

### day : number
返回此实例所表示的日期为该月中的第几天。为 1 和 31 之间的一个值。

### hour : number
返回此实例所表示日期的小时部分。 为 0 和 23 之间的一个值。

### minute : number
返回此实例所表示日期的分钟部分。 为 0 和 59 之间的一个值。

### second : number
返回此实例所表示日期的秒部分。 为 0 和 59 之间的一个值。

### millisecond : number
返回此实例所表示日期的毫秒部分。为 0 和 999 之间的一个值。

### dayOfWeek : number
返回此实例所表示的日期是星期几。从0（表示星期日）到6（表示星期六）之间的一个值。 

### daysInMonth : number
返回对象所在月的天数
>例如，如果是二月，则返回值为 28 或 29，具体取决于 year 是否为闰年。

### isLeapYear : boolean
返回对象的年份是否为闰年

-------------------------------------------------------------------

## 方法

### fromJson(s : string) : DateExt
返回一个类似于“/Date(000000000000+0800)/”这样的json日期字符串转换的日期对象

### getWeekRange : { f : DateExt , l : DateExt }
返回对象所在星期的日期范围，返回值是包含了星期第一天和最后一天的日期范围对象

### getTenDaysRange : { f : DateExt , l : DateExt }
返回对象所在旬的日期范围，返回值是包含了旬第一天和最后一天的日期范围对象

### getMonthRange : { f : DateExt , l : DateExt }
返回对象所在月的日期范围，返回值是包含了月份第一天和最后一天的日期范围对象 

### getQuarterRange : { f : DateExt , l : DateExt }
返回对象所在季度的日期范围，返回值是包含了季度第一天和最后一天的日期范围对象 

### getYearRange : { f : DateExt , l : DateExt }
返回对象所在年的日期范围，返回值是包含了年份第一天和最后一天的日期范围对象

### addDays(v : number) : DateExt
将指定的天数加到此实例的值上。 
#### 参数
  * v 由整数组成的天数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。

### addWeeks(v : number) : DateExt
将指定的星期数加到此实例的值上。
#### 参数
  * v 由整数组成的星期数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。

### addMonths(v : number) : DateExt
将指定的月份数加到此实例的值上。
#### 参数
  * v 由整数组成的月份数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。

### addYears(v : number) : DateExt
将指定的年数加到此实例的值上。
#### 参数
  * v 由整数组成的年数。可以是负数也可以是正数。 
  > 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。

