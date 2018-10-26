/*
* 扩展日期对象功能
*
* @author zhangkai
* 
* 更新：
*	2016-11-30
*		* 重写代码为 ES6 格式。
*		* 添加 tenDays 属性，返回日期所在的旬。值为 0、1、2，分别代表上、中、下旬。
*		* 添加 quarter 属性，返回日期所在的季度。值为 0、1、2、3，分别代表四个季度。
*		* 删除返回星期、月份、年份首尾两日期的属性，改用以下对象和方法实现。
*		* 定义 dateRange 对象，表示日期范围，包含两个日期类型的属性：f 和 l，分别代表日期范围的第一天（first）和最后一天（last）
*		* 添加 getWeekRange 方法，返回日期对象所在星期的 dateRange 日期范围对象
*		* 添加 getTenDaysRange 方法，返回日期对象所在旬的 dateRange 日期范围对象
*		* 添加 getMonthRange 方法，返回日期对象所在月的 dateRange 日期范围对象
*		* 添加 GetQuarterRange 方法，返回日期对象所在季度的 dateRange 日期范围对象
*		* 添加 getYearRange 方法，返回日期对象所在年的 dateRange 日期范围对象
*
*	2011-6-10
*		* 完成主要功能
*/


//返回当前日期时间对象
Object.defineProperties(window, {
    "now": { get: function () { return new DateExt(); } },
    "Now": { get: function () { return this.now; } }
});

/**
 * DateExt 类，扩展日期对象功能，继承自 Date 类
 * @augments Date
 * @property {date} 返回此实例所表示日期的年月日部分（时分秒等为0）
 */
class DateExt extends Date {
    constructor(...arg) {
        super(...arg);
        return this;
    };

    /** 返回此实例所表示日期的年月日部分（时分秒等为0）*/
    get date() { return new DateExt(this.year, this.month - 1, this.day); };

    /** 返回此实例所表示日期的年份部分。*/
    get year() { return this.getFullYear(); };

    /** 返回此实例所表示日期所属的季度。为 0、1、2、3 中的一个值，分别代表四个季度。*/
    get quarter() { return Math.ceil(this.month / 3) - 1; };

    /** 返回此实例所表示日期的月份部分。为 1 和 12 之间的一个值。*/
    get month() { return this.getMonth() + 1; };

    /** 返回此实例所表示的日期所属的旬。为 0、1、2 中的一个值，分别代表上、中、下旬。*/
    get tenDays() { return [0, 1, 2, 2][Math.ceil(this.day / 10) - 1]; };

    /** 返回此实例所表示的日期为该月中的第几天。为 1 和 31 之间的一个值。*/
    get day() { return this.getDate(); };

    /** 返回此实例所表示日期的小时部分。 为 0 和 23 之间的一个值。*/
    get hour() { return this.getHours(); };

    /** 返回此实例所表示日期的分钟部分。 为 0 和 59 之间的一个值。*/
    get minute() { return this.getMinutes(); };

    /** 返回此实例所表示日期的秒部分。 为 0 和 59 之间的一个值。*/
    get second() { return this.getSeconds(); };

    /** 返回此实例所表示日期的毫秒部分。为 0 和 999 之间的一个值。*/
    get millisecond() { return this.getMilliseconds(); };

    /** 返回此实例所表示的日期是星期几。从0（表示星期日）到6（表示星期六）之间的一个值。 */
    get dayOfWeek() { return this.getDay(); };

    /** 返回对象所在月的天数	例如，如果是二月，则返回值为 28 或 29，具体取决于 year 是否为闰年。*/
    get daysInMonth() { return new DateExt(this.year, this.month, 0).day; };

    /** 返回对象的年份是否为闰年*/
    get isLeapYear() { return ((this.year % 400) == 0) || ((this.year % 4 == 0) && (this.year % 100) != 0); };

