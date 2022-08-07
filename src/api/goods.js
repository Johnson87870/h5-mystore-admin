import request from "@/utils/request";

export function list(data) {
  return request({
    url: "/goods/queryGoods",
    method: "post",
    data,
  });
}

export function deleteGoods(data) {
  return request({
    url: `/goods/deleteGoodsById?goodsId=${data}`,
    method: "get",
  });
}

export function addGoods(data) {
  return request({
    url: "/goods/saveGoods",
    method: "post",
    data,
  });
}

export function updateGoods(data) {
  return request({
    url: "/goods/updateGoods",
    method: "post",
    data,
  });
}

export function hotGoodsList() {
  return request({
    url: "/hot/queryHot",
    method: "post",
  });
}

export function addHotGoods(data) {
  return request({
    url: "/hot/saveHot",
    method: "post",
    data,
  });
}

export function deleteHotGoods(id) {
  return request({
    url: `/hot/deleteHotById?hotId=${id}`,
    method: "get",
  });
}
