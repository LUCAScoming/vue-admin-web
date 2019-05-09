import requestOrg from '@/utils/request'

export default {
  // 分页查询
  getQueryPage() {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/owner/condition',
      method: 'GET'
    })
  },
  getOwnerInfo(ownerInfo) {
    if (ownerInfo.ownerId !== '' && ownerInfo.ownerName === '') {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/owner/condition?ownerId=' + ownerInfo.ownerId,
        method: 'GET'
      })
    } else if (ownerInfo.ownerName !== '' && ownerInfo.ownerId === '') {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/owner/condition?ownerName=' + ownerInfo.ownerName,
        method: 'GET'
      })
    } else if (ownerInfo.ownerName === '' && ownerInfo.ownerId === '') {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/owner/condition',
        method: 'GET'
      })
    }
  },
  getOwnerPage(pageObj) {
    if (pageObj.size !== 10) {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/owner/condition?=' + pageObj.size,
        method: 'GET'
      })
    } else if (pageObj.currentPage) {
      return requestOrg({
        url: 'http://182.254.201.174:8080/alpha/alpha/owner/condition?pageNum=' + pageObj.currentPage,
        method: 'GET'
      })
    }
  },
  editInfo(id) {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/owner/' + id,
      method: 'GET'
    })
  },
  delete(id) {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/owner/' + id,
      method: 'DELETE'
    })
  },
  editOwner(obj) {
    return requestOrg({
      url: 'http://182.254.201.174:8080/alpha/alpha/owner',
      method: 'POST',
      data: obj
    })
  }

}
