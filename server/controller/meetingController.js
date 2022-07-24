
const meetingService = require('../service/meetingService')

const getMeeting = async (req, res, next) => {
    try {

        const meeting = await meetingService.getMeeting()
        res.send(meeting)
    }

    catch (err) {
        next(err);
    }
}

const getMeetingById = async (req, res, next) => {
    try {
        if (req.body) {
            const id = req.params.id
            const meeting = await meetingService.getMeetingById(id)
            res.send(meeting);
        }
    }
    catch (err) {
        next(err);
    }
}

const addMeeting = async (req, res, next) => {
    try {
        if (req.body) {
            const {date, usersInMeeting}= req.body;
   const data =
      {
         date,
         usersInMeeting
      }
      const created = await meetingService.addMeeting(data);
      res.send(created);
        }
    }
    catch (err) {
        next(err);
    }
}

// async addEntry(username, dateposted, usercomment, projectcategory) {        
//     const data = await this.getData();  
//     console.log(data);
//     const project = data.find((project) => {           
//         return project.projectcategory === projectcategory;
//     });

//     if(!project || !project.comments) return null;
//     project.comments.push({username, dateposted, usercomment});

//     return writeFile(this.datafile, JSON.stringify());
//  }


const updateMeeting = async (req, res) => {
    try {
        const id = req.params.id
        if (req.body) {
            const { date, firstName, weight } = req.body;
            const data =
            {
                date,
                users: [{
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }, {
                    firstName,
                    weight
                }
                ]
            }
            const id = req.params.id
            const updated = await meetingService.updateMeeting(id, data);
            res.send(updated);
        }
    }
    catch (err) {
        next(err);
    }
}
const deleteMeeting = async (req, res, next) => {
    try {
        const id = req.params.id
        await meetingService.deleteMeeting(id)
        res.send('removed');
    }
    catch (err) {
        next(err)
    };
}

module.exports = { getMeeting, getMeetingById, addMeeting, updateMeeting, deleteMeeting }
