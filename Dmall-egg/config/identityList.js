const apiList = [
    {
        url:'/home/banner',
        method:'GET',
        title:'轮播图列表',
        identityName:['admin']
    },
    {
        url:'/home/addBanner',
        method:'POST',
        title:'添加轮播图',
        identityName:['admin']
    },
    {
        url:'/shop/addType',
        method:'GET',
        title:'添加商品分类',
        identityName:['admin']
    },
    {
        url:'/shop/addCategory',
        title:'添加商品子分类',
        method:'GET',
        identityName:['admin']
    },
    {
        url:'/shop/addShop',
        title:'添加商品',
        method:'POST',
        identityName:['admin','consumer']
    },
    {
        url:'/shop/getType',
        title:'获取商品分类',
        method:'GET',
        identityName:['admin']
    },
    {
        url:'/shop/getCategory',
        title:'获取商品子分类',
        method:'GET',
        identityName:['admin']
    },
    {
        url:'/shop/allShop',
        title:'获取所有商品',
        method:'GET',
        identityName:['admin']
    }
]


const identityList = {
    "1":{
        name:'admin'
    },
    "2":{
        name:'consumer'
    }
}

exports.getIdentityName = (identityId)=>{
    return identityList[Object.keys(identityList).find(key=>identityId==key)];
}