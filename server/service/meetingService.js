

const fs =require('fs');
const dataFromFile= fs.readFileSync('dataFile.json','utf-8');
const data=JSON.parse(dataFromFile);


const getMeeting = async () => {
   return await data.meetings;
}
const getMeetingById =async (id) => {
   const meeting = await Array.from(data.meetings).find(meeting => meeting.id === id);
   return await meeting;
}
const addMeeting =async (newMeeting) => {
   const meetings = Array.from(data.meetings)
   meetings.push(newMeeting);
   const json = JSON.stringify({'meetings':meetings})
   await fs.writeFileSync(jsonPath, json);
   return 'create'

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
