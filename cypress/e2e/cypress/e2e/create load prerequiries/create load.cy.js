/// <reference types="cypress"/>
import data from "../testdata/prerequirementtestData.json";
import loaddata from "../testdata/loadBody.json";
import endpoints from "../testdata/postman endpoints.json";
describe('get api test',()=>{
  let token
  it('get token',()=>{
    cy.request({
             method: 'POST',
              url:'https://id.mm100nonprod.mastermindtms.com/auth/realms/test.mm100.mastermindtms.com/protocol/openid-connect/token',
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
      
    })
      
  })
    it('Create Customer',()=>{
      cy.request({
        method: 'POST',
        url:endpoints.customerUrl,
        headers:{
          'Accept-Version': '2.x.x',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
      },
        body:data.customerBody
      }).then((res)=>{
        expect(res.status).to.eq(204)
      })
    })

    it('Create Facility(Pickup)',()=>{
      cy.request({
        method: 'POST',
        url: endpoints.facilityUrl,
        headers:{
            'Authorization': 'Bearer '+token
        },
        body:data.facilityPickup
      }).then((res)=>{
        expect(res.status).to.eq(204)
      })
    })

    it('Create Facility(Delivery)',()=>{
      cy.request({
        method: 'POST',
        url: endpoints.facilityUrl,
        headers:{
            'Authorization': 'Bearer '+token
        },
        body:data.facilityDelivery
      }).then((res)=>{
        expect(res.status).to.eq(204)
      })
    })

    it('create Carrier',()=>{ 
      cy.request({
        method: 'POST',
        url: endpoints.carrierUrl,
        headers:{
            'Authorization': 'Bearer '+token
        },
        body:data.carrierBody
      }).then((res)=>{
        expect(res.status).to.eq(204)
        cy.log(JSON.stringify(res))
      })})

      it('Create Load',()=>{
        cy.request({
          method: 'POST',
          url: endpoints.loadUrl,
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
  })
   