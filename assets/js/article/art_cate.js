$(function(){
    var layer=layui.layer
    var form=layui.form
    initArtclass()

    function initArtclass(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res) {
                var htmlstr=template('tpl-table',res)
                $('tbody').html(htmlstr)
            }
        })
    }
    /* 弹出层 */
    $('#btnAddCate').on('click',function(){
        indexadd=layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文件分类'
            ,content: $('#dialog-add').html()
          });     
    })
    var indexadd = null
     
    //通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0) {
                    return layer.msg('新增分类失败')
                }
                initArtclass()
                layer.msg('新增分类成功')
                // 根据索引关闭弹出层
                layer.close(indexadd)
            }
        })
    })
    var indexEdit=null
    // 通过代理的形式，为btn-edit表单绑定click事件
    $('tbody').on('click','.btn-edit',function(){
        indexEdit=layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改文章分类'
            ,content: $('#dialog-edit').html()
          });   
          
          var id=$(this).attr('data-id')
          $.ajax({
              method:"GET",
              url:"/my/article/cates/"+id,
              success:function(res){
                form.val('form-edit',res.data)
              }
          })
    })

    // 通过代理的形式，为修改分类表单绑定submit事件
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改分类失败')
                }
                initArtclass()
                layer.msg('修改分类成功')
                // 根据索引关闭弹出层
                layer.close(indexEdit)
            }
        })
    })

    // 通过代理的形式，为btn-delet表单绑定click事件
    $('tbody').on('click','.btn-delete',function(){
        
          var id=$(this).attr('data-id')
        //   提示是否删除
          layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:"GET",
                url:"/my/article/deletecate/"+id,
                success:function(res){
                    if (res.status!==0) {
                        return layer.msg('删除分类失败')
                    }
                  layer.close(index);
                  initArtclass()
                }
            })
            
          });
         
    })
})