    /** 返回一个类似于“/Date(000000000000+0800)/”这样的json日期字符串转换的日期对象*/
    static fromJson(s) { return new DateExt(parseInt(s.match(/\d+/))); };
    static fromJSON(s) { return this.fromJson(s); };

    /** 返回对象所在星期的日期范围，返回值是包含了星期第一天和最后一天的日期范围对象*/
    getWeekRange() {
        return {
            "f": this.addDays(-this.dayOfWeek).date,
            "l": this.addDays(6 - this.dayOfWeek).date
        };
    };

    /** 返回对象所在旬的日期范围，返回值是包含了旬第一天和最后一天的日期范围对象*/
    getTenDaysRange() {
        return {
            "f": new DateExt(this.year, this.month - 1, [1, 11, 21][this.tenDays]),
            "l": new DateExt(this.year, this.month - 1, [10, 20, this.daysInMonth][this.tenDays])
        }
    };

    /**返回对象所在月的日期范围，返回值是包含了月份第一天和最后一天的日期范围对象 */
    getMonthRange() {
        return {
            "f": this.addDays(1 - this.day).date,
            "l": this.addDays(this.daysInMonth - this.day).date
        };
    };

    /**返回对象所在季度的日期范围，返回值是包含了季度第一天和最后一天的日期范围对象 */
    getQuarterRange() {
        let arrQ = [
            {
                "f": new DateExt(this.year, 0, 1),
                "l": new DateExt(this.year, 2, 31)
            },
            {
                "f": new DateExt(this.year, 3, 1),
                "l": new DateExt(this.year, 5, 30)
            },
            {
                "f": new DateExt(this.year, 6, 1),
                "l": new DateExt(this.year, 8, 30)
            },
            {
                "f": new DateExt(this.year, 9, 1),
                "l": new DateExt(this.year, 11, 31)
            }
        ];
        return arrQ[this.quarter];
    };

    /**返回对象所在年的日期范围，返回值是包含了年份第一天和最后一天的日期范围对象 */
    getYearRange() {
        return {
            "f": new DateExt(this.year, 0, 1),
            "l": new DateExt(this.year, 11, 31)
        };
    };

    /**
     * 将指定的天数加到此实例的值上。 
     * @param {number} v 由整数组成的天数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 所表示的天数之和。 
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addDays(v) {
        return new DateExt((new DateExt(this)).setDate(this.getDate() + v));
    };

    /**
     * 将指定的星期数加到此实例的值上。
     * 
     * @param {number} v 由整数组成的天数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 所表示的星期之和。 
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addWeeks(v) {
        return new DateExt((new DateExt(this)).setDate(this.getDate() + v * 7));
    };

    /**
     * 将指定的月份数加到此实例的值上。
     * 
     * @param {number} v 月份数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 之和。
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addMonths(v) {
        return new DateExt((new DateExt(this)).setMonth(this.getMonth() + v));
    };

    /**
     * 将指定的年份数加到此实例的值上。
     * 
     * @param {number} v 年份数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 所表示的年份数之和。
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addYears(v) {
        return new DateExt((new DateExt(this)).setFullYear(this.getFullYear() + v));
    };

    /**
     * 将指定的小时数加到此实例的值上。
     *
     * @param {number} v 由整数组成的小时数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 所表示的小时数之和。 
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addHours(v) {
        return new DateExt((new DateExt(this)).setHours(this.getHours() + v));
    };

    /**
     * 将指定的分钟数加到此实例的值上。
     *
     * @param {number} v 由整数组成的秒数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 所表示的分钟数之和。 
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addMinutes(v) {
        return new DateExt((new DateExt(this)).setMinutes(this.getMinutes() + v));
    };

    /**
     * 将指定的秒钟数加到此实例的值上。
     * 
     * @param {number} v 由整数组成的秒数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 所表示的秒钟数之和。 
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addSeconds(v) {
        return new DateExt((new DateExt(this)).setSeconds(this.getSeconds() + v));
    };

    /**
     * 将指定的毫秒数加到此实例的值上。
     * 
     * @param {number} v 由整数组成的毫秒数。可以是负数也可以是正数。 
     * @returns {DateExt} 其值是此实例所表示的日期和时间与 v 所表示的毫秒数之和。 
     * @description 此方法不更改此 DateExt 的值。而是返回一个新的 DateExt，其值是此运算的结果。
    */
    addMilliseconds(v) {
        return new DateExt((new DateExt(this)).setMilliseconds(this.getMilliseconds() + v));
    };

