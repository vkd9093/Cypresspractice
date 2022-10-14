/// <reference types="cypress"/>
describe('get api test',()=>{
    it('create user',()=>{
        const axios = require('axios');

        const config = {
          method: 'get',
          url: 'https://minion.test.mm100.mastermindtms.com/auth-info/auth-info',
          headers: { 
            'Cookie': 'minion-portal-mm100-test-session=eyJpZCI6IjYxZmQ3NzQxM2YwZTczZTM2MWExZjdkNWYwOTUwZTMwIiwic3RhdGUiOiIyYzc4Njk1NDMzMGIzYjZlNjliZDVmYmNmMDc0M2E5OTNjZTEwOTc3MDQzNTBhNjQiLCJjcmVhdGVkQXQiOjE2NjQ0MzE0Nzc2MzYsInVwZGF0ZWRBdCI6MTY2NTY0ODc1Mzg4MSwiY29kZV92ZXJpZmllciI6Ik9sNkxlUlNIR0dTRV91Vlowb1F6bGgzanhNdUJjRlFKT1N0VmxPNE1vWE0iLCJyZWYiOiJodHRwczovL21pbmlvbi50ZXN0Lm1tMTAwLm1hc3Rlcm1pbmR0bXMuY29tL19fZGVidWcifQ%3D%3D'
          }
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          cy.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        
});

    })

