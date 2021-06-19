const fs = require('fs-extra');
const path = require('path');

const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Item = require("../models/Item");
const Image = require("../models/Image");
const Feature = require("../models/Feature");
const Activity = require("../models/Activity");
const User = require('../models/User');
const Booking = require('../models/Booking');
const Member = require('../models/Member');

const bycrypt = require('bcryptjs');



module.exports = {

  viewLogin: (req, res) => {
    try {
      const alertStatus = req.flash("alertStatus");
      const alertMessage = req.flash("alertMessage");
      const alert = { status: alertStatus, message: alertMessage };
      if(req.session.user == null || req.session.user == undefined ){
        res.render("index", {
        alert,
        title: "StayCation | Login",
        });
        
      }else{
        res.redirect('/admin/dashboard');
      }
      
    } catch (error) {
      res.redirect("/login", {
      })
    }   
  },

  actionLogin: async (req, res) => {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username: username});
      if(!user){
        req.flash("alertStatus", "danger");
        req.flash("alertMessage", "user tidak terdaftar!");
        res.redirect('/login');
      }

      const isPasswordMatch = await bycrypt.compare(password, user.password);
      if(!isPasswordMatch){
        req.flash("alertStatus", "danger");
        req.flash("alertMessage", "passord salah!");
        res.redirect('/login');
      }
      req.session.user = {
        id: user.id,
        username: user.username
      }
      res.redirect('/admin/dashboard');  
     
      
    } catch (error) {
      res.redirect('/login');
    }
  },

  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  },

  viewDashboard: async (req, res) => {
    try {

      const member = await Member.find();
      const booking = await Booking.find();
      const item = await Item.find();

      res.render("admin/dashboard/view-dashboard", {
      title: "StayCation | Dashboard",
      member,
      booking,
      item,
      user: req.session.user
    });
    } catch (error) {
      res,redirect('/admin/dashboard');
    }
    
  },

  viewCategory: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();

      res.render("admin/category/view-category", {
        category,
        alert,
        title: "StayCation | Category",
        user: req.session.user
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      req.flash("alertStatus", "success");
      req.flash("alertMessage", "Berhasil tambah category baru");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/category");
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();
      req.flash("alertStatus", "success");
      req.flash("alertMessage", "Data berhasil di update");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/category");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      await category.remove();
      req.flash("alertStatus", "success");
      req.flash("alertMessage", "Data berhasil di hapus");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/category");
    }
  },

  viewBank: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      res.render("admin/bank/view-bank", {
        bank,
        alert,
        title: "StayCation | Bank",
        user: req.session.user
      });
    } catch (error) {
            
      res.redirect("/admin/bank");
    }
  },

  addBank: async (req, res) => {
    try {
      const { nama, noRekening, namaBank } = req.body;
      //console.log(req.file);

      
      await Bank.create({ 
        nama, 
        noRekening, 
        namaBank, 
        imageUrl: `images/${req.file.filename}`,
       });

      req.flash("alertStatus", "success");
      req.flash("alertMessage", "Add bank berhasil");      
      res.redirect("/admin/bank");

    } catch (error) {

      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/bank");
    }
  },

  editBank: async (req, res)=>{
    const {id, nama, noRekening, namaBank} = req.body;
    try {    
     
      const bank = await Bank.findOne({ _id: id});
    
    if(req.file == undefined){
      bank.nama = nama;
      bank.noRekening = noRekening;
      bank.namaBank = namaBank;
      await bank.save();

      req.flash("alertStatus", "success");
      req.flash("alertMessage", "update berhasil");      
      res.redirect("/admin/bank");

    }else{
      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      bank.nama = nama;
      bank.noRekening = noRekening;
      bank.namaBank = namaBank;
      bank.imageUrl = `images/${req.file.filename}`
      await bank.save();

      req.flash("alertStatus", "success");
      req.flash("alertMessage", "update berhasil");      
      res.redirect("/admin/bank");
    }
   
    } catch (error) {    
     
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/bank");
    }
    
  },

  deleteBank: async (req, res)=>{
   try {
    const {id} = req.params;
    const bank = await Bank.findOne({_id: id});
    await fs.unlink(path.join(`public/${bank.imageUrl}`));
    await bank.remove();

      req.flash("alertStatus", "success");
      req.flash("alertMessage", "delete berhasil");      
      res.redirect("/admin/bank");
   } catch (error) {
    req.flash("alertStatus", "danger");
    req.flash("alertMessage", `${error.message}`);
    res.redirect("/admin/bank");
   }


  },

  viewItem: async  (req, res) => {
   try {
    const item = await Item.find()
      .populate({path: 'imageId', select: 'id imageUrl '})
      .populate({path: 'categoryId', select: 'id name'});
    
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const category = await Category.find();
    res.render("admin/item/view-item", {
      category,
      item,
      alert,
      title: "StayCation | Item",
      action: 'view',
      user: req.session.user
    });
   } catch (error) {
    req.flash("alertStatus", "danger");
    req.flash("alertMessage", `${error.message}`);
    res.redirect("/admin/item");
   }
  },

  addItem: async (req, res) => {
    try {
      const {categoryId, title, price, city, editor} = req.body;
        if(req.files.length > 0){
          const category = await Category.findOne({_id: categoryId});
          const newItem = {
            categoryId: category._id,
            title,
            price,
            city,
            description: editor,
          }
          const item = await Item.create(newItem);
          //logic untuk push lempar itemId ke table category
          category.itemId.push({_id: item._id});
          await category.save(); //lalu save 

          //logic untuk simpan imageUrl di table image
          for(let i = 0; i < req.files.length; i++){
            const imageSave = await Image.create({imageUrl: `images/${req.files[i].filename}`});
            item.imageId.push({_id: imageSave._id});
            await item.save();
          }
          req.flash("alertStatus", "success");
          req.flash("alertMessage", "Data berhasil disimpan");
          res.redirect('/admin/item');
        }
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/item");
    }
  },

  editItem: async (req, res) => {
    try {
      const {id} = req.params;
      const {categoryId, title, price, city, editor} = req.body;
      const item = await Item.findOne({_id: id})
        .populate({path: 'imageId', select: 'id imageUrl'})
        .populate({path: 'categoryId', select: 'id name'});

      if(req.files.length > 0){
        for(let i = 0; i < item.imageId.length; i++){
          const imageUpdate = await Image.findOne({_id: item.imageId[i]._id});
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
          imageUpdate.imageUrl = `images/${req.files[i].filename}`;
          await imageUpdate.save();
        }
        
          item.categoryId = categoryId;
          item.title = title;
          item.price = price;
          item.city = city;
          item.editor = editor;
        
        await item.save();
        req.flash("alertStatus", "success");
        req.flash("alertMessage", "Data item berhasil di update");
        res.redirect("/admin/item");

      }else{
        item.categoryId = categoryId;
        item.title = title;
        item.price = price;
        item.city = city;
        item.editor = editor;
                
        await item.save();
        req.flash("alertStatus", "success");
        req.flash("alertMessage", "Data item berhasil di update");       
        res.redirect("/admin/item");
      }
      
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/item");
    }
  },

  deleteItem: async(req, res)=> {

    try {
    const {id} = req.params;
    const item = await Item.findOne({_id: id}).populate('imageId');
    for(let i = 0; i < item.imageId.length; i++){
      Image.findOne({_id: item.imageId[i]._id}).then((image)=>{
      fs.unlink(path.join(`public/${image.imageUrl}`));
      image.remove();

    }).catch((error)=>{
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/item");
    });
    }
    await item.remove();
    req.flash("alertStatus", "success");
    req.flash("alertMessage", "Data item berhasil di hapus");       
    res.redirect("/admin/item");
    
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/item");
    }
    

  },

  showImageItem: async (req, res)=>{
    try {
      const {id} = req.params;

      const item = await Item.findOne({ _id: id})
        .populate({path: 'imageId', select: 'id imageUrl'});
       console.log(item.imageId);
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };

        res.render("admin/item/view-item", {
          title: "StayCation | View Image",
          alert,
          item,
          action: 'show image',
          user: req.session.user
        })
      
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/item");
    }

  },

  ShowEditItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({_id: id})
      .populate({path: 'categoryId', select: 'id name'})
       .populate({path: 'imageId', select: 'id imageUrl'});
      
      const category = await Category.find();
      
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

    res.render('admin/item/view-item', {
      item,
      category,
      alert,
      title: 'StayCation | Show Edit Item',
      action: 'show-edit',
      user: req.session.user
    });        

    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect("/admin/item");
    }

  },
  
  //view detail item
  viewDetailItem: async (req, res) => {
    const {itemId} = req.params;
    try {      
     const feature = await Feature.find({itemId: itemId});
     const activity = await Activity.find({itemId: itemId});
     
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/item/detail-item/view-detail-item', {
        title: "StayCation | Detail Items",
        alert,
        itemId,
        feature,
        activity,
        user: req.session.user
      })
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  addFeature: async (req, res)=>{      
      const { name, qty, itemId } = req.body;    
    try {
      
      if(!req.file){
        req.flash("alertStatus", "danger");
        req.flash("alertMessage", "no image found");
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
      const feature = await Feature.create({
        name,
        qty,
        itemId,
        imageUrl: `images/${req.file.filename}`
      });

      const item = await Item.findOne({_id: itemId});
      item.featureId.push({_id: feature._id});
      await item.save();

      req.flash("alertStatus", "success");
      req.flash("alertMessage", "berhasil add feature");
      res.redirect(`/admin/item/show-detail-item/${itemId}`);      

    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  editFeature: async (req, res) => {
    const {id, name, qty, itemId} = req.body;
    try {
      const feature = await Feature.findOne({_id: id});
        if(req.file == undefined){
          feature.name = name;
          feature.qty = qty;
          await feature.save();

          req.flash('alertStatus', 'success');
          req.flash('alertMessage', 'edit feature berhasil');
          res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }else{
        await fs.unlink(path.join(`public/${feature.imageUrl}`));
        feature.name = name;
        feature.qty = qty;
        feature.imageUrl = `images/${req.file.filename}`;
        await feature.save();

        req.flash('alertStatus', 'success');
        req.flash('alertMessage', 'edit feature berhasil');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);

      }
      
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }

  },

  deleteFeature: async (req, res) => {
    const {id, itemId} = req.params;
    try {
      const feature = await Feature.findOne({_id: id});
      const item = await Item.findOne({_id: itemId}).populate('featureId');
      for(let i = 0; i < item.featureId.length; i++){
        if(item.featureId[i]._id.toString() === feature._id.toString()){
          item.featureId.pull({_id: feature._id});
          await item.save();
        }
      }
      await fs.unlink(path.join(`public/${feature.imageUrl}`));
      await feature.remove();

      req.flash('alertStatus', 'success');
      req.flash('alertMessage', 'Delete feature berhasil');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
      
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  addActivity: async (req, res) => {
    const {name, type, itemId} = req.body;
    try {
      if(!req.file){
        req.flash("alertStatus", "danger");
        req.flash("alertMessage", "no file image found");
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
      const activity = await Activity.create({ 
        name, type, itemId, 
        imageUrl: `images/${req.file.filename}`
      });
       
      const item = await Item.findOne({ _id: itemId});
      item.activityId.push({_id: activity._id});
      await item.save();

      req.flash('alertStatus', 'success');
      req.flash('alertMessage', 'Add Activity berhasil');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
      
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  editActivity: async (req, res) => {
    const {id, name, type, itemId} = req.body;
    try {
       const activity = await Activity.findOne({_id: id});
      if(req.file === undefined){       
        activity.name = name;
        activity.type = type;
        await activity.save();

        req.flash('alertStatus', 'success');
        req.flash('alertMessage', 'edit Activity berhasil');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);

      }else{
        await fs.unlink(path.join(`public/${activity.imageUrl}`));       
        activity.name = name;
        activity.type = type;
        activity.imageUrl = `images/${req.file.filename}`
        await activity.save();

        req.flash('alertStatus', 'success');
        req.flash('alertMessage', 'edit Activity berhasil');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  deleteActivity: async (req, res) => {
    const {id, itemId} = req.params;
    try {
      const activity = await Activity.findOne({_id: id});
      const item = await Item.findOne({_id: itemId}).populate('activityId');
      for(let i = 0; i < item.activityId.length; i++){
        if(item.activityId[i]._id.toString() === activity._id.toString()) {
              
          item.activityId.pull({_id: activity._id});
          await item.save();
        }
        await fs.unlink(path.join(`public/${activity.imageUrl}`));
        await activity.remove();

        req.flash('alertStatus', 'success');
        req.flash('alertMessage', 'Delete Activity berhasil');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },


  viewBooking: async (req, res) => {
    try {
      const booking =  await Booking.find()
        .populate('memberId')
        .populate('bankId');

      res.render("admin/booking/view-booking", {
      title: "StayCation | Booking",
      booking,
      user: req.session.user
    });
    } catch (error) {
      req.flash("alertStatus", "danger");
      req.flash("alertMessage", `${error.message}`);
      res.redirect('/admin/booking');
    }
    
  },

  viewDetailBooking: async (req, res) => {
    const {id} = req.params;
    try {
      const booking = await Booking.findOne({_id: id})
        .populate('memberId')
        .populate('bankId');
        
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        res.render('admin/booking/view-detail-booking', {
          title: "StayCation | Detail Booking",
          alert,
          booking,
          user: req.session.user
        })
    } catch (error) {
      res.redirect('/admin/booking');
    }
  },

  actionConfirmasiBayar: async (req, res) => {
    const {id} = req.params;
    try {
      const booking = await Booking.findOne({_id: id});
      booking.payments.status = 'Accepted';
      await booking.save();
      req.flash('alertStatus', 'success');
      req.flash('alertMessage', 'Konfirmasi bayar success');
      res.redirect(`/admin/booking/${id}`);
    } catch (error) {
      res.redirect(`/admin/booking/${id}`);
    }
  },

  actionRejectBayar: async (req, res) => {
    const {id} = req.params;
    try {
      const booking = await Booking.findOne({_id: id});
      booking.payments.status = 'Rejected';
      await booking.save();
      req.flash('alertStatus', 'success');
      req.flash('alertMessage', 'Rejected bayar success');
      res.redirect(`/admin/booking/${id}`);
    } catch (error) {
      res.redirect(`/admin/booking/${id}`);
    }
  },

};
