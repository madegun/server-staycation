

const isLogin = (req, res, next) =>{
  if(req.session.user == null || req.session.user == undefined){
    req.flash('alertStatus', 'danger');
    req.flash('alertMessage', 'session berakhir, silakan login kembali !');
    res.redirect('/admin/login');
  }else{
    next();
  }
}

module.exports = isLogin;
