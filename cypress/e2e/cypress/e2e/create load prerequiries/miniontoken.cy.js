describe('get api test',()=>{
    let token
    it('get token',()=>{
    cy.request({
             method: 'GET',
              url:'https://minion.test.mm100.mastermindtms.com/auth-info/auth-info',
              headers: {
                "authority": "minion.test.mm100.mastermindtms.com",
                "Accept-Language": "en-US,en;q=0.9",
                "Cookie": "minion-portal-mm100-test-session=eyJpZCI6IjYxZmQ3NzQxM2YwZTczZTM2MWExZjdkNWYwOTUwZTMwIiwic3RhdGUiOiJmODc3NDBmN2VkMDIyM2ZhZmE4NzQwMWJmYjQ0YTc0MDY3MWM4MmYwOWY2ZDEzYzgiLCJjcmVhdGVkQXQiOjE2NjQ0MzE0Nzc2MzYsInVwZGF0ZWRBdCI6MTY2NTEzNTUzMDk3OSwiY29kZV92ZXJpZmllciI6Ik5IYkRzWUUxbm9QWnI1V1h2TXJpcXlDYV95Y1gyVzNFY2VrOGpJTElIbjgiLCJyZWYiOiJodHRwczovL21pbmlvbi50ZXN0Lm1tMTAwLm1hc3Rlcm1pbmR0bXMuY29tL2RpY3Rpb25hcnktdGVybXMifQ%3D%3D",
                "method": "GET",
             "path": "/auth-info/auth-info"
              }
             
    }).then((res)=>{
      expect(res.status).to.eq(200)
      token=res.body.access_token
      cy.log(token)
      
    })
})
})