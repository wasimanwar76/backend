const Shift = require('../models/Shift');

exports.createShift = async (req, res) => {
  const { shift_name, start_time, end_time, max_seats, shift_price, discounted_price, shift_type } = req.body;

  try {
    const existingShift = await Shift.findOne({shift_name,start_time,end_time})
    if(existingShift){
      return res.status(400).json({
        success:false,
        message:"Shift Already Exists"
      })
    }

    const newShift = new Shift({ shift_name, start_time, end_time, max_seats, shift_price, discounted_price, shift_type });
    await newShift.save();
    return res.status(201).json({
      success:true,
      message:"Shift Added Successfully",
      newShift
    });
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:err.message
    });
  }
};



exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    return res.status(200).json({
      success:true,
      shifts
    });
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:err.message
    });
  }
};



// delete Shift 

exports.deleteShift = async (req, res) => {
  // try {
  //   await Shift.findByIdAndDelete(req.params.id);
  //   return res.status(200).json({ success:true,message: 'Shift deleted' });
  // } catch (err) {
  //   return res.status(500).json({
  //     success:false,
  //     message:err.message
  //   });
  // }
};
