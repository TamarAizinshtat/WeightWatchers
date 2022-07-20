
const fs =require('fs');
const jsonPath = 'meeting.json';
const jsonData= fs.readFileSync(jsonPath,'utf-8');
const data=JSON.parse(jsonData);
const meetingModel = require('../model/meetingModel')

const getMeeting = async () => {
   return await meetingModel.find()
}
const getMeetingById =async (id) => {
   return await meetingModel.find(id)
  }
const addMeeting =async (newMeeting) => {
   const {date, firstName, whight}= newMeeting;
   const data = new meetingModel(
      {
         date,
         firstName,
         whight
      }
  )
  return await data.save();

}
const updateMeeting =async (id,update) => {
   let meetings = await Array.from(data.meetings)
   meetings = meetings.filter(meeting => meeting.id != id);
   meetings.push(update)
   const json =  JSON.stringify({'meetings':meetings })
   await fs.writeFileSync(jsonPath, json);
   return 'update'

}
const deleteMeeting = (id) => {

}
module.exports={getMeeting,getMeetingById,addMeeting,updateMeeting,deleteMeeting}