    /**
     * 返回两个日期之间的时间间隔。相同日期间隔为 0。
     * @param {string} interval 间隔类型，d 为天数（默认），y 为年数, m 为月数
     * @param {DateExt} d 所比较的日期
     * @returns {number} 间隔数量
     */
    dateDiff(interval = "d", d = new DateExt) {
        if (!interval) { return; };
        if (d.constructor === Date) { d = new DateExt(d); };
        switch (interval) {
            case "y"://间隔的年数，忽略月份和日期，即使是12月31日和1月1日，也返回1
                return Math.abs(this.year - d.year);
            case "m"://间隔的月数，忽略日期，即使是月末与次月初间隔为一天，也返回1
                return Math.abs(this.year - d.year) * 12 + (this.month - d.month);
            default: //默认为间隔的天数
                let _v = Math.abs(this.date - d.date);
                return Math.floor(_v / 86400000);
        }
    };

    /**
     * 转换为字符串
     * @param {string} formatString 格式化模板字符串，将调用 toFormatString 方法格式化输出。如省略则调用父类 Date 的 toString 方法
     */
    toString(formatString = "") {
        return formatString ? this.toFormatString(formatString) : super.toString();
    }

    /**
     * 自定义格式化日期输出
     * @param {string} v 格式化模板字符串
     * @returns {string}
     *
     *   可用定义字符：
     *       yyyy:   四位数年份
     *       yy:     两位数年份
     *       MM:     两位数月份（不足两位补0）
     *       M:      一位数月份
     *       dd:     两位数日期（不足两位补0）
     *       d:      一位数日期
     *       hh:     两位数小时（不足两位补0）
     *       h:      一位数小时
     *       mm:     两位数分钟（不足两位补0）
     *       m:      一位数分钟
     *       ss:     两位数秒数（不足两位补0）
     *       s:      一位数秒数
     *       www:    三汉字星期
     *       ww:     两汉字星期
     *       w:      单汉字星期
     *       tt:     两汉字旬
     *       t:      单汉字旬
     */
    toFormatString(v) {
        if (!v) { return this.toLocaleString() };

        let year = this.year;
        v = v.replace('yyyy', year);
        v = v.replace('yy', year.toString().substr(2));

        let month = this.month;
        v = v.replace('MM', month < 10 ? '0' + month : month);
        v = v.replace('M', month);

        let day = this.day;
        v = v.replace('dd', day < 10 ? '0' + day : day);
        v = v.replace('d', day);

        let hour = this.hour;
        v = v.replace('hh', hour < 10 ? '0' + hour : hour);
        v = v.replace('h', hour);

        let minute = this.minute;
        v = v.replace('mm', minute < 10 ? '0' + minute : minute);
        v = v.replace('m', minute);

        let second = this.second;
        v = v.replace('ss', second < 10 ? '0' + second : second);
        v = v.replace('s', second);

        let dayOfWeek = this.dayOfWeek;
        v = v.replace('www', ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][dayOfWeek]);
        v = v.replace('ww', ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][dayOfWeek]);
        v = v.replace('w', ['日', '一', '二', '三', '四', '五', '六'][dayOfWeek]);

        let tendays = this.tenDays;
        v = v.replace("tt", ["上旬", "中旬", "下旬"][tendays]);
        v = v.replace("t", ["上", "中", "下"][tendays]);

        return v;
    };
};