import request from "@/utils/request";

export function list(data) {
  return request({
    url: "/order/queryOrder",
    method: "post",
    data,
  });
}

export function searchOder(data) {
  return request({
    url: `/order/queryOrderById?orderId=${data}`,
    method: "get",
  });
}

export function deleteOder(data) {
  return request({
    url: `/order/deleteOrderById?orderId=${data}`,
    method: "get",
  });
}
