

import { post } from "@/libs/http/request";
import Emitter from "@/mixins/emitter";
import { isNumber } from "util";
export default {
    mixins: [Emitter],
    data() {
        return {
            model: "",
            columns: [],
            data: [],
            selectList: [],
            searchItems: [],
            searchParams: {},
            sort: { asc: [], desc: [] },
            pageSize: 10,
            page: 1,
            total: 0
        };
    },
    methods: {
        handleTransportSelectList(list) {
            this.selectList = list;
        },
        handlePageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.search(1);
        },
        handlePageChange(page) {
            this.search(page);
        },
        handleSortChange(sort) {
            let key = sort.key;
            let order = sort.order;
            let asc = this.sort.asc;
            let desc = this.sort.desc;
            if (asc.indexOf(key) > -1) {
                let idx = asc.indexOf(key);
                asc.splice(idx, 1);
            }
            if (desc.indexOf(key) > -1) {
                let idx = desc.indexOf(key);
                desc.splice(idx, 1);
            }
            if (order !== "normal") {
                this.sort[order].push(key);
            }
            this.search(1);
        },
        go(path) {
            if (isNumber(path)) {
                this.$router.go(path);
            } else {
                this.$router.push(path);
            }
        },
        search(page) {
            this.page = page;
            let param = {
                pageable: {
                    page: page,
                    size: this.pageSize,
                    sort: this.sort
                },
                [this.model]: this.searchParams
            };
            if (
                param.pageable.sort.asc.length === 0 &&
                param.pageable.sort.desc.length === 0
            ) {
                delete param.pageable.sort;
            }
            post(`/api/${this.model}/search`, param, data => {
                this.data = data;
                this.getTotal();
            });
        },
        getTotal() {
            let param = { [this.model]: this.searchParams };
            post(`/api/${this.model}/count`, param, data => {
                this.total = parseInt(data);
            });
        },
        searchBySearchItem(searchItems) {
            let keys = [];
            for (
                let i = 0,
                searchItemList = this.searchItems,
                len = searchItemList.length;
                i < len;
                i++
            ) {
                keys.push(searchItemList[i].key);
            }
            for (let i in keys) {
                if (searchItems[keys[i]]) {
                    this.searchParams[keys[i]] = searchItems[keys[i]];
                } else {
                    delete this.searchParams[keys[i]];
                }
            }
            this.search(1);
        },
        get(id, callback = () => { }) {
            post(`/api/${this.model}/get`, { id }, data => {
                callback(data)
            });
        },
        delete(id) {
            this.$Modal.confirm({
                title: "删除提示",
                content: `确定删除该记录吗?`,
                okText: "确定",
                cancelText: "取消",
                onOk: () => {
                    post(`/api/${this.model}/delete`, { id }, data => {
                        this.search(this.page);
                    });
                },
                onCancel: () => { }
            });
        },
        enable(id) {
            this.$Modal.confirm({
                title: "删除提示",
                content: `确定启用该记录吗?`,
                okText: "确定",
                cancelText: "取消",
                onOk: () => {
                    post(`/api/${this.model}/enable`, { id }, data => {
                        this.search(this.page);
                    });
                },
                onCancel: () => { }
            });
        },
        disable(id) {
            this.$Modal.confirm({
                title: "删除提示",
                content: `确定禁用该记录吗?`,
                okText: "确定",
                cancelText: "取消",
                onOk: () => {
                    post(`/api/${this.model}/disable`, { id }, data => {
                        this.search(this.page);
                    });
                },
                onCancel: () => { }
            });
        },
        save() {

        },
        update() {

        },
        batchHandle(action, callback) {
            this.broadcast("SiTable", "on-get-selectList");
            this.$nextTick(() => {
                let selectList = this.selectList;
                if (selectList.length === 0) {
                    this.$Notice.warning({
                        title: "至少选择一条数据"
                    });
                    return;
                }
                this.$Modal.confirm({
                    title: `提示`,
                    content: `确定${action}所选记录吗?`,
                    okText: "确定",
                    cancelText: "取消",
                    onOk: () => {
                        callback(selectList);
                    },
                    onCancel: () => { }
                });
            });
        },
        handleSubmit(realname, success = () => { }, error = () => { }) {
            this.broadcast("SiUpload", "on-form-submit", () => { });
            this.$nextTick(() => {
                this.$refs[realname].validate(valid => {
                    if (valid) {
                        success();
                    } else {
                        error();
                    }
                });
            });
        },
        handleReset(realname) {
            this.$refs[realname].resetFields();
        }
    }
};
