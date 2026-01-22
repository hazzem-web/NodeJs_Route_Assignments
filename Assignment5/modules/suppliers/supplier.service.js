const connection = require('../../database/connection.js');


const changeContactNumberToVARCHAR = (req,res)=> { 
    connection.query("ALTER TABLE suppliers CHANGE COLUMN contactNumber contactNumber VARCHAR(15)",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            res.json({message:"contactNumber Type changed successfully"});
        }
    })
}


const addSupplier = (req,res)=> { 
    let {supplierName , contactNumber} = req.body;
        connection.query(`INSERT INTO suppliers(supplierName , contactNumber) VALUES('${supplierName}' , '${contactNumber}' )`,(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.affectedRows > 0) { 
                res.json({message:'Supplier Added Successfully'});
                console.log(supplierName , contactNumber);
            } else { 
                res.json({message:"can't add supplier"});
            }
        }
    })
}

const getSupplierStartsWithF = (req,res)=>{
    connection.query("SELECT * FROM suppliers  WHERE supplierName LIKE 'F%'",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.length > 0) { 
                res.json({message:'suppliers fetched successfully',result});
            } else { 
                res.json({message:'supplier not found'});
            }
        }
    });
}

const setPermissions = (req,res)=> { 
    connection.query("INSERT INTO premission (supplierID, canSelect, canInsert, canUpdate, canDelete) SELECT supplierID, 1, 1, 1, 0 FROM suppliers WHERE supplierName = 'store_manager' ",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.affectedRows > 0) { 
                res.json({message:'access updated successfully you can now select , insert , update , delete'});
            } else { 
                res.json({message:"can't update access"});
            }
        }
    })
}

const revokeUpdate = (req,res)=> { 
    connection.query("UPDATE premission SET canUpdate = 0 WHERE supplierID = 15",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.affectedRows > 0) { 
                res.json({message:'access updated successfully you can now select , insert but you cant update or delete'});
            } else { 
                res.json({message:"can't update access"});
            }
        }
    })
}

const grantDelete = (req,res)=> { 
    connection.query("UPDATE premission SET canDelete = 1 WHERE supplierID = 15",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.affectedRows > 0) { 
                res.json({message:'access updated successfully you can now select , insert , delete but you cant update'});
            } else { 
                res.json({message:"can't update access"});
            }
        }
    })
}


module.exports = { 
    changeContactNumberToVARCHAR,
    addSupplier,
    getSupplierStartsWithF,
    setPermissions,
    revokeUpdate,
    grantDelete
}