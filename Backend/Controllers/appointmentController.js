const Appointment=require('../Models/appointmentModel');
const {v4:uuidv4} = require('uuid')

const createAppointment = async(req,res)=>{
    console.log("creating new Appointment",req.body);
    //validate request
    if(!req.body){
        res.status(400).json({
            message: "content can not be empty"
        });
    }
    const appointmentId = uuidv4();
    //create a new account
    const appointment =new Appointment({
        appointment_id: appointmentId,
        calendar_id: req.body.calendar_id,
        title: req.body.title,
        date:req.body.date,
        description:req.body.description ,
        recurring: req.body.recurring,
        notification: req.body.notification,
        image: req.body.image,
        icon:req.body.icon,
        Synchronize: req.body.Synchronize,
        time_zone: req.body.time_zone,
        time: req.body.time
    });
    await appointment.save();
    res.send(appointment);
}

// Edit an existing appointment by appointment_id
const editAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const updatedAppointmentData = req.body;

    // Find the appointment by appointment_id and update it
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { appointment_id },
      updatedAppointmentData,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error editing appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAppointment = async(req,res)=> {
  const appointmentId = req.params.appointment_id;

  try {
    // Find the appointment by its appointment_id
    const appointment = await Appointment.findOne({ appointment_id: appointmentId });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.json(appointment);
  } catch (error) {
    console.error('Error retrieving appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const deleteAppointment = async(req,res)=>{
    const appointmentId = req.params.appointment_id; 
    try {
      // Find and delete the appointment by its appointment_id
      const deletedAppointment = await Appointment.findOneAndDelete({ appointment_id: appointmentId });
      if (!deletedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      return res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting Appointment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }


module.exports={
    createAppointment,
    deleteAppointment,
    getAppointment,
    editAppointment,
}