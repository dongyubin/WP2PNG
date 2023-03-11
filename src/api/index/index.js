import instance from "@/utils/request";

// 登录
export function posts(data){
  return instance({
    method: "get",
    url: '/wp-json/wp/v2/posts?per_page=1',
    data
  })
}

export function context(data){
  console.log(data);
  return instance({
    method: 'get',
    url: '/wp-json/wp/v2/posts/'+data.id
  })
}