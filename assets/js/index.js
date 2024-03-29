$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 询问框
            layer.close(index)
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //hearders就是请求配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }

    })

}
// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    }
    else {
        $('.layui-nav-img').hide()
        var frist = name[0].toUpperCase()
        $(".text-avatar").html(frist).show
    }
}