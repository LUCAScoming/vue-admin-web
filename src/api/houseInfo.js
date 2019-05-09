import requestOrg from '@/utils/request'

export default {
  // 分页查询
  getQueryPage() {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/house/condition',
      method: 'GET'
    })
  },
  getHouseInfo(ownerInfo) {
    if (ownerInfo.ownerId !== '' && ownerInfo.ownerName === '') {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/house/condition?ownerId=' + ownerInfo.ownerId,
        method: 'GET'
      })
    } else if (ownerInfo.ownerName !== '' && ownerInfo.ownerId === '') {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/house/condition?ownerName=' + ownerInfo.ownerName,
        method: 'GET'
      })
    } else if (ownerInfo.ownerName === '' && ownerInfo.ownerId === '') {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/house/condition',
        method: 'GET'
      })
    }
  },
  editInfo(id) {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/house/' + id,
      method: 'GET'
    })
  },
  delete(id) {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/house/' + id,
      method: 'DELETE'
    })
  },
  editHouse(obj) {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/house',
      method: 'POST',
      data: obj
    })
  }
}
