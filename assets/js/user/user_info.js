$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6之间'
            }
        }
    })
    initUserinfo()
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return console.log('获取失败');
                }
                console.log(res);
                //调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserinfo()
    })

    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单的默认提交行为
        console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户失败！')
                }
                layer.msg('更新成功');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})