import Vue from 'vue';
import Router from 'vue-router';
//OLT
import Olts from './views/Olts.vue';
import NewOlt from './views/NewOlt.vue';
import ShowOlt from './views/ShowOlt.vue';
import EditOlt from './views/EditOlt.vue';
//PON
import Pons from './views/Pon.vue';
import NewPon from './views/NewPon.vue';
import ShowPon from './views/ShowPon.vue';
import EditPon from './views/EditPon.vue';
//ofccc
import Ofccc from './views/Ofccc.vue';
import NewOfccc from './views/NewOfccc.vue';
import ShowOfccc from './views/ShowOfccc.vue';
import EditOfccc from './views/EditOfccc.vue';
//SDP
import Sdp from './views/Sdp.vue';
import NewSdp from './views/NewSdp.vue';
import ShowSdp from './views/ShowSdp.vue';
import EditSdp from './views/EditSdp.vue';
import Distance from './views/DistanceSdp.vue';
//Customer
import Customer from './views/Customer.vue';
import NewCustomer from './views/NewCustomer.vue'
import EditCustomer from './views/EditCustomer.vue'
//User
import User from './views/User.vue';
import NewUser from './views/NewUser.vue';
import ShowUser from './views/ShowUser.vue';
import EditUser from './views/EditUser.vue';

//Google map
import googlemapOlt from './views/GoogleMapOlt.vue';
import googlemapOfccc from './views/GoogleMapOfccc.vue';
import googlemapSdp from './views/GoogleMapSdp.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/olts'
    },
    //OLT Routes
    {
      path: '/olts',
      name: 'olts',
      component: Olts
    },
    {
      path: '/olts/new',
      name: 'new-olt',
      component: NewOlt
    },
    {
      path: '/olts/pons/:id',
      name: 'show-pon-olt',
      component: ShowOlt
    },
    {
      path: '/olts/:id/edit',
      name: 'edit-olt',
      component: EditOlt
    },
    //PON Routes
    {
      path: '/pons',
      name: 'pons',
      component: Pons
    },
    {
      path: '/pons/new',
      name: 'new-pon',
      component: NewPon
    },
    {
      path: '/pons/ofcccs/:id',
      name: 'show-pon-ofccc',
      component: ShowPon
    },
    {
      path: '/pons/:id/edit',
      name: 'edit-pon',
      component: EditPon
    },
    //ofccc Routes
    {
      path: '/ofcccs',
      name: 'ofccc',
      component: Ofccc
    },
    {
      path: '/ofcccs/new',
      name: 'new-ofccc',
      component: NewOfccc
    },
    {
      path: '/ofcccs/sdps/:id',
      name: 'show-ofccc-sdp',
      component: ShowOfccc
    },
    {
      path: '/ofcccs/:id/edit',
      name: 'edit-ofccc',
      component: EditOfccc
    },
    //SDP Routes
    {
      path: '/sdps',
      name: 'sdp',
      component: Sdp
    },
    {
      path: '/sdps/new',
      name: 'new-sdp',
      component: NewSdp
    },
    {
      path: '/distance/:lng/:lat',
      name: 'distance',
      component: Distance
    },
    {
      path: '/sdps/customers/:id',
      name: 'show-sdp-customer',
      component: ShowSdp
    },
    {
      path: '/sdps/:id/edit',
      name: 'edit-sdp',
      component: EditSdp
    },
    //Customer Routes
    {
      path: '/customers',
      name: 'customers',
      component: Customer
    },
    {
      path: '/customers/new',
      name: 'new-customers',
      component: NewCustomer
    },
    {
      path: '/customers/:id/edit',
      name: 'edit-customers',
      component: EditCustomer
    },
    //User Routes
    {
      path: '/users',
      name: 'user',
      component: User
    },
    {
      path: '/users/new',
      name: 'new-user',
      component: NewUser
    },
    {
      path: '/users/:id',
      name: 'show-user',
      component: ShowUser
    },
    {
      path: '/users/:id/edit',
      name: 'edit-user',
      component: EditUser
    },
    //google map
   {
     path: '/googlemapolt/:id',
     name: 'google-map-olt',
     component: googlemapOlt
   },
   {
    path: '/googlemapofccc/:id',
    name: 'google-map-ofccc',
    component: googlemapOfccc
  },
  {
    path: '/googlemapsdp/:id',
    name: 'google-map-sdp',
    component: googlemapSdp
  }
  ]
});