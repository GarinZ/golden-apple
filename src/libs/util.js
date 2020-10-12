import axios from 'axios';
import env from '../config/env';
import iview from 'iview';
import md5 from 'js-md5';

iview.LoadingBar.config({
    color: '#FF8E05',
    failedColor: '#f0ad4e',
    height: 2
});

let util = {};
util.title = function (title) {
    title = title ? title : 'uxmap-您的定制导航';
    window.document.title = title;
};

const ajaxUrl = (env === 'development') ?
    'http://test.com:7001/uxmap' :
    (env === 'production' ?
        'http://www.uxmap.cn' :
        'http://www.uxmap.cn');

util.baseUrl = ajaxUrl;
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 600000,
    withCredentials: true,
    headers: {
        'x-requested-with': 'XMLHttpRequest',
        'token': env === 'development' ? 'd7bea3d8c0aca2d09b60e3f014308a77f314eb8c05469529591a8da6596f4ecc' : ''
    }
});

// 添加一个请求拦截器
util.ajax.interceptors.request.use(function (config) {
    iview.LoadingBar.start();
    return config;
}, function (error) {
    iview.LoadingBar.error();
    return Promise.reject(error);
});

// 添加一个响应拦截器
util.ajax.interceptors.response.use(function (response) {
    iview.LoadingBar.finish();
    return response;
}, function (error) {
    iview.LoadingBar.error();
    return Promise.reject(error);
});

function toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });
//        console.log(map);
    var val = [];
    data.forEach(function (item) {
        // 以当前遍历项，的parent_id,去map对象中找到索引的id
        var parent = map[item.parent_id];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}


// 调用时，字段名以字符串的形式传参，如treeData(source, 'id', 'parentId', 'children')
function treeData(source, id, parentId, children) {
    var cloneData = JSON.parse(JSON.stringify(source))
    return cloneData.filter(father => {
        var branchArr = cloneData.filter(child => father[id] == child[parentId]);
        branchArr.length > 0 ? father[children] = branchArr : ''
        return father[parentId] == 0        // 如果第一层不是parentId=0，请自行修改
    })
}

util.treeData = treeData;

util.toTree = toTree;

util.md5 = md5;

function getOffsetTop(e) {
    let offset = e.offsetTop;
    if (e.offsetParent !== null) {
        offset += getOffsetTop(e.offsetParent);
    }
    return offset;
}

util.getOffsetTop = getOffsetTop;

function getOffsetLeft(e) {
    let offset = e.offsetLeft;
    if (e.offsetParent !== null) {
        offset += getOffsetLeft(e.offsetParent);
    }
    return offset;
}

util.getOffsetLeft = getOffsetLeft;

var getOffsetPosition = function (elem) {
    if (!elem) return {left: 0, top: 0};
    var top = 0, left = 0;
    if ("getBoundingClientRect" in document.documentElement) {
        //jquery方法
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top = box.top + (self.pageYOffset || docElem && docElem.scrollTop || body.scrollTop) - clientTop,
            left = box.left + (self.pageXOffset || docElem && docElem.scrollLeft || body.scrollLeft) - clientLeft;
    } else {
        do {
            top += elem.offsetTop || 0;
            left += elem.offsetLeft || 0;
            elem = elem.offsetParent;
        } while (elem);
    }
    return {left: left, top: top};
}
util.getOffsetPosition = getOffsetPosition;

const ScrollTo = (number = 0, time) => {
    if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
    }
    const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime; // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
            spacingInex--;
            ScrollTo(nowTop += everTop);
        } else {
            clearInterval(scrollTimer); // 清除计时器
        }
    }, spacingTime);
};
util.ScrollTo = ScrollTo;

export default util;