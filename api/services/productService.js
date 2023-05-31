var commonFunc = require('../common.js');
const mongoose = require('mongoose');
let productService = {};

productService.create = async function(req, data) {
    var productModel=req.db.productModel;
    var masterCategoryModel=req.db.masterCategoryModel;
    var masterBrandModel=req.db.masterBrandModel;

    let result = {};

    if(data.name)
    {
        var product_name=await productModel.findOne({'name':data.name});
        if(product_name && product_name.status !== 2)
        {
            result['msg'] = "Product Name Already Exist";
            result['code'] = 400;
            return result;
        }
    }

    if(data.masterCategoryId !=null && data.masterCategoryId !="")
    {
        
        var category_id = await masterCategoryModel.findOne({'_id':data.masterCategoryId});
        if (!category_id) {
            result['msg'] = "Category Id Not Found";
            result['code'] = 400;
            return result;
        } 
    } 

    if(data.masterBrandId !=null && data.masterBrandId !="")
    {
        
        var brand_id = await masterBrandModel.findOne({'_id':data.masterBrandId});
        if (!brand_id) {
            result['msg'] = "Brand Id Not Found";
            result['code'] = 400;
            return result;
        } 
    } 
    
    var new_product= await productModel.create(data);
    result['data'] = new_product;
    result["msg"] = "Product Created Successfully";
    result['code'] = 200;
    return result;
}

module.exports = productService;