import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/admin/login",
    method: "post",
    data,
  });
}

export function create(data) {
  return request({
    url: "/admin/saveAdmin",
    method: "post",
    data,
  });
}

export function list(data) {
  return request({
    url: "/admin/queryAdmin",
    method: "post",
    data,
  });
}

export function searchAdmin(data) {
  return request({
    url: `admin/queryAdminById?adminId=${data}`,
    method: "get",
  });
}

export function deleteAdmin(data) {
  return request({
    url: `/admin/deleteAdminById?adminId=${data}`,
    method: "get",
  });
}

export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/logout/logout",
    method: "post",
  });
}

export function updateAdmin(data) {
  return request({
    url: "/admin/updateAdmin",
    method: "post",
    data,
  });
}
