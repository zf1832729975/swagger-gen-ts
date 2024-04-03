export function request<Req>(param: any) {
  return Promise.resolve({
    success: 'Request',
    data: param,
  })
}
