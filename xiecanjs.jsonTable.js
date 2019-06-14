function jsonTable(options) {
    var options = $.extend({
        container: "div",
        id: "ajaxTable" + Math.random(9).toString(36).replace(".", ""),
        title: "这里是测试标题",
        key: "id",
        cols: {
            "id": "编号",
            "comm": "说明"
        },
        rows: [
            { id: 1001, comm: "谢灿软件工作室" },
            { id: 1002, comm: "http://www.xiecan.cc" }
       ],
        detials: {
            text: "详情信息",
            display: 1
        },
        deletes: {
            text: "删除",
            display: 1
        },
        updates: {
            text: "修改",
            display: 1
        },
        inserts: {
            text: "添加",
            display: 1
        }
    }, options);

    this.id = function () {
        return options.id;
    };

    this.data = function () {
        return options.rows;
    }

    this.filter = function (key, value) {
        /// <summary>
        /// 检索数据行
        /// </summary>
        /// <param name="key">检索属性</param>
        /// <param name="value">属性值</param>
        /// <returns type="json对象">json对象或null</returns>
        for (var i = 0; i < options.rows.length; i++) {
            if (options.rows[i][key] == value) {
                return options.rows[i];
            }
        }
        return null;
    }

    this.show = function () {
        /// <summary>
        /// 根据配置信息，显示数据表
        /// </summary>
        var that = this;
        var $container = $(options.container);
        if (options.container == null || $container[0] == null) {
            $container = $(document.body);
        }
        $container.append("<table class='ajaxTable' id='" + that.id() + "'><thead></thead><tbody></tbody></table>");

        var $table = $container.find("#" + that.id());

        var $thead = $table.find("thead");
        if (options.title != null) {
            $thead.append("<tr><th class='title'>" + options.title + "</th></tr>");
        }
        var $title = $thead.find(".title");
        var $cols = $thead.append("<tr class='cols'></tr>").find(".cols");
        var count = 0;
        for (var i in options.cols) {
            $cols.append("<th>" + options.cols[i] + "</th>");
            count++;
        }
        if (options.detials.display == 1 || options.deletes.display == 1 || options.updates.display == 1) {
            $cols.append("<th>操作</th>");
            count++;
        }
        if ($title[0] != null) {
            $title.attr("colspan", count);
            if (options.inserts.display == 1) {
                $title.append("<a class='inserts' style='float:right' href='javascript:void(0)'>" + options.inserts.text + "</a>");
            }
        }

        var $tbody = $table.find("tbody");
        for (var i in options.rows) {
            var $row = $tbody.append("<tr></tr>").find("tr:eq(" + (Number)(i) + ")");
            for (var j in options.cols) {
                var data = options.rows[i][j];
                if (data == null) {
                    $row.append("<td title='数据行中无此列数据,请检查配置是否有误!'></td>");
                }
                else {
                    $row.append("<td>" + data + "</td>");
                }
            }

            if (options.detials.display == 1 || options.deletes.display == 1 || options.updates.display == 1) {
                var $td = $row.append("<td class='option'></td>").find(".option");
                if (options.detials.display == 1)
                    $td.append("<td><a class='detials' data-id='" + options.rows[i][options.key] + "' href='javascript:void(0)'>" + options.detials.text + "</a></td>");

                if (options.deletes.display == 1)
                    $td.append("<td><a class='deletes' data-id='" + options.rows[i][options.key] + "' href='javascript:void(0)'>" + options.deletes.text + "</a></td>");

                if (options.updates.display == 1)
                    $td.append("<td><a class='updates' data-id='" + options.rows[i][options.key] + "' href='javascript:void(0)'>" + options.updates.text + "</a></td>");
            }
        }


        $table.find(".inserts").click(function () {
            if (typeof that.oninsert === "function") {
                that.oninsert();
            }
        });

        $table.find(".detials").click(function () {
            if (typeof that.ondetial === "function") {
                var key = $(this).attr("data-id");
                var data = that.filter(options.key, key);
                that.ondetial(key, data);
            }
        });

        $table.find(".deletes").click(function () {
            if (typeof that.ondelete === "function") {
                var key = $(this).attr("data-id");
                var data = that.filter(options.key, key);
                that.ondelete(key, data);
            }
        });

        $table.find(".updates").click(function () {
            if (typeof that.onupdate === "function") {
                var key = $(this).attr("data-id");
                var data = that.filter(options.key, key);
                that.onupdate(key, data);
            }
        });
    }

    this.ondetial = function (key, data) {
        /// <summary>
        /// 详情数据
        /// </summary>
        /// <param name="key">要显示的数据主键</param>
        /// <param name="data">要显示的部分原始数据</param>
    }

    this.ondelete = function (key, data) {
        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="key">要删除的数据主键</param>
        /// <param name="data">要删除的原始数据</param>
    }

    this.onupdate = function (key, data, news) {
        /// <summary>
        /// 修改数据
        /// </summary>
        /// <param name="key">要修改的数据主键</param>
        /// <param name="data">要修改的原始数据</param>
    }

    this.oninsert = function () {
        /// <summary>
        /// 插入数据
        /// </summary>
    }
}