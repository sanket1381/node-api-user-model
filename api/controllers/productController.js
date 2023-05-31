var commonFunc = require('../common.js');
const productService =  require('../services/productService');
var productController = {};

productController.create = async function(req, res, callback){
    var resObj = {};
	let param = req.body;

    let validation_error = [];

	if( !param.name ){
		validation_error.push('product name');
	}

    if( !param.description ){
		validation_error.push('description');
	}
	if( !param.vendor ){
		validation_error.push('vendor');
	}

    if( !param.price ){
		validation_error.push('price');
	}

	if( !param.currency ){
		validation_error =push('currency');
	}	
    
	if( validation_error.length ){
        let validation_msg = validation_error.join(', ');
        commonFunc.send(res,400,'',`Required ${validation_msg} fields.`);
        return;
    }
	if( !commonFunc.isNameValid( param.name) ){
		commonFunc.send(res,400,'','Name should contain alphabet only');
		return;
	}
	if( !commonFunc.isNumberValid( param.price) ){
		commonFunc.send(res,400,'','Price should contain number only');
		return;
	}

	if (param.images) {
        for (let i = 0; i < param.images.length; i++) {
            if (!commonFunc.isUrlValid(param.images[i])) {
                commonFunc.send(res,400,'','Images should contain only URL');
				return;
            }
        }
    }

    var insertObj = {};	
	
    if(param.name)
	{
		insertObj.name =param.name;
	}
	
	if( param.description ){
		insertObj.description =param.description;
	}
	if( param.vendor ){
		insertObj.vendor =param.vendor;
	}

    if( param.price ){
		insertObj.price =param.price;
	}

    if( param.publishedAt ){
		insertObj.publishedAt =param.publishedAt;
	}

	if( param.currency ){
		insertObj.currency =param.currency;
	}

	insertObj.status = 1;

	try{
    	let productResponse = await productService.create(req, insertObj);
        commonFunc.send(res,productResponse.code,productResponse['data'],productResponse.msg);
    } catch(error){
		//console.log(error);
        commonFunc.send(res,503,'',error);
    }

}

module.exports = productController;
