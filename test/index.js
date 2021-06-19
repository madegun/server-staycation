const chai = require('chai');
const chaiHttp = require('chai-http');
const expected = chai.expect;
const app = require('../app');
const fs = require('fs');

chai.use(chaiHttp);

describe('API ENDPOINT TESTING', ()=>{
  it('GET Landing Page', (done) => {
    chai.request(app).get('/api/v1/member/landing-page').end((err, res)=>{
     expected(err).to.be.null
     expected(res).to.have.status(200)
     expected(res.body).to.be.an('object')
     expected(res.body).to.have.property('hero')
     expected(res.body.hero).to.have.all.keys('treasures', 'travelers', 'cities')
     expected(res.body).to.have.property('mostPicked')
     expected(res.body.mostPicked).to.have.an('array')
     expected(res.body).to.have.property('category')
     expected(res.body.category).to.have.an('array')
     expected(res.body).to.have.property('testimonial')
     expected(res.body.testimonial).to.have.an('object')

    });

    done();
  });

  it('GET Detail Page', (done) => {
    chai.request(app).get('/api/v1/member/detail-page/5e96cbe292b97300fc902222').end((err, res)=>{
     expected(err).to.be.null
     expected(res).to.have.status(200)
     expected(res.body).to.be.an('object')
     expected(res.body).to.have.property('sumBooking')
     expected(res.body).to.have.property('country')
     expected(res.body).to.have.property('isPopular')
     expected(res.body).to.have.property('unit')     
     expected(res.body).to.have.property('imageId')
     expected(res.body.imageId).to.have.an('array')
     expected(res.body).to.have.property('featureId')
     expected(res.body.featureId).to.have.an('array')
     expected(res.body).to.have.property('activityId')
     expected(res.body.activityId).to.have.an('array')
     expected(res.body).to.have.property('_id') 
     expected(res.body).to.have.property('title') 
     expected(res.body).to.have.property('price') 
     expected(res.body).to.have.property('city') 
     expected(res.body).to.have.property('description') 
     expected(res.body).to.have.property('categoryId') 
     expected(res.body).to.have.property('__v') 
     expected(res.body).to.have.property('bank') 
     expected(res.body.bank).to.have.an('array') 
    
     expected(res.body).to.have.property('testimonial')
     expected(res.body.testimonial).to.have.an('object')

    });

    done();
  });


  it('POST Booking Page', (done) => {
    const image = __dirname + '/buktibayar.jpeg'
    const dataBooking = {
      image,
      idItem: '5e96cbe292b97300fc902222',
      duration: 2,
      bookingStartDate: 19-6-2021,
      bookingEndDate: 20-6-2021,
      firstName: 'aendru',
      lastName: 'prawito' ,
      email: 'endru@getMaxListeners.com',
      phoneNumber: 08912345637 ,
      accountHolder: 'endru',
      bankFrom: 'BRI',
    }

    chai.request(app).post('/api/v1/member/booking-page')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('idItem', dataBooking.idItem)
    .field('duration', dataBooking.duration)
    .field('bookingStartDate', dataBooking.bookingStartDate)
    .field('bookingEndDate', dataBooking.bookingEndDate)
    .field('firstName', dataBooking.firstName)
    .field('lastName', dataBooking.lastName)
    .field('email', dataBooking.email)
    .field('phoneNumber', dataBooking.phoneNumber)
    .field('accountHolder', dataBooking.accountHolder)
    .field('bankFrom', dataBooking.bankFrom)
    .attach('image', fs.readFileSync(dataBooking.image), 'buktibayar.jpeg')

    .end((err, res)=>{    
     expected(err).to.be.null
     expected(res).to.have.status(201)
     expected(res.body).to.be.an('object')
     expected(res.body).to.have.property('message')
     expected(res.body.message).to.have.aqual('Success Booking')
     expected(res.body).to.have.property('booking')
     expected(res.body.booking).to.have.all.keys(
       '_id',
       '__v',
       'invoice',
        'bookingStartDate',
        'bookingEndDate',
        'total',
        'memberId',
        'payments'
       ) 
    expected(res.body.booking.payments).to.have.all.keys('status','proofPayment','bankFrom','accountHolder')
    expected(res.body.booking.idItem).to.have.all.keys('_id','title','price','duration')
    
    });
   
    done();
  });
});
