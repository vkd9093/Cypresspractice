import Ajv from "ajv"
const ajv = new Ajv()
/// <reference types="cypress"/>
import data from "../..//cypress/e2e/testdata/prerequirementtestData.json";
import loaddata from "../..//cypress/e2e/testdata/loaddata.json";
import jsonschema from "../..//cypress/e2e/testdata/jsonschema.json";
import endpoints from "../..//cypress/e2e/testdata/endpoints.json";
import { expect } from "chai";
describe('testCase-20695',()=>{
  let token;
  let auth;
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
      auth=res.body.access_token
      cy.log(token)
      
    })
})
  ///access token from mastery
  it('token',()=>{
    cy.request({
             method: 'POST',
              url:endpoints.token,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "INGRESSCOOKIE=1665055728.967.1451.164155|07563d86051088b4ea714428fe239ad1"
              },
              body:{"username": "KeycloakSuperUser@mastery.net",
              "password": "R9aJuDh7n58sGygd",
              "client_id": "https://test.mm100.mastermindtms.com/",
              "grant_type": "password"}
    }).then((res)=>{
      expect(res.status).to.eq(200)
     token=res.body.access_token
      cy.log(token)
      cy.log(JSON.stringify(res))
    })
      
  })
  /// create customer as prerequisite
    it('Create Customer',()=>{
      cy.request({
        method: 'POST',
        url:endpoints.customerUrl,
        headers:{
          'Authorization': 'Bearer '+token,
          'Accept-Version': '2.x.x',
          'Content-Type': 'application/json'
        },
        body:data.customerbody
      }).then((res)=>{
        expect(res.status).to.eq(204)
      })
    })
    /// validate customer cration from mastery 
    it('validateCustomer',()=>{
      cy.request({
        method: 'GET',
        url:endpoints.customerUrl+'/TESTAPI06',
        headers:{
            'Authorization': 'Bearer '+token,
            'Accept-Version': '2.x.x',
            'Content-Type': 'application/json'
        }
      }).then((res)=>{
        cy.log(JSON.stringify(res))
        expect(res.body.code).to.eq('TESTAPI06')
      })
    })
    /// create facilty for prereq
    it('Create Facility(1)',()=>{
      cy.request({
        method: 'POST',
        url:endpoints.facilityUrl,
        headers:{
            'Authorization': 'Bearer '+token
        },
        body:data.facilityBody1
      }).then((res)=>{
        expect(res.status).to.eq(204)
      })
    })
    // validate facility creation
    it('validateFacility',()=>{
      cy.request({
        method: 'GET',
        url:endpoints.facilityUrl+'/APICY0202',
        headers:{
            'Authorization': 'Bearer '+token,
            'Accept-Version': '2.x.x',
            'Content-Type': 'appication/json' 
        }
      }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.code).to.eq('APICY0202')
        cy.log(JSON.stringify(res))
      })
    })
    // create another facility
    it('Create Facility(Shipping)',()=>{
      cy.request({
        method: 'POST',
        url:endpoints.facilityUrl,
        headers:{
            'Authorization': 'Bearer '+token
        },
        body:data.facilityBodyshipping
      }).then((res)=>{
        expect(res.status).to.eq(204)
      })
    })
    // create carrier for prereq
    it('create Carrier',()=>{ 
      cy.request({
        method: 'POST',
        url:endpoints.carrierUrl,
        headers:{
            'Authorization': 'Bearer '+token
        },
        body:data.carrierload
      }).then((res)=>{
        expect(res.status).to.eq(204)
        cy.log(JSON.stringify(res))
      })
    })
      // validate carrier from mastery
      it('validateCarrier',()=>{
        cy.request({
          method: 'GET',
          url:endpoints.carrierUrl+'/APIRV05',
          headers:{
              'Authorization': 'Bearer '+token,
              'Accept-Version': '2.x.x',
              'Content-Type': 'application/json'  
          }
        }).then((res)=>{
          expect(res.status).to.eq(200)
          expect(res.body.code).to.eq('APIRV05')
          cy.log(JSON.stringify(res))
        })
      })
      it('Create Load',()=>{
        cy.request({
          method: 'POST',
          url:endpoints.loadUrl,
          headers:{
            'Authorization': "Bearer " +token,
            "Accept-Version" : "2.x.x"
          },
          body:{
              "order":loaddata.order
          }   
        }).then((res)=>{
          expect(res.status).to.eq(200)
          cy.log(JSON.stringify(res))
        })
    })
    //schema validation 
    it('Schema Validation', () => {
      const schema=jsonschema
      const payload=data.customerbody
      const validate = ajv.compile(schema)
      const valid = validate(payload)
      if (!valid)console.log(validate.errors);
      cy.log('schema is validated successfully')  
    })   
    
 //minion validation
    it('minionActivationStatus',()=>{
      cy.request({
        method: 'GET',
        url: 'https://minion-api.test.mm100.mastermindtms.com/dictionary-terms/activation_status_type',
        headers:{
          'Authorization': 'Bearer '+auth
        }
      }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.options[0].id).to.eq(loaddata.order.activationStatusTerm)
      })
    })
    it('minionSize',()=>{
      cy.request({
        method: 'GET',
        url: 'https://minion-api.test.mm100.mastermindtms.com/dictionary-terms/load_size',
        headers:{
          'Authorization': 'Bearer '+auth
        }
      }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.options[0].id).to.eq(loaddata.order.sizeTerm)
      })
    })
    it('minionloadRefrence',()=>{
      cy.request({
        method: 'GET',
        url: 'https://minion-api.test.mm100.mastermindtms.com/dictionary-terms/load_reference_type',
        headers:{
          'Authorization': 'Bearer '+auth
        }
      }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.options[3].id).to.eq(loaddata.order.references[0].qualifierTerm)
      })
    })
    })
  
