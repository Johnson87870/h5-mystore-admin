import request from "@/utils/request";

export function list(data) {
  return request({
    url: "/buyer/queryBuyer",
    method: "post",
    data,
  });
}

export function searchUser(data) {
  return request({
    url: `/buyer/queryBuyerById?orderId=${data}`,
    method: "get",
  });
}

export function deleteUser(data) {
  return request({
    url: `/buyer/deleteBuyerById?orderId=${data}`,
    method: "get",
  });
}

export function blackList(data) {
  return request({
    url: "/buyer/queryBuyerByBlacklist",
    method: "post",
    data,
  });
}

export function updateBuyer(data) {
  return request({
    url: "/buyer/updateBuyer",
    method: "post",
    data,
  });
}
