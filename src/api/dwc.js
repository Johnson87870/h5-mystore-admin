import request from "@/utils/request";

export function welfarevoucherList(data) {
  return request({
    url: "/welfare/queryWelfare",
    method: "post",
    data,
  });
}

export function deleteWelfarevoucher(id) {
  return request({
    url: `/welfare/deleteWelfareById?welfareId=${id}`,
    method: "get",
  });
}

export function searchWelfarevoucher(id) {
  return request({
    url: `/welfare/queryWelfareById?welfareId=${id}`,
    method: "get",
  });
}

export function updateWelfarevocucher(data) {
  return request({
    url: "/welfare/updateWelfare",
    method: "post",
    data,
  });
}